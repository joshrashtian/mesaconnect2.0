"use server"

import { serverside } from "../../../../../../config/serverside";

export async function getCommunity(id: string) {

    const { data, error } = await serverside
        .from('communities')
        .select('*')
        .match({ id })
        .single()
      
    
    return { data, error };
}

export type Community = {
    id: string;
    name: string;
    description?: string;
    styles?: {
        container?: React.CSSProperties;
        header?: React.CSSProperties;
        body?: React.CSSProperties;
        footer?: React.CSSProperties;
        icon?: React.CSSProperties;
    };
    members: number;
    created_at: string;
    primary_campus: string;
    page_contents: {
        [key: string]: {
            type: PageContent;
            data: any;
        }
    }
}

export type PageContent = "location" | "text_block" | "canvas" | "meeting_time"