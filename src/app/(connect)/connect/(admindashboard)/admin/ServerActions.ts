"use server"
import {serverside} from "../../../../../../config/serverside";

export async function UploadNews(contents: { title: string, tags: string[], contents: Object }, user: any) {
    const { data, error } = await serverside.from('newsposts').insert({ title: contents.title, tags: contents.tags, details: contents.contents, userid: user.id }).select()

    return { data, error }
}
