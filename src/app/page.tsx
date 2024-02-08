import Header from '@/_components/home/header'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-24 p-12">
      <Header />
      <div className="max-w-6xl w-full items-center justify-center flex flex-col gap-4 text-sm ">
        <h1 className="text-xl cursor-default text-center font-bold md:text-3xl lg:text-5xl xl:text-6xl text-zinc-700 dark:text-white duration-300 ease-in-out">
          Welcome to the next generation of{' '}
          <span className=" bg-gradient-to-br from-red-700 to-orange-500 bg-clip-text text-transparent">
            MESA
          </span>
          , ready to <span className="hover:text-green-700 duration-500">lead</span> the{' '}
          <span className=" bg-gradient-to-r hover:text-green-700 from-indigo-700 to-blue-500 bg-clip-text text-transparent duration-500">
            next generation.
          </span>
        </h1>
        <h2 className="text-lg text-slate-500">A community for the students, by the students.</h2>
      </div>
    </main>
  )
}
