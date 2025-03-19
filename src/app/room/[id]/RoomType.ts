export type RoomAdditionalData = {
    todolist?: {
      name: string;
      completed: boolean;
    }[];
    notes?: {
      name: string;
      content: string;
  }[];
  
};  

export type Environment = {
  name: string;
  type: EnvironmentType;
  content: EnvironmentContent;
  audio?: string;
} 

export type EnvironmentType = "environment" | "color" | "image" 

export type EnvironmentContent = string 