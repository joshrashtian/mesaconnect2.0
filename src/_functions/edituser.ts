"use server"

import {UserData} from "@/_assets/types";
import {serverside} from "../../config/serverside";

export async function UpdateUser(changes: UserData) {
   const { data, error } = await serverside.from("profiles").update(changes).eq("id", (await serverside.auth.getSession()).data.session?.user.id)

    return { data, error }
}