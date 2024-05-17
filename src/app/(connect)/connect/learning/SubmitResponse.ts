import { supabase } from '../../../../../config/mesa-config'

export const UploadResult = async (user: any, id: string, response: number) => {
  const { error } = await supabase.from('questionRepsonses').insert({
    responder_id: user.user?.id,
    response: response,
    question_id: id,
    responder_name: user.userData.real_name
  })

  if (error) {
    console.error(error)
    return false
  }

  return true
}
