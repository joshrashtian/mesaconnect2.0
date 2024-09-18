"use client"
import React from 'react';
import {useSettings} from "@/app/AuthContext";
import Switch from "@/app/(connect)/connect/(profiles)/profile/[id]/(infoblockscreator)/Switch";
import {UpdateSettings} from "@/app/(connect)/connect/settings/SettingsUpdate";
import {useToast} from "@/app/(connect)/InfoContext";
import {IoSettings} from "react-icons/io5";

export type settings = {
    taskbar: 'default' | 'open'
}

const Settings = () => {
    const PreSettings = useSettings()
    const [settings, setSettings] = React.useState<settings>(PreSettings);
    const [changed, setChanged] = React.useState(false);
    const toast = useToast()
    return (
        <div>
            <header className="flex flex-row justify-between gap-4">
                <ul className="text-green-900 w-1/2 p-4 bg-zinc-100/60 dark:bg-zinc-700 dark:text-green-300 border-2 rounded-2xl border-slate-500">
                    <p className="font-black">Local Settings</p>
                    <pre>

                {JSON.stringify(settings, null, 2)}
            </pre>
                </ul>
                <ul className="text-green-700 w-1/2 p-4 bg-zinc-100/60 dark:bg-zinc-700 dark:text-green-300 border-2 rounded-2xl border-slate-500">
                    <p className="font-black">Unaltered</p>
                    <pre>
                {JSON.stringify(PreSettings, null, 2)}
            </pre>
                </ul>

            </header>
            <button onClick={async () => { let {error} = await UpdateSettings(settings);
                if(error) toast.CreateErrorToast(error.message)
                else toast.CreateSuccessToast("Settings Successfully Updated")
                window.location.reload()
            }} className="p-4 text-xl my-4 duration-500 hover:scale-105 bg-gradient-to-br from-theme-blue to-theme-blue-2 text-white rounded-2xl">
                <IoSettings /> Update Settings
            </button>
            <ul>
                <p className='dark:text-slate-200'>Constantly Locked Taskbar</p>
                <Switch click={() => setSettings({ ...settings, taskbar: settings.taskbar === 'default' ? "open" : "default"})} toggled={settings.taskbar !== 'default'} />
            </ul>

        </div>
    );
};

export default Settings;