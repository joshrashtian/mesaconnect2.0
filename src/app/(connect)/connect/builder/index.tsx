import BuildPost from './(buildercomponents)/BuildPost'
import AboutSection from './(profbuildercomponents)/AboutSection'
import SkillsSection from './(profbuildercomponents)/SkillsSection'

export const BuilderIndex = [
  {
    postType: 'Post',
    onSelect: () => {
      return <BuildPost />
    },
    class: 0
  },
  {
    postType: 'Wim',
    onSelect: () => {
      return (
        <div>
          <h1>Wim</h1>
        </div>
      )
    },
    class: 0
  },
  {
    postType: 'Basic Information',
    onSelect: () => {
      return (
        <main className="flex flex-col w-full gap-14 overflow-y-scroll p-3 overflow-x-visible">
          <h1 className="text-slate-500 text-4xl ">Basic Information</h1>
          <AboutSection />
          <SkillsSection />
        </main>
      )
    },
    class: 1
  }
]
