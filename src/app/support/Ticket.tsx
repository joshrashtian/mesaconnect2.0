"use client"

export type Ticket = {
  title: string,
  details: string,
  type: 'ticket' | 'suggestion',
  userid?: string
  created_at: Date
}

export default function Ticket({ data } : { data: Ticket}) {
  return (
    <div className="h-80 w-60 duration-500 hover:scale-105 text-center font-mono gap-4 bg-white rounded-md flex flex-col justify-between items-center p-5">
      <ul className="w-5 h-3 bg-slate-500 rounded-xl" />
      <div>
      <h3>
        {data.title}
      </h3>
      <p className="font-geist">
        {data.details.slice(0, 60)}
      </p>
      </div><div>
      <p className="capitalize">{data.type}</p>
      <p>{ data.userid && 'Verified User'}</p>
    </div>
    </div>
  )
}
