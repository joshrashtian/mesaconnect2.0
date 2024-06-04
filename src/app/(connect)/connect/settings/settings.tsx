"use client"
import React from 'react';
import {useSettings} from "@/app/AuthContext";
import Switch from "@/app/(connect)/connect/(profiles)/profile/[id]/(infoblockscreator)/Switch";

export type settings = {
    taskbar: 'default' | 'open'
}

const Settings = () => {
    const PreSettings = useSettings()
    const [settings, setSettings] = React.useState<settings>(PreSettings);
    return (
        <div>
            <header className="flex flex-row justify-between gap-4">
                <ul className="text-green-900 w-1/2 p-4 bg-zinc-100/60 border-2 rounded-2xl border-slate-500">
                    <p className="font-black">Local Settings</p>
                    <pre>

                {JSON.stringify(settings, null, 2)}
            </pre>
                </ul>
                <ul className="text-green-700 w-1/2 p-4 bg-zinc-100/60 border-2 rounded-2xl border-slate-500">
                    <p className="font-black">Unaltered</p>
                    <pre>
                {JSON.stringify(PreSettings, null, 2)}
            </pre>
                </ul>

            </header>
            <ul>
                <p>Constantly Locked Taskbar</p>
                <Switch click={() => setSettings({ ...settings, taskbar: settings.taskbar === 'default' ? "open" : "default"})} toggled={settings.taskbar === 'default'} />
            </ul>
        </div>
    );
};

export default Settings;