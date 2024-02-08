"use client"
import Header from '@/_components/home/header'
import MajorsText from '@/_components/home/majorsText'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-24 p-12">
      <Header />
      <section className="max-w-6xl w-full h-[70vh] items-center justify-center flex flex-col gap-4 text-sm ">
        <h1 className="text-xl cursor-default text-center font-bold md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-zinc-700 dark:text-white duration-300 ease-in-out">
          Welcome to the next generation of{' '}
          <span className=" bg-gradient-to-br from-red-700 to-orange-500 bg-clip-text text-transparent">
            MESA
          </span>
          , ready to <span className="hover:text-green-700 duration-500">lead</span> the{' '}
          <span className=" bg-gradient-to-r hover:text-green-700 from-indigo-700 to-blue-500 bg-clip-text hover:scale-105 text-transparent duration-500 ease-in-out">
            next generation.
          </span>
        </h1>
        <h2 className="text-lg text-slate-500">A community for the students, by the students.</h2>
      </section>
      <section className="max-w-[80%] w-full h-screen border-t-2 border-slate-300 items-center justify-center flex flex-col gap-4 text-sm ">
        <MajorsText />
      </section>
    </main>
  )
}
