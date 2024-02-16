export type Person = {
    name: string;
    major: string
}

export type UserData = {
    id: number;
    created_at: Date;
    username: string;
    role: string;
    real_name: string;
    classes?: JSON;
    major?: string;
}

export type PostType = {
    id: number;
    userId: number;
    created_at: Date;
    title: string; 
    data: JSON;
    type?: string;
    tags?: string[];
}

export type PostItem = {
    text?: string,
    link?: string,
    image?: string,
    type: string,
  }