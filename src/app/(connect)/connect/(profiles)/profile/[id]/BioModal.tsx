'use client'
import Input from '@/_components/Input'
import React, { useState } from 'react'
import { IoPencil } from 'react-icons/io5'
import { supabase } from '../../../../../../../config/mesa-config'
import { useToast } from '@/app/(connect)/InfoContext'
import { useModal } from '../../../Modal'
import { VscLoading } from 'react-icons/vsc'

const BioModal = ({ bio, user }: { bio: string | undefined; user: string | undefined }) => {
  const [biograph, setBio] = useState<string | undefined>(bio)
  const [submitting, setSubmitting] = useState(false)
  const { DisarmModal } = useModal()
  const { CreateSuccessToast, CreateErrorToast } = useToast()
  return (
    <div>
      <h4 className="font-eudoxus font-bold text-2xl">Change Bio</h4>
      <Input
        value={biograph}
        onChange={(e) => setBio(e.target.value)}
        contentEditable
        icon={<IoPencil />}
      />
      <button
        onClick={async () => {
          if (!submitting) {
            setSubmitting(true)
            if (biograph) {
              const { error } = await supabase
                .from('profiles')
                .update({
                  //@ts-ignore
                  bio: biograph
                })
                //@ts-ignore
                .eq('id', user)
              if (error) {
                CreateErrorToast(error.message)
                setSubmitting(false)
              } else {
                CreateSuccessToast('Succesfully Updated Bio!')
                DisarmModal()
              }
            }
          }
        }}
        className={`w-1/3 h-12 hover:scale-105 duration-500 justify-center flex items-center ${
          submitting ? 'bg-theme-blue-2' : 'bg-orange-500 hover:bg-orange-400'
        } shadow-lg z-40 text-white font-bold rounded-2xl`}
      >
        {submitting ? <VscLoading className="animate-spin text-center" /> : 'Submit'}
      </button>
    </div>
  )
}

export default BioModal
