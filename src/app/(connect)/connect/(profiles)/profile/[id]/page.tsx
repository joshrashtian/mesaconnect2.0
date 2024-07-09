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
import { IoCopyOutline, IoPersonAddOutline, IoSchool } from "react-icons/io5";
import Infoblocks from "@/app/(connect)/connect/(profiles)/profile/[id]/infoblocks";
import YourProfile from "./YourProfile";
import BioModal from "./BioModal";
import { useModal } from "../../../Modal";
import MajorModal from "./MajorModal";
import UserEvents from "./UserEvents";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<UserData>();
  const pfpRef = useRef<any>();
  const { createContext } = useContextMenu();
  const toast = useToast();

  const ActiveUser = useUser();
  const modal = useModal();
  const isActiveUser = user?.id === ActiveUser.user?.id;

  const BioComp = useCallback(
    () => <BioModal bio={user?.bio} user={ActiveUser.user?.id} />,
    [user, isActiveUser, ActiveUser.user?.id]
  );

  const MajorMod = useCallback(
    () => <MajorModal major={user?.major} user={ActiveUser.user?.id} />,
    [user, isActiveUser, ActiveUser.user?.id]
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
                  `Follow Status Changed For ${user.real_name}`
                );
            },
            icon: <IoPersonAddOutline />,
          },
        ])
      }
      className="min-h-screen p-3 gap-5 pb-32 flex flex-col "
    >
      <ul className="flex flex-row items-end gap-5 ">
        {ActiveUser.user?.id === user.id ? (
          <picture
            onClick={() => {
              pfpRef.current.click();
            }}
            className="hover:scale-110 rounded-full hover:shadow-lg cursor-pointer scale-100 group w-16 h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24 duration-500"
          >
            <Image
              src={user.avatar_url ? user.avatar_url : UsrIcon}
              alt="profile picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
            <div className="w-full h-full absolute group-hover:opacity-80 group-hover:bg-opacity-75 duration-500 flex flex-row justify-center items-center rounded-full opacity-0 bg-black">
              <h1 className="text-white text-sm font-mono text-center">
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
        <ul>
          <h1 className="font-black text-6xl font-eudoxus dark:text-white/70">
            {user?.real_name}
          </h1>
          <h2 className="font-light text-xl font-eudoxus text-slate-500 dark:text-slate-200/50">
            @{user?.username}
          </h2>
        </ul>
      </ul>

      {user.id !== ActiveUser.user?.id && <FollowButton id={user.id} />}
      <section className="flex flex-row gap-3 font-eudoxus">
        <ul className="p-1 rounded-lg w-16 bg-white dark:bg-zinc-700 shadow-sm flex justify-center items-center">
          <h2 className="text-orange-700 dark:text-orange-500/70 font-semibold capitalize">
            {user?.role}
          </h2>
        </ul>
        <ul
          onClick={() => {
            if (isActiveUser) {
              //@ts-ignore
              modal.CreateModal(MajorMod);
            }
          }}
          className={`${
            isActiveUser && "hover:bg-slate-200/60 duration-300 cursor-pointer"
          } p-1 rounded-lg px-3 bg-white text-nowrap dark:bg-zinc-700 shadow-sm flex justify-center items-center`}
        >
          <h2 className="text-indigo-700 dark:text-pink-200/50 font-semibold capitalize">
            {user?.major ? user.major : "Undecided"}
          </h2>
        </ul>
        <ul className="p-1 px-3 rounded-lg bg-white dark:bg-zinc-700 text-nowrap shadow-sm flex justify-center items-center">
          <h2 className="text-cyan-700 dark:text-cyan-300/50 font-semibold capitalize">
            {user?.college ? user.college : "No College Set"}
          </h2>
        </ul>
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
          "hover:bg-slate-200/60 p-3 duration-300 cursor-pointer"
        }`}
      >
        {user?.bio ? user.bio : "This user has no bio set."}
      </h2>

      <section className="border-b-2" />
      {isActiveUser && <YourProfile />}

      {user.boxlist && (
        <section className="flex-col flex gap-3">
          <ul className="flex flex-row w-full h-full font-eudoxus flex-wrap gap-2">
            {user.boxlist.map((e: any) => {
              return (
                <section
                  key={e.contents}
                  className="w-[49%] min-h-full p-5 rounded-xl bg-white"
                >
                  {Index.map((d: any, i: number) => {
                    if (d.title.toLowerCase() === e.type.toLowerCase()) {
                      return (
                        <div key={i}>
                          <h1 className="font-bold">{d.title}</h1>
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
        className="w-full flex flex-row gap-4 z-10"
        onContextMenu={(e) => e.preventDefault()}
      >
        <article className="w-full flex flex-col gap-3">
          <h2 className="font-bold font-eudoxus text-3xl dark:text-white/80 ">
            Activity
          </h2>
          <UserPosts id={user.id} />
        </article>
        <article className="w-full flex flex-col gap-3 ">
          <h2 className="font-bold font-eudoxus text-3xl dark:text-white/80 ">
            Created Events
          </h2>
          <UserEvents id={user.id} />
        </article>
      </section>
    </main>
  );
};

export default ProfilePage;
