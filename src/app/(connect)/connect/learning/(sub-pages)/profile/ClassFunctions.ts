"use server"

import {serverside} from "../../../../../../../config/serverside";

export async function updateClass(newClass: any) {
  const class2 = { ...newClass, category: undefined, name: undefined, 
    classid: newClass.id, id: undefined,
    num: undefined, units: undefined };

  const { error } = await serverside.from('userclasses').update({...class2}).match({classid: newClass.id, userid: (await serverside.auth.getUser()).data.user?.id, transactionid: class2.transactionid})

  return { error }
}
