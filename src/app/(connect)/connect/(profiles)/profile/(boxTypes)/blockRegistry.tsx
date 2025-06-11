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
} from "./types";
import { MdInterests } from "react-icons/md";
import { IoBuildOutline } from "react-icons/io5";

export type BlockRegistry = { [K in BlockKey]: InfoBlockDef<K> };

// Lazy-load each component so it only ships when used
export const ClassBox = dynamic<{ data: InProgressClassesData }>(
  () => import("./ClassBlack").then((mod) => mod.default),
  { ssr: false },
);
const TutorView = dynamic(
  () =>
    import("./TutorBlock").then(
      (m) => m.TutorBlock as React.ComponentType<{ data: TutorsData }>,
    ),
  { ssr: false },
);
const CreateInProg = dynamic(
  () =>
    import("../[id]/(infoblockscreator)/InProgClassesEdit").then(
      (m) => m.CreateInProg as React.ComponentType<unknown>,
    ),
  { ssr: false },
);
const InProgClassesEdit = dynamic(
  () =>
    import("../[id]/(infoblockscreator)/InProgClassesEdit").then(
      (m) => m.default,
    ),
  { ssr: false },
);
const CreateTutor = dynamic(
  () => import("./TutorBlock").then((m) => m.CreateTutorBlock),
  { ssr: false },
);
const CommunityView = dynamic(
  () =>
    import("./CommunityBlock").then(
      (m) => m.default as React.ComponentType<{ data: CommunityData }>,
    ),
  { ssr: false },
);

const CreateCommunity = dynamic(
  () => import("./CommunityBlock").then((m) => m.CreateCommunityBlock),
  { ssr: false },
);
const ProjectView = dynamic(
  () =>
    import("./ProjectBox").then(
      (m) => m.default as React.ComponentType<{ data: ProjectData }>,
    ),
  { ssr: false },
);

const InterestsView = dynamic(
  () =>
    import("./interestsblock").then(
      (m) => m.default as React.ComponentType<{ data: InterestsData }>,
    ),
  { ssr: false },
);
const CreateInterest = dynamic(
  () =>
    import("../[id]/(infoblockscreator)/InterestsBlock").then(
      (m) => m.CreateInterest as React.ComponentType<unknown>,
    ),
  { ssr: false },
);
const CreateProject = dynamic(
  () => import("./ProjectBox").then((m) => m.default),
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
    EditForm: InProgClassesEdit as React.ComponentType<unknown>,
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
    CreateForm: CreateInterest,

    editable: true,
  },
};
