"use server"

import {serverside} from "../../../../../../../config/serverside";

export async function updateClass(newClass: any) {
  const class2 = { ...newClass, category: undefined, name: undefined, 
    classid: newClass.id, id: undefined,
    num: undefined, units: undefined };
  console.log(class2)
  const { error } = await serverside.from('userclasses').update({...class2}).match({classid: newClass.id, userid: (await serverside.auth.getUser()).data.user?.id})
  
  console.log(error)
  return { error }
}
