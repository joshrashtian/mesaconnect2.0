"use server"

import {serverside} from "../../../../../../../config/serverside";
import { ClassType } from "../../../builder/(buildercomponents)/ClassRelations";

export async function updateClass(newClass: any) {
  const class2 = { ...newClass, category: undefined, name: undefined, 
    classid: newClass.id, id: undefined,
    num: undefined, units: undefined };

  const { error } = await serverside.from('userclasses').update({...class2}).match({classid: newClass.id, userid: (await serverside.auth.getUser()).data.user?.id, transactionid: class2.transactionid})

  return { error }
}

export async function sortClasses(classes: any[] | null) {
  if (!classes) return [];
  const seasons = ["Winter", "Spring", "Summer", "Fall"];

  const semesters = classes.map((c) => {
    return {
      ...c,
      year: parseInt(c.semester.split(" ")[1]),
      season: c.semester.split(" ")[0],
    };
  })

  return semesters.sort((lhs, rhs) => {
       return lhs.year - rhs.year || +seasons.indexOf(lhs.season) - +seasons.indexOf(rhs.season) ;
     }).reverse().map((a) => ({...a, semester: `${a.season} ${a.year}`, year: undefined, season: undefined}));

    
  
}