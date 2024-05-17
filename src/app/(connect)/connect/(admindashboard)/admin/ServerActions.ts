"use server"
import {UserData} from "@/_assets/types";
import {serverside} from "../../../../../../config/serverside";

export async function UploadNews(contents: { title: string, tags: string[], contents: Object }, user: UserData) {
    const { data, error } = await serverside.from('newsposts').insert({ title: contents.title, tags: contents.tags, details: contents.contents, userid: user.id })

    return { data, error }
}