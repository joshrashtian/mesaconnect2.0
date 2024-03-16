import { supabase } from "../../../../../../config/mesa-config";
import { PollType } from "../_components/PollCard";

const DeletePoll = async (id: PollType) => {
  const { error: InitialErr } = await supabase
    .from("questions")
    .delete()
    .eq("id", id.id);

  if (InitialErr) console.error(InitialErr);

  if (id.context) {
    const { error: QuestionError } = await supabase.storage
      .from("questionContexts")
      .remove([`${id.id}.${id?.contextType}`]);

    if (QuestionError) {
      console.error(QuestionError);
      return;
    }
  }
};

export const deleteResponses = async (id: string) => {
  const { error: QuestionError } = await supabase
    .from("questionRepsonses")
    .delete()
    .eq("question_id", id);

  if (QuestionError) {
    console.error(QuestionError);
    return;
  }

  console.log("successfully deleted ");
};

export { DeletePoll };
