"use server"

import { EventType } from '@/_assets/types';
import { EventUserRecord } from '@/app/events/[id]/kiosk/page';
import Email from '@/emails';
import { CreateEmailResponse, Resend } from 'resend';
import { serverside } from '../../config/serverside';
import fs from "fs"

const resend = new Resend(process.env.RESEND_API_KEY)

export type EventResults = {
    event: EventType;
    attendees: EventUserRecord[];
}

export async function sendEventResults({ event, attendees }: EventResults): Promise<CreateEmailResponse> {
    
    const { data, error } = await serverside
            .from("eventinterest")
            .select()
            .eq("event_id", event.id)
            .csv();

    if (error) {
        //@ts-ignore
        return { error: error.message } 
    }

          
    return await resend.emails.send({
        from: "Joshua <joshua@mesaconnect.io>",
        to: "joshrashtian1@gmail.com",
        subject: "Event Results for ",
        react: Email({event, attendees}),
        attachments: [
            {
                filename: "event-results.csv",
                content: Buffer.from(data).toString("base64"),
                contentType: "text/csv"
            }
        ]})
}