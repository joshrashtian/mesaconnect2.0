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