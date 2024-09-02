import CurrentEventSegment from '../socialhub/CurrentEventSegment'

export const widgets = [
  {
    name: 'Your Events',
    size: 'tall',
    style: 'bg-zinc-200',
    widget: () => <CurrentEventSegment />,
    showcase: () => (
      <section
        className={`w-52 h-52 flex flex-col gap-2 p-5 justify-center items-center dark:bg-zinc-600 rounded-xl bg-zinc-100 `}
      >
        <h1 className="font-light text-left text-md dark:text-white">Your Events</h1>
        <ul className="w-full h-full bg-white rounded-xl dark:bg-zinc-800/40" />
        <ul className="w-full h-full bg-white rounded-xl dark:bg-zinc-800/40" />
        <ul className="w-full h-full bg-white rounded-xl dark:bg-zinc-800/40" />
      </section>
    )
  }
]
