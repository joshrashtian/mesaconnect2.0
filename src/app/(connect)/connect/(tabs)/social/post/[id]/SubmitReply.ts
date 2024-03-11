import { ContextProps } from '@/app/AuthContext'
import { supabase } from '../../../../../../../../config/mesa-config'

export async function SubmitReply(
  user: ContextProps,
  postid: string,
  replyContents: string,
  isPrivate: boolean
) {
  let errorMessage
  const { error } = await supabase.from('replies').insert({
    user_id: user.user?.id,
    post_id: postid,
    reply: replyContents,
    private: isPrivate,
    creator: {
      realname: user.userData?.real_name,
      avatar_url: user.userData?.avatar_url,
      username: user.userData?.username
    }
  })

  if (error) {
    console.log(error)
    errorMessage = error.message
  }

  return { errorMessage }
}
