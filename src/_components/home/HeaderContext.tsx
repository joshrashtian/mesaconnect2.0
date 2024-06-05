import {ContextProps} from "@/app/AuthContext";
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";
import React from "react";
import Image from "next/image";
import {IoChevronForward, IoHammer, IoPerson, IoPersonAdd, IoPersonRemove, IoSchool, IoTicket} from "react-icons/io5";

export const HeaderContext = ({
                      user,
                      isActive = false,
                  }: {
    user: ContextProps;
    isActive: boolean;
}) => {
    if (!isActive) return;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    const options = [

        {
            label: "My Dashboard",
            function: () => {
                router.push("/connect");
            },
            signedIn: true,
            icon: <IoChevronForward />
        },
        {
            label: "Admin Dashboard",
            function: () => {
                router.push(`/connect/builder`);
            },
            signedIn: true,
            permission: user?.userData?.role === "admin",
            icon: <IoChevronForward />
        },
        {
            label: "Support Forums",
            function: () => {
                router.push("/support");
            },
            signedIn: null,
            icon: <IoTicket />
        },
        {
            label: "MESA News",
            function: () => {
                router.push("/news");
            },
            signedIn: null,
            icon: <IoTicket />
        },
        {
            label: "My Profile",
            function: () => {
                router.push(`/connect/profile/${user.user?.id}`);
            },
            signedIn: true,
            icon: <IoPerson />
        },
        {
            label: "MESA Creator",
            function: () => {
                router.push(`/connect/builder`);
            },
            signedIn: true,
            icon: <IoHammer />
        },
        {
            label: "MESA Learning Lab",
            function: () => {
                router.push(`/connect/learning`);
            },
            signedIn: true,
            icon: <IoSchool />
        },
        {
            label: "Sign Out",
            function: () => {
                user.signOut()
                window.location.reload()
            },
            signedIn: true,
            icon: <IoPersonRemove />
        },
        {
            label: "Sign In",
            function: () => {
                router.push(`/sign-in`);
            },
            signedIn: false,
            icon: <IoPersonAdd />
        },
        {
            label: "Create Account",
            function: () => {
                router.push(`/sign-up`);
            },
            signedIn: false,
        },
    ];


    // @ts-ignore
    return (
            <motion.main
                //initial={{ scale: 0 }}
                //animate={{ scale: 1 }}
                //exit={{ scale: 0 }}
                //transition={{ duration: 0.4, type: "spring" }}
                className="absolute rounded-md px-5 p-3.5 bg-white shadow-lg origin-top-right top-20 right-20 z-20"
            >
                { user.userData ?
                <ul className="flex flex-row items-center justify-center gap-1.5">
                    <Image
                        // @ts-ignore
                        src={user.userData?.avatar_url} className="rounded-full w-6 h-6" objectFit="contain" alt="Profile Picture" width={16} height={16} sizes="16px" />
                    <h1 className="">{user.user?.user_metadata.full_name}</h1>
                </ul>
                 : <ul>
                        <h1 className="">Sign In or Create An Account</h1>
                    </ul>}
                <h1 className=" text-center border-b-2 pb-3">{user.user?.email}</h1>
                <section className="flex flex-col mt-2 font-eudoxus">
                    {options.filter(e => ((e.signedIn === !!user.userData) || e.signedIn === null) && (e.permission || e.permission === undefined)).map((option) => (
                        <motion.ul
                            key={option.label}
                            className="p-2 text-center flex justify-between items-center gap-2 hover:bg-gray-100 duration-300 rounded-xl cursor-pointer"
                            onClick={option.function}
                        >

                            {option.label}
                            {option?.icon}
                        </motion.ul>
                    ))}
                </section>
                {/*
            <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                className="bg-black w-full h-full z-10 left-0 top-0 fixed"
                onClick={(e) => {
                    e.preventDefault();
                    disengage();
                }}
            /> */}
            </motion.main>


    );
}