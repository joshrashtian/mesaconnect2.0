"use server"
import {serverside} from "../../../config/serverside";

export async function SubmitTicket(title: string, details: string, type: 'ticket' | 'suggestion') {
    const { error } = await serverside.from('tickets').insert({
        title, details, type
    })

    if(error) console.error(error.message)

    return { error }
}