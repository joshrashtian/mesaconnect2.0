'use server'
import React from 'react'
import { serverside } from '../../../../../../../../config/serverside'
import ClassesRegister from './classes'
import LoadingPage from '@/_components/LoadingPage'

const SelectClasses = async () => {
  const { data } = await serverside.schema('information').from('classes').select()

  return (
    <div>
      <h1>New Classes</h1>
      <section>{data ? <ClassesRegister classes={data} /> : <LoadingPage />}</section>
    </div>
  )
}

export default SelectClasses
