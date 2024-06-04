"use server"
import {settings} from "@/app/(connect)/connect/settings/settings";
import {serverside} from "../../../../../config/serverside";

export async function UpdateSettings(Updated: settings) {
    const { error } = await serverside.from('settings').update({ data: Updated }).eq('id', (await serverside.auth.getUser()).data.user?.id)

    if(error) {
        console.error(error)
    }

    return { error }
}