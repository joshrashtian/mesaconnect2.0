import { UserData } from "@/_assets/types";
import { supabase } from "../../../../../../config/mesa-config";

export const ChangeAboutSection = async (user: any, about: object) => {
  if (!user.userData.boxlist) {
    console.log("none", user);
    return;
  }

  let exists;

  user.userData.boxlist.map((e: any) => {
    if (e.type === "about") {
      exists = true;
      return;
    }
  });

  if (exists === true) {
    let copy = user.userData.boxlist;
    copy.map((e: any, i: number) => {
      if (e.type === "about") {
        copy[i] = about;
      }
    });

    console.log("reached");
    const { error } = await supabase
      .from("profiles")
      .update({ boxlist: copy })
      .eq("id", user.userData.id);

    if (error) {
      console.log(error);
      return;
    }

    console.log("Success!");
  } else {
    const { error } = await supabase
      .from("profiles")
      .update({ boxlist: [...user.userData.boxlist, about] })
      .eq("id", user.userData.id);
      if (error) {
        console.log(error);
        return;
      }
    
      console.log("Success!");
    }
  
};
