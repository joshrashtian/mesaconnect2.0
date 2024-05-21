"use server"
import {serverside} from "../../../config/serverside";
import Ticket from "@/app/support/Ticket";

export default async function Tickets() {
  const { data, error } = await serverside.from('tickets').select().limit(5)


  return (
    <main className="flex">
      {
        data?.map((e) => (
          <Ticket key={e.id} data={e} />
        ))
      }
    </main>
  )
}
