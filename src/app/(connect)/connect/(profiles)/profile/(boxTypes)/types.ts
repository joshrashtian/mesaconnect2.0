import { ComponentType, ReactNode } from "react";
import { blockStyles, BlockStyleStyle } from "./blockStyles"

export type BlockDataMap = {
  "In Progress Classes": InProgressClassesData;
  tutors: TutorsData;
  community: CommunityData;
  project: ProjectData;
  interests: InterestsData;
};

export type BlockType = {
  [K in keyof BlockDataMap]: {
    type: K;
    size: "half" | "full";
    data: BlockDataMap[K];
    style: BlockStyle;
    index: number;
    visible: "friends" | "public" | "private";
    id?: string;
  }
}[keyof BlockDataMap];

export type BlockStyle = {
  theme: "default";
  
} | {
    theme: "custom"
      style: BlockStyleStyle;
    }
  | {
      theme: "built-in";
      style: BlockStyleStyle;
      extra?: {
        titleWrapper?: string[];
        contentWrapper?: string[];
      };
      name: keyof typeof blockStyles;
    };

export type InProgressClassesData = {
  userid: string;
  
};

export type TutorsData = {
  dates: {
    day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
    times: number[];
    id: string;
  }[];
};

export type CommunityData = {
  communityid: string;
};

export type ProjectData = {
  projectid: string;
};

export type InterestsData = {
  length: number;
};

export type BlockKey = keyof BlockDataMap;

// this describes your *registry entry* for each block
export interface InfoBlockDef<K extends BlockKey> {
  /** must match the key in your BlockDataMap */
  type: K;
  /** human title shown in the UI */
  title: string;
  /** optional icon */
  icon?: ReactNode;
  /** default size if you want ("half" | "full") */
  size: "half" | "full";
  /** default style object */
  style: BlockStyle;
  /** the view component, which will get exactly the right data shape */
  View: ComponentType<{ data: BlockDataMap[K] }>;
  /** (optional) the creator form/component */
  CreateForm?: ComponentType<unknown> | undefined;
  /** show “add” / “edit” controls? */
  editable?: boolean;
}
