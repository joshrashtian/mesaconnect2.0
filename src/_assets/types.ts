export type Person = {
  name: string;
  major: string;
};

export type Box = {
  type: string;
  contents?: string;
  skills?: string[];
  textColor?: string;
};

export type UserData = {
  id: string;
  created_at: Date;
  username: string;
  role: string;
  real_name: string;
  avatar_url: string;
  classes?: JSON;
  major?: string;
  boxlist: object[];
  bio?: string;
  widgets?: {
    name: string;
  };
};

export type PostType = {
  id: string;
  userid: string;
  created_at: Date;
  title: string;
  data: any;
  type?: string;
  tags?: string[];
  creator: {
    name: string;
    id: string;
    username: string;
    realname: string;
  };
};

export type PostItem = {
  text?: string;
  link?: string;
  image?: string;
  type: string;
};

export type EventType = {
  id: string;
  created_at: any;
  name: string;
  desc: string;
  people_attended: JSON;
  start: Date;
  end: Date;
  location: string;
  tags: string[];
  type: string;
};

export type Lesson = {
  id: string;
  created_at: Date;
  userid: string;
  contents: {};
  type: string;
  length?: number;
  featured?: boolean;
  title: string;
  desc?: string;
  tags?: string[];
  coverimage?: string;
};
