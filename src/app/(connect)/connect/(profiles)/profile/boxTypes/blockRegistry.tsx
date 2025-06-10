"use client";
// blockRegistry.tsx
import dynamic from "next/dynamic";
import type {
  InfoBlockDef,
  BlockKey,
  InProgressClassesData,
  CommunityData,
  TutorsData,
  ProjectData,
  InterestsData,
} from "../(boxTypes)/types";
import { MdInterests } from "react-icons/md";
import { IoBuildOutline } from "react-icons/io5";
import { CreateInProg } from "../[id]/(infoblockscreator)/InProgClassesEdit";
import { CreateInterest } from "../[id]/(infoblockscreator)/InterestsBlock";

export type BlockRegistry = { [K in BlockKey]: InfoBlockDef<K> };

// Lazy-load each component so it only ships when used
export const ClassBox = dynamic<{ data: InProgressClassesData }>(
  () => import("../(boxTypes)/ClassBlack").then((mod) => mod.default),
  { ssr: false },
);
const TutorView = dynamic(
  () =>
    import("../(boxTypes)/TutorBlock").then(
      (m) => m.TutorBlock as React.ComponentType<{ data: TutorsData }>,
    ),
  { ssr: false },
);
const TutorSettings = dynamic(
  () =>
    import("../(boxTypes)/TutorBlock").then(
      (m) => m.TutorBlockSettings as React.ComponentType<unknown>,
    ),
  { ssr: false },
);
const CreateTutor = dynamic(
  () => import("../(boxTypes)/TutorBlock").then((m) => m.CreateTutorBlock),
  { ssr: false },
);
const CommunityView = dynamic(
  () =>
    import("../(boxTypes)/CommunityBlock").then(
      (m) => m.default as React.ComponentType<{ data: CommunityData }>,
    ),
  { ssr: false },
);
const CommunityEdit = dynamic(
  () =>
    import("../(boxTypes)/CommunityBlock").then(
      (m) => m.CommunityEdit as React.ComponentType<unknown>,
    ),
  { ssr: false },
);

const CreateProject = dynamic(
  () => import("../(boxTypes)/ProjectBox").then((m) => m.default),
  { ssr: false },
);
const CreateCommunity = dynamic(
  () =>
    import("../(boxTypes)/CommunityBlock").then((m) => m.CreateCommunityBlock),
  { ssr: false },
);
const ProjectView = dynamic(
  () =>
    import("../(boxTypes)/ProjectBox").then(
      (m) => m.default as React.ComponentType<{ data: ProjectData }>,
    ),
  { ssr: false },
);
const SkillsView = dynamic(
  () => import("../(boxTypes)/Skills").then((m) => m.default),
  {
    ssr: false,
  },
);
const InterestsView = dynamic(
  () =>
    import("../(boxTypes)/interestsblock").then(
      (m) => m.default as React.ComponentType<{ data: InterestsData }>,
    ),
  { ssr: false },
);

export const blockDefinitions: BlockRegistry = {
  "In Progress Classes": {
    type: "In Progress Classes",
    title: "In Progress Classes",
    icon: <IoBuildOutline />,
    size: "full",
    style: { theme: "default" },
    View: ClassBox, // now correctly typed
    CreateForm: CreateInProg,
    editable: true,
  },
  tutors: {
    type: "tutors",
    title: "Tutors",
    icon: <MdInterests />,
    size: "half",
    style: { theme: "default" },
    View: TutorView,
    CreateForm: () => null,

    editable: true,
  },
  community: {
    type: "community",
    title: "Community",
    icon: <IoBuildOutline />,
    size: "half",
    style: { theme: "default" },
    View: CommunityView,
    CreateForm: () => null,
    editable: true,
  },
  project: {
    type: "project",
    title: "Links",
    icon: <IoBuildOutline />,
    size: "half",
    style: { theme: "default" },
    View: ProjectView,
    CreateForm: CreateProject,
  },
  interests: {
    type: "interests",
    title: "Interests",
    icon: <MdInterests />,
    size: "half",
    style: { theme: "default" },
    View: InterestsView,
    CreateForm: CreateInterest, // or a dedicated form

    editable: true,
  },
};
