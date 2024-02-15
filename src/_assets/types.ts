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

export type Post = {
    id: number;
    userId: number;
    created_at: Date;
    title: string; 
    data: JSON;
    type?: string;
    tags?: string[];
}