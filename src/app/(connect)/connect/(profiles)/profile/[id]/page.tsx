"use client";

import UsrIcon from "../../../../../../_assets/photos/UserIcon.png";
import { UserData } from "@/_assets/types";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../../../../../../../config/mesa-config";
import Image from "next/image";
import { Index } from "../boxTypes";
import UserPosts from "./UserPosts";
import { userContext, useUser } from "@/app/AuthContext";
import ChangePfP from "./ChangePfP";
import LoadingPage from "@/_components/LoadingPage";
import FollowButton from "./FollowButton";
import { useContextMenu, useToast } from "@/app/(connect)/InfoContext";
import {
  IoCheckbox,
  IoCheckmark,
  IoCheckmarkCircle,
  IoCheckmarkCircleOutline,
  IoCopyOutline,
  IoPersonAddOutline,
  IoSchool,
  IoTrophy,
} from "react-icons/io5";
import Infoblocks from "@/app/(connect)/connect/(profiles)/profile/[id]/infoblocks";
import YourProfile from "./YourProfile";
import BioModal from "./BioModal";
import { useModal } from "../../../Modal";
import MajorModal from "./MajorModal";
import UserEvents from "./UserEvents";
import SideNavProfile from "./profile_sidenav";
import Achievements from "./Achievements";
import { useProfile } from "./ProfileContext";
import { useRouter } from "next/navigation";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<UserData>();
  const pfpRef = useRef<any>();
  const { createContext } = useContextMenu();
  const toast = useToast();
  const router = useRouter();

  const ActiveUser = useUser();
  const profile = useProfile();
  const modal = useModal();
  const isActiveUser = user?.id === ActiveUser.user?.id;

  //refrences
  const InfoBoxRef = useRef<HTMLDivElement>(null);
  const ActivityRef = useRef<HTMLDivElement>(null);
  const TopPageRef = useRef<HTMLUListElement>(null);
  const CertRef = useRef<HTMLDivElement>(null);

  const refMap = new Map([
    [
      "Top Page",
      () => TopPageRef?.current?.scrollIntoView({ behavior: "smooth" }),
    ],
    [
      "Inside",
      () => InfoBoxRef?.current?.scrollIntoView({ behavior: "smooth" }),
    ],
    [
      "activity",
      () =>
        ActivityRef?.current?.scrollIntoView({
          behavior: "smooth",
        }),
    ],
    [
      "acholades",
      () =>
        CertRef?.current?.scrollIntoView({
          behavior: "smooth",
        }),
    ],
  ]);

  const BioComp = useCallback(
    () => <BioModal bio={user?.bio} user={ActiveUser.user?.id} />,
    [user, isActiveUser, ActiveUser.user?.id],
  );

  const MajorMod = useCallback(
    () => <MajorModal major={user?.major} user={ActiveUser.user?.id} />,
    [user, isActiveUser, ActiveUser.user?.id],
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", params.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }
      //@ts-expect-error
      setUser(data);
    };

    fetchData();
  }, []);

  if (!user) {
    return <LoadingPage />;
  }

  return (
    <main
      ref={TopPageRef}
      onContextMenu={(e) =>
        createContext(e, [
          {
            name: "Copy Profile Link",
            visible: true,
            function: () => {
              navigator.clipboard.writeText(window.location.href);
            },
            icon: <IoCopyOutline />,
          },
          {
            name: "Follow",
            visible: user.id !== ActiveUser.user?.id,
            function: async () => {
              let { data, error } = await supabase.rpc("toggle_follow_status", {
                other_id: user.id,
              });
              if (error) toast.CreateErrorToast(error.message);
              else
                toast.CreateSuccessToast(
                  `Follow Status Changed For ${user.real_name}`,
                );
            },
            icon: <IoPersonAddOutline />,
          },
        ])
      }
      className="flex min-h-screen flex-col gap-5 p-3 pb-32"
    >
      <ul className="flex flex-row items-start gap-5">
        {ActiveUser.user?.id === user.id ? (
          <picture
            onClick={() => {
              pfpRef.current.click();
            }}
            className="group h-16 w-16 scale-100 cursor-pointer rounded-full duration-500 hover:scale-110 hover:shadow-lg lg:h-20 lg:w-20 2xl:h-24 2xl:w-24"
          >
            <Image
              src={user.avatar_url ? user.avatar_url : UsrIcon}
              alt="profile picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
            <div className="absolute flex h-full w-full flex-row items-center justify-center rounded-full bg-black opacity-0 duration-500 group-hover:bg-opacity-75 group-hover:opacity-80">
              <h1 className="text-center font-mono text-sm text-white">
                Change PFP
              </h1>
            </div>
            <input
              ref={pfpRef}
              onChange={(e) => {
                ChangePfP(e, ActiveUser?.user);
              }}
              type="file"
              hidden
            />
          </picture>
        ) : (
          <Image
            src={user.avatar_url ? user.avatar_url : UsrIcon}
            alt="profile picture"
            width={64}
            height={64}
            style={{ borderRadius: "100%" }}
          />
        )}
        <ol>
          <h1 className="font-eudoxus text-6xl font-black dark:text-white/70">
            {user?.real_name}
          </h1>
          <h2 className="font-eudoxus text-xl font-light text-slate-500 dark:text-slate-200/50">
            @{user?.username}
          </h2>
        </ol>
        {user?.verified && (
          <IoSchool className="rounded-full bg-blue-700 p-1 text-4xl text-blue-100 dark:text-blue-300" />
        )}
      </ul>

      {user.id !== ActiveUser.user?.id && <FollowButton id={user.id} />}
      <section className="flex flex-row gap-3 font-eudoxus">
        <ul className="flex w-16 items-center justify-center rounded-lg bg-white p-1 shadow-sm dark:bg-zinc-700">
          <p className="font-semibold capitalize text-orange-700 dark:text-orange-500/70">
            {user?.role}
          </p>
        </ul>
        <ul
          onClick={() => {
            if (isActiveUser) {
              //@ts-ignore
              modal.CreateModal(MajorMod);
            }
          }}
          className={`${
            isActiveUser && "cursor-pointer duration-300 hover:bg-slate-200/60"
          } flex items-center justify-center text-nowrap rounded-lg bg-white p-1 px-3 shadow-sm dark:bg-zinc-700`}
        >
          <p className="font-semibold capitalize text-indigo-700 dark:text-pink-200/50">
            {user?.major ? user.major : "Undecided"}
          </p>
        </ul>
        <ul className="flex items-center justify-center text-nowrap rounded-lg bg-white p-1 px-3 shadow-sm dark:bg-zinc-700">
          <p className="font-semibold capitalize text-cyan-700 dark:text-cyan-300/50">
            {user?.college ? user.college : "No College Set"}
          </p>
        </ul>
        <button
          onClick={() =>
            modal.CreateDialogBox(
              <div className="w-96 font-eudoxus">
                <IoCheckmarkCircleOutline className="text-4xl text-blue-600" />
                <b className="text-2xl">This User Is Verified.</b>
                <p>
                  This user is verified. In order to gain verification, you must
                  prove your status in MESA. Note that being verified still
                  allows you to use the application.
                </p>
              </div>,
              () => {
                router.push("/docs/general?a=verified&fromelse=true");
              },
              {
                confirmText: "More Info",
                canUnmount: true,
                cancelText: "Close",
              },
            )
          }
          className="flex items-center justify-center text-nowrap rounded-lg bg-blue-600 p-1 px-3 shadow-sm duration-300 hover:bg-blue-600/70 dark:bg-zinc-700 hover:dark:bg-zinc-700/50"
        >
          <p className="flex flex-row items-center gap-2 font-semibold capitalize text-white">
            {user?.verified ? (
              <>
                <IoCheckmarkCircle /> Verified
              </>
            ) : (
              "Not Verified"
            )}
          </p>
        </button>
      </section>

      <h2
        onClick={() => {
          if (isActiveUser) {
            //@ts-ignore
            modal.CreateModal(BioComp);
          }
        }}
        className={`dark:text-white ${
          isActiveUser &&
          "cursor-pointer p-3 duration-300 hover:bg-slate-200/60"
        }`}
      >
        {user?.bio ? user.bio : "This user has no bio set."}
      </h2>

      <section className="border-b-2" />
      {isActiveUser && <YourProfile />}

      {user.boxlist && (
        <section ref={InfoBoxRef} className="flex flex-col gap-3">
          <ul className="grid h-full w-full grid-cols-2 gap-1 font-eudoxus">
            {user.boxlist.map((e: any) => {
              return (
                <section
                  key={e.contents}
                  className="min-h-full w-full rounded-md bg-white p-5 dark:bg-zinc-700"
                >
                  {Index.map((d: any, i: number) => {
                    if (d.title.toLowerCase() === e.type.toLowerCase()) {
                      return (
                        <div key={i}>
                          <h1 className="font-bold dark:text-slate-200">
                            {d.title}
                          </h1>
                          <d.component data={e} />
                        </div>
                      );
                    }
                  })}
                </section>
              );
            })}
          </ul>
          <Infoblocks user={user} />
        </section>
      )}

      <section
        className="z-10 flex w-full flex-col gap-4 lg:flex-row"
        onContextMenu={(e) => e.preventDefault()}
        ref={ActivityRef}
      >
        <article className="flex w-full flex-col gap-3">
          <h2 className="font-eudoxus text-3xl font-black dark:text-white/80">
            Activity
          </h2>
          <UserPosts id={user.id} />
        </article>
        <article className="flex w-full flex-col gap-3">
          <h2 className="font-eudoxus text-3xl font-black dark:text-white/80">
            Created Events
          </h2>
          <UserEvents id={user.id} />
        </article>
      </section>
      <section
        className="z-10 flex w-full flex-col gap-4 rounded-3xl p-7 dark:bg-zinc-900"
        onContextMenu={(e) => e.preventDefault()}
        ref={CertRef}
      >
        <h2 className="font-eudoxus text-3xl font-bold dark:text-white/80">
          <IoTrophy />
          Achievements and Certifications
        </h2>
        {profile?.id && <Achievements />}
      </section>
      <SideNavProfile maps={refMap} />
    </main>
  );
};

export default ProfilePage;
