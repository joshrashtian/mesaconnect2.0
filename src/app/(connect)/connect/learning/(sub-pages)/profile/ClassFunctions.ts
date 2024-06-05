"use server"

import {serverside} from "../../../../../../../config/serverside";

export async function updateClass(newClass: any) {
  const class2 = { ...newClass, category: undefined, name: undefined, id: undefined, num: undefined, units: undefined };
  const { error } = await serverside.from('userclasses').update({...class2}). match({classid: newClass.classid, userid: (await serverside.auth.getUser()).data.user?.id})

  return { error }
}
