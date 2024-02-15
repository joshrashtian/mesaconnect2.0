export type Person = {
    name: string;
    major: string
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