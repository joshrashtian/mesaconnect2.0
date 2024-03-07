import { supabase } from "../../../../../../config/mesa-config";
import { PollType } from "../_components/PollCard";

const DeletePoll = async (id: PollType) => {
  console.log(id);
  const { error: InitialErr } = await supabase
    .from("questions")
    .delete()
    .eq("id", id.id);

  if (InitialErr) {
    console.error(InitialErr);
    return;
  }

  if (id.context) {
    console.log(id.id);

    const { error: QuestionError } = await supabase.storage
      .from("questionContexts")
      .remove([`${id.id}.${id?.contextType}`]);

    if (QuestionError) {
      console.error(QuestionError);
      return;
    }
  }
};

export { DeletePoll };
