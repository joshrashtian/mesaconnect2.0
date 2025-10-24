"use client";

import UsrIcon from "../../../../../../_assets/photos/UserIcon.png";
import { UserData } from "@/_assets/types";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  memo,
  lazy,
  Suspense,
} from "react";
import ConnectionsModal from "./ConnectionsModal";
import { supabase } from "../../../../../../../config/mesa-config";
import Image from "next/image";
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
import YourProfile from "./YourProfile";
import BioModal from "./BioModal";
import { useModal } from "../../../Modal";
import MajorModal from "./MajorModal";
import SideNavProfile from "./profile_sidenav";
import Achievements from "./Achievements";
import { useProfile } from "./ProfileContext";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
// Lazy load heavy components
const UserPosts = lazy(() => import("./UserPosts"));
const Infoblocks = lazy(() => import("./infoblocks"));
const UserEvents = lazy(() => import("./UserEvents"));

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const [tab, setTab] = useState<string>("infoblocks");

  const pfpRef = useRef<HTMLInputElement>(null);
  const { createContext } = useContextMenu();
  const toast = useToast();
  const router = useRouter();

  const ActiveUser = useUser();
  const profile = useProfile();
  const modal = useModal();

  // Use profile data from context instead of separate state
  const user = profile?.data;
  const isActiveUser = useMemo(
    () => user?.id === ActiveUser.user?.id,
    [user?.id, ActiveUser.user?.id],
  );

  //references
  const InfoBoxRef = useRef<HTMLDivElement>(null);
  const ActivityRef = useRef<HTMLDivElement>(null);
  const TopPageRef = useRef<HTMLUListElement>(null);
  const CertRef = useRef<HTMLDivElement>(null);

  const refMap = useMemo(
    () =>
      new Map([
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
      ]),
    [],
  );

  const BioComp = useCallback(
    () => <BioModal bio={user?.bio} user={ActiveUser.user?.id} />,
    [user?.bio, ActiveUser.user?.id],
  );

  const MajorMod = useCallback(
    () => <MajorModal major={user?.major} user={ActiveUser.user?.id} />,
    [user?.major, ActiveUser.user?.id],
  );

  const ConnectionsMod = useCallback(
    () => <ConnectionsModal connections={profile?.connections} />,
    [profile?.connections],
  );

  if (!user) {
    return <LoadingPage />;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
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
          <div
            onClick={() => {
              pfpRef?.current?.click();
            }}
            className="group relative h-16 w-16 scale-100 cursor-pointer rounded-full duration-500 hover:scale-110 hover:shadow-lg lg:h-20 lg:w-20 2xl:h-24 2xl:w-24"
          >
            <Image
              src={user.avatar_url || UsrIcon}
              alt="profile picture"
              fill
              sizes="(max-width: 768px) 64px, (max-width: 1200px) 80px, 96px"
              className="rounded-full object-cover"
              priority
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
              accept="image/*"
              hidden
            />
          </div>
        ) : (
          <div className="relative h-16 w-16 lg:h-20 lg:w-20 2xl:h-24 2xl:w-24">
            <Image
              src={user.avatar_url || UsrIcon}
              alt="profile picture"
              fill
              sizes="(max-width: 768px) 64px, (max-width: 1200px) 80px, 96px"
              className="rounded-full object-cover"
            />
          </div>
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
      <motion.section
        className="flex flex-row gap-3 font-eudoxus"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, staggerChildren: 0.1 }}
      >
        <motion.ul
          className="flex w-16 items-center justify-center rounded-lg bg-white p-1 shadow-sm dark:bg-zinc-700"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-semibold capitalize text-orange-700 dark:text-orange-500/70">
            {user?.role}
          </p>
        </motion.ul>
        <motion.ul
          onClick={() => {
            if (isActiveUser) {
              modal.CreateModal(MajorMod());
            }
          }}
          className={`${
            isActiveUser && "cursor-pointer duration-300 hover:bg-slate-200/60"
          } flex items-center justify-center text-nowrap rounded-lg bg-white p-1 px-3 shadow-sm dark:bg-zinc-700`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={isActiveUser ? { scale: 1.05 } : {}}
          whileTap={isActiveUser ? { scale: 0.95 } : {}}
        >
          <p className="font-semibold capitalize text-indigo-700 dark:text-pink-200/50">
            {user?.major ? user.major : "Undecided"}
          </p>
        </motion.ul>
        <motion.ul
          className="flex items-center justify-center text-nowrap rounded-lg bg-white p-1 px-3 shadow-sm dark:bg-zinc-700"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-semibold capitalize text-cyan-700 dark:text-cyan-300/50">
            {user?.college ? user.college : "No College Set"}
          </p>
        </motion.ul>
        <motion.ul
          className="flex items-center justify-center text-nowrap rounded-lg bg-white p-1 px-3 shadow-sm dark:bg-zinc-700"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="font-semibold capitalize text-cyan-700 dark:text-cyan-300/50">
            {user?.xp} XP
          </p>
        </motion.ul>
        <motion.ul
          onClick={() => {
            modal.CreateModal(ConnectionsMod());
          }}
          className="flex items-center justify-center text-nowrap rounded-lg bg-white p-1 px-3 shadow-sm dark:bg-zinc-700"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="font-semibold capitalize text-cyan-700 dark:text-cyan-300/50">
            {profile?.connections?.length ?? 0} Connections
          </p>
        </motion.ul>
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
      </motion.section>

      <h2
        onClick={() => {
          if (isActiveUser) {
            modal.CreateModal(BioComp());
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
      <ul className="flex flex-row gap-6 text-2xl font-bold">
        <motion.li
          onClick={() => setTab("infoblocks")}
          className={`duration-300 hover:text-orange-500 ${tab === "infoblocks" ? "text-orange-500" : "text-gray-500"} relative cursor-pointer`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          About Me
          {tab === "infoblocks" && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
              layoutId="activeTab"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.li>
        <motion.li
          onClick={() => setTab("activity")}
          className={`duration-300 hover:text-orange-500 ${tab === "activity" ? "text-orange-500" : "text-gray-500"} relative cursor-pointer`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Activity
          {tab === "activity" && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
              layoutId="activeTab"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.li>
        <motion.li
          onClick={() => setTab("events")}
          className={`duration-300 hover:text-orange-500 ${tab === "events" ? "text-orange-500" : "text-gray-500"} relative cursor-pointer`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Events
          {tab === "events" && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
              layoutId="activeTab"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.li>
      </ul>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingPage />}>
          {tab === "activity" && (
            <motion.div
              key="activity"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <UserPosts id={user.id} />
            </motion.div>
          )}
          {tab === "infoblocks" && (
            <motion.div
              key="infoblocks"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Infoblocks />
            </motion.div>
          )}
          {tab === "events" && (
            <motion.div
              key="events"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <UserEvents id={user.id} />
            </motion.div>
          )}
        </Suspense>
      </AnimatePresence>

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
    </motion.main>
  );
};

export default memo(ProfilePage);
