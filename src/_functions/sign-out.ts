"use server"
import {serverside} from "../../config/serverside";

export async function SignOutServer() {
    const { error } = await serverside.auth.signOut()
}