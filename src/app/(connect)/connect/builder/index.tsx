import {
  IoChatboxSharp,
  IoLinkOutline,
  IoPeopleOutline,
  IoPersonCircleOutline
} from 'react-icons/io5'
import BuildPost from './(buildercomponents)/BuildPost'
import AboutSection from './(profbuildercomponents)/AboutSection'
import EventBuilder from './(profbuildercomponents)/EventBuilder'
import Projects from './(profbuildercomponents)/Projects'
import SkillsSection from './(profbuildercomponents)/SkillsSection'
import { FaListCheck } from 'react-icons/fa6'
import Interests from './(profbuildercomponents)/Interests'
import { MdInterests } from 'react-icons/md'

export const BuilderIndex = [
  {
    postType: 'Post',
    onSelect: () => {
      return <BuildPost />
    },
    class: 0,
    icon: (params: any) => <IoChatboxSharp {...params} />
  },
  {
    postType: 'Event',
    onSelect: () => {
      return (
        <main className="flex flex-col w-full gap-14 p-5">
          <h1 className="text-slate-500 text-4xl ">Event Builder</h1>
          <EventBuilder />
        </main>
      )
    },
    class: 0,
    icon: (params: any) => <FaListCheck {...params} />
  },
  {
    postType: 'About',
    onSelect: () => {
      return (
        <main className="flex flex-col w-full gap-14 p-5">
          <h1 className="text-slate-500 text-4xl ">Basic Information</h1>
          <AboutSection />
          <SkillsSection />
        </main>
      )
    },
    class: 1,
    icon: (params: any) => <IoPersonCircleOutline {...params} />
  },
  {
    postType: 'Projects',
    onSelect: () => {
      return (
        <main className="flex flex-col w-full gap-14 p-5">
          <h1 className="text-slate-500 text-4xl ">Links</h1>
          <Projects />
        </main>
      )
    },
    class: 1,
    icon: (params: any) => <IoLinkOutline {...params} />
  },
  {
    postType: 'Interests',
    onSelect: () => {
      return (
        <main className="flex flex-col font-eudoxus w-full gap-14 p-5">
          <h1 className="text-slate-500 text-4xl ">Interests</h1>
          <Interests />
        </main>
      )
    },
    class: 1,
    icon: (params: any) => <MdInterests {...params} />
  }
]
