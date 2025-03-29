export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      availableinterests: {
        Row: {
          fieldtype: string
          id: string
          interest: string
          popularity: number
        }
        Insert: {
          fieldtype: string
          id?: string
          interest: string
          popularity?: number
        }
        Update: {
          fieldtype?: string
          id?: string
          interest?: string
          popularity?: number
        }
        Relationships: []
      }
      colleges: {
        Row: {
          hours: Json[] | null
          id: string
          mesa_website: string | null
          uid: number
          website: string | null
        }
        Insert: {
          hours?: Json[] | null
          id: string
          mesa_website?: string | null
          uid?: number
          website?: string | null
        }
        Update: {
          hours?: Json[] | null
          id?: string
          mesa_website?: string | null
          uid?: number
          website?: string | null
        }
        Relationships: []
      }
      communities: {
        Row: {
          blocks: Json[] | null
          created_at: string
          description: string | null
          id: string
          interests: string[] | null
          members: number
          name: string | null
          primary_campus: string | null
          private: boolean | null
          styles: Json | null
        }
        Insert: {
          blocks?: Json[] | null
          created_at?: string
          description?: string | null
          id: string
          interests?: string[] | null
          members?: number
          name?: string | null
          primary_campus?: string | null
          private?: boolean | null
          styles?: Json | null
        }
        Update: {
          blocks?: Json[] | null
          created_at?: string
          description?: string | null
          id?: string
          interests?: string[] | null
          members?: number
          name?: string | null
          primary_campus?: string | null
          private?: boolean | null
          styles?: Json | null
        }
        Relationships: []
      }
      communityrelations: {
        Row: {
          communityid: string
          id: string
          joined: string
          role: string | null
          state: Database["public"]["Enums"]["community_states"]
          userid: string
        }
        Insert: {
          communityid: string
          id?: string
          joined?: string
          role?: string | null
          state: Database["public"]["Enums"]["community_states"]
          userid?: string
        }
        Update: {
          communityid?: string
          id?: string
          joined?: string
          role?: string | null
          state?: Database["public"]["Enums"]["community_states"]
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "communityrelations_communityid_fkey"
            columns: ["communityid"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      eventinterest: {
        Row: {
          data: Json | null
          event_id: string
          id: number
          joined: string
          student_id: string | null
          user_id: string | null
        }
        Insert: {
          data?: Json | null
          event_id: string
          id?: number
          joined?: string
          student_id?: string | null
          user_id?: string | null
        }
        Update: {
          data?: Json | null
          event_id?: string
          id?: number
          joined?: string
          student_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_eventinterest_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          creator: string | null
          desc: string | null
          endtime: string | null
          group_ids: string[] | null
          id: string
          image: Json | null
          link: string | null
          location: string
          name: string
          start: string
          status: string | null
          tags: string[]
          type: string | null
          event_search: string | null
        }
        Insert: {
          created_at?: string
          creator?: string | null
          desc?: string | null
          endtime?: string | null
          group_ids?: string[] | null
          id?: string
          image?: Json | null
          link?: string | null
          location: string
          name?: string
          start: string
          status?: string | null
          tags: string[]
          type?: string | null
        }
        Update: {
          created_at?: string
          creator?: string | null
          desc?: string | null
          endtime?: string | null
          group_ids?: string[] | null
          id?: string
          image?: Json | null
          link?: string | null
          location?: string
          name?: string
          start?: string
          status?: string | null
          tags?: string[]
          type?: string | null
        }
        Relationships: []
      }
      infoblocks: {
        Row: {
          created_at: string
          data: Json
          id: string
          type: Database["public"]["Enums"]["Infobox"]
          userid: string
          visible: Database["public"]["Enums"]["visibility"] | null
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          type: Database["public"]["Enums"]["Infobox"]
          userid?: string
          visible?: Database["public"]["Enums"]["visibility"] | null
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          type?: Database["public"]["Enums"]["Infobox"]
          userid?: string
          visible?: Database["public"]["Enums"]["visibility"] | null
        }
        Relationships: []
      }
      interests: {
        Row: {
          fieldtype: string | null
          id: string
          interest: string | null
          interestid: string | null
          userid: string | null
        }
        Insert: {
          fieldtype?: string | null
          id?: string
          interest?: string | null
          interestid?: string | null
          userid?: string | null
        }
        Update: {
          fieldtype?: string | null
          id?: string
          interest?: string | null
          interestid?: string | null
          userid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interests_interestid_fkey"
            columns: ["interestid"]
            isOneToOne: false
            referencedRelation: "availableinterests"
            referencedColumns: ["id"]
          },
        ]
      }
      invitekeys: {
        Row: {
          created_at: string
          creator: string
          id: string
          redeemer: string | null
        }
        Insert: {
          created_at?: string
          creator: string
          id?: string
          redeemer?: string | null
        }
        Update: {
          created_at?: string
          creator?: string
          id?: string
          redeemer?: string | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          contents: Json | null
          coverimage: string | null
          created_at: string
          desc: string | null
          featured: boolean
          id: string
          tags: string[] | null
          title: string
          type: string | null
          userid: string | null
        }
        Insert: {
          contents?: Json | null
          coverimage?: string | null
          created_at?: string
          desc?: string | null
          featured: boolean
          id?: string
          tags?: string[] | null
          title: string
          type?: string | null
          userid?: string | null
        }
        Update: {
          contents?: Json | null
          coverimage?: string | null
          created_at?: string
          desc?: string | null
          featured?: boolean
          id?: string
          tags?: string[] | null
          title?: string
          type?: string | null
          userid?: string | null
        }
        Relationships: []
      }
      newsposts: {
        Row: {
          category: string | null
          created_at: string
          details: Json
          id: number
          tags: string[] | null
          title: string
          userid: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          details: Json
          id?: number
          tags?: string[] | null
          title: string
          userid: string
        }
        Update: {
          category?: string | null
          created_at?: string
          details?: Json
          id?: number
          tags?: string[] | null
          title?: string
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "newsposts_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          community_information: Json | null
          created_at: string
          creator: Json | null
          data: Json
          id: string
          images: boolean | null
          importance: number
          relations: string[] | null
          tags: string[] | null
          title: string | null
          type: Database["public"]["Enums"]["postType"]
          userid: string
          visibilty: Database["public"]["Enums"]["visibility"]
          title_tags_creator: string | null
        }
        Insert: {
          community_information?: Json | null
          created_at?: string
          creator?: Json | null
          data: Json
          id?: string
          images?: boolean | null
          importance?: number
          relations?: string[] | null
          tags?: string[] | null
          title?: string | null
          type: Database["public"]["Enums"]["postType"]
          userid: string
          visibilty?: Database["public"]["Enums"]["visibility"]
        }
        Update: {
          community_information?: Json | null
          created_at?: string
          creator?: Json | null
          data?: Json
          id?: string
          images?: boolean | null
          importance?: number
          relations?: string[] | null
          tags?: string[] | null
          title?: string | null
          type?: Database["public"]["Enums"]["postType"]
          userid?: string
          visibilty?: Database["public"]["Enums"]["visibility"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          boxlist: Json[] | null
          college: string | null
          created_at: string | null
          id: string
          major: string | null
          real_name: string | null
          role: string
          username: string | null
          verified: boolean
          widgets: Json[] | null
          xp: number
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          boxlist?: Json[] | null
          college?: string | null
          created_at?: string | null
          id: string
          major?: string | null
          real_name?: string | null
          role?: string
          username?: string | null
          verified?: boolean
          widgets?: Json[] | null
          xp?: number
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          boxlist?: Json[] | null
          college?: string | null
          created_at?: string | null
          id?: string
          major?: string | null
          real_name?: string | null
          role?: string
          username?: string | null
          verified?: boolean
          widgets?: Json[] | null
          xp?: number
        }
        Relationships: []
      }
      questionRepsonses: {
        Row: {
          question_id: string
          responder_id: string
          responder_name: string
          response: number
          response_id: string
          time_responsed: string
        }
        Insert: {
          question_id: string
          responder_id: string
          responder_name: string
          response: number
          response_id?: string
          time_responsed?: string
        }
        Update: {
          question_id?: string
          responder_id?: string
          responder_name?: string
          response?: number
          response_id?: string
          time_responsed?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_questionRepsonses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          context: boolean | null
          contextType: string | null
          correct: number | null
          created_at: string
          creator: Json
          creatorid: string
          due: string | null
          id: string
          options: string[]
          question: string
          relations: string[] | null
        }
        Insert: {
          context?: boolean | null
          contextType?: string | null
          correct?: number | null
          created_at?: string
          creator: Json
          creatorid: string
          due?: string | null
          id?: string
          options: string[]
          question: string
          relations?: string[] | null
        }
        Update: {
          context?: boolean | null
          contextType?: string | null
          correct?: number | null
          created_at?: string
          creator?: Json
          creatorid?: string
          due?: string | null
          id?: string
          options?: string[]
          question?: string
          relations?: string[] | null
        }
        Relationships: []
      }
      replies: {
        Row: {
          created_at: string
          creator: Json
          id: string
          post_id: string
          private: boolean | null
          reply: string
          user_id: string
        }
        Insert: {
          created_at?: string
          creator: Json
          id?: string
          post_id: string
          private?: boolean | null
          reply: string
          user_id?: string
        }
        Update: {
          created_at?: string
          creator?: Json
          id?: string
          post_id?: string
          private?: boolean | null
          reply?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      room: {
        Row: {
          additional_data: Json | null
          admin: string[]
          class_connection: string | null
          created_at: string
          creator: string
          event_connection: string | null
          expiration_date: string | null
          id: number
          location: string | null
          name: string
          study_room: string | null
        }
        Insert: {
          additional_data?: Json | null
          admin: string[]
          class_connection?: string | null
          created_at?: string
          creator: string
          event_connection?: string | null
          expiration_date?: string | null
          id: number
          location?: string | null
          name: string
          study_room?: string | null
        }
        Update: {
          additional_data?: Json | null
          admin?: string[]
          class_connection?: string | null
          created_at?: string
          creator?: string
          event_connection?: string | null
          expiration_date?: string | null
          id?: number
          location?: string | null
          name?: string
          study_room?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          data: Json
          id: string
          updated_at: string
        }
        Insert: {
          data?: Json
          id: string
          updated_at?: string
        }
        Update: {
          data?: Json
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          created_at: string
          details: string
          id: number
          title: string
          type: string
          userid: string | null
        }
        Insert: {
          created_at?: string
          details: string
          id?: number
          title: string
          type?: string
          userid?: string | null
        }
        Update: {
          created_at?: string
          details?: string
          id?: number
          title?: string
          type?: string
          userid?: string | null
        }
        Relationships: []
      }
      userawards: {
        Row: {
          awarded: string
          certification: string
          created_by: string | null
          desc: string | null
          id: string
          type: string | null
          userid: string
        }
        Insert: {
          awarded?: string
          certification: string
          created_by?: string | null
          desc?: string | null
          id?: string
          type?: string | null
          userid: string
        }
        Update: {
          awarded?: string
          certification?: string
          created_by?: string | null
          desc?: string | null
          id?: string
          type?: string | null
          userid?: string
        }
        Relationships: []
      }
      userclasses: {
        Row: {
          classid: string
          grade: string | null
          semester: string
          teacher: string | null
          transactionid: string
          userid: string
        }
        Insert: {
          classid: string
          grade?: string | null
          semester?: string
          teacher?: string | null
          transactionid?: string
          userid?: string
        }
        Update: {
          classid?: string
          grade?: string | null
          semester?: string
          teacher?: string | null
          transactionid?: string
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "userclasses_classid_fkey"
            columns: ["classid"]
            isOneToOne: false
            referencedRelation: "transcripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userclasses_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      transcripts: {
        Row: {
          category: string | null
          college: string | null
          grade: string | null
          id: string | null
          name: string | null
          num: number | null
          semester: string | null
          teacher: string | null
          transactionid: string | null
          units: number | null
          userid: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_college_fkey"
            columns: ["college"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userclasses_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      addinterest: {
        Args: {
          newinterest: string
          newfieldtype: string
          newinterestid?: string
        }
        Returns: undefined
      }
      check_invite_key: {
        Args: {
          input_key: string
        }
        Returns: {
          created_at: string
          creator: string
          id: string
          redeemer: string | null
        }[]
      }
      checkfriendstatus: {
        Args: {
          other_id: string
        }
        Returns: boolean
      }
      create_community: {
        Args: {
          newid: string
          newname: string
          newdescription: string
          newcampus: string
          newprivate: boolean
        }
        Returns: undefined
      }
      event_search: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      get_class_record: {
        Args: {
          question: string
        }
        Returns: unknown[]
      }
      get_communities: {
        Args: Record<PropertyKey, never>
        Returns: {
          blocks: Json[] | null
          created_at: string
          description: string | null
          id: string
          interests: string[] | null
          members: number
          name: string | null
          primary_campus: string | null
          private: boolean | null
          styles: Json | null
        }[]
      }
      get_community_recommendations: {
        Args: Record<PropertyKey, never>
        Returns: {
          blocks: Json[] | null
          created_at: string
          description: string | null
          id: string
          interests: string[] | null
          members: number
          name: string | null
          primary_campus: string | null
          private: boolean | null
          styles: Json | null
        }[]
      }
      get_followed_feed: {
        Args: Record<PropertyKey, never>
        Returns: {
          community_information: Json | null
          created_at: string
          creator: Json | null
          data: Json
          id: string
          images: boolean | null
          importance: number
          relations: string[] | null
          tags: string[] | null
          title: string | null
          type: Database["public"]["Enums"]["postType"]
          userid: string
          visibilty: Database["public"]["Enums"]["visibility"]
        }[]
      }
      get_followers: {
        Args: {
          userid: string
        }
        Returns: {
          avatar_url: string | null
          bio: string | null
          boxlist: Json[] | null
          college: string | null
          created_at: string | null
          id: string
          major: string | null
          real_name: string | null
          role: string
          username: string | null
          verified: boolean
          widgets: Json[] | null
          xp: number
        }[]
      }
      get_followers_by_user: {
        Args: {
          userid: string
        }
        Returns: {
          avatar_url: string | null
          bio: string | null
          boxlist: Json[] | null
          college: string | null
          created_at: string | null
          id: string
          major: string | null
          real_name: string | null
          role: string
          username: string | null
          verified: boolean
          widgets: Json[] | null
          xp: number
        }[]
      }
      get_questions_by_class: {
        Args: {
          class: string
        }
        Returns: {
          context: boolean | null
          contextType: string | null
          correct: number | null
          created_at: string
          creator: Json
          creatorid: string
          due: string | null
          id: string
          options: string[]
          question: string
          relations: string[] | null
        }[]
      }
      get_users_by_event: {
        Args: {
          event: string
        }
        Returns: {
          avatar_url: string | null
          bio: string | null
          boxlist: Json[] | null
          college: string | null
          created_at: string | null
          id: string
          major: string | null
          real_name: string | null
          role: string
          username: string | null
          verified: boolean
          widgets: Json[] | null
          xp: number
        }[]
      }
      get_users_class: {
        Args: {
          usersid: string
        }
        Returns: {
          id: string
          num: number
          category: string
          name: string
          units: number
          transactionid: string
          classid: string
          userid: string
          teacher: string
          grade: string
          semester: string
        }[]
      }
      immutable_array_to_string: {
        Args: {
          "": string[]
        }
        Returns: string
      }
      same_college: {
        Args: Record<PropertyKey, never>
        Returns: {
          avatar_url: string | null
          bio: string | null
          boxlist: Json[] | null
          college: string | null
          created_at: string | null
          id: string
          major: string | null
          real_name: string | null
          role: string
          username: string | null
          verified: boolean
          widgets: Json[] | null
          xp: number
        }[]
      }
      title_tags_creator: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      toggle_community_follow: {
        Args: {
          other_id: string
        }
        Returns: string
      }
      toggle_follow_status: {
        Args: {
          other_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      community_states: "joined" | "requested"
      eventstatustype: "upcoming" | "active" | "ended"
      Infobox:
        | "interests"
        | "tutors"
        | "project"
        | "community"
        | "In Progress Classes"
      interestTypes:
        | "Computer Science"
        | "Biology"
        | "Physics"
        | "Video Games"
        | "School"
        | "Food"
      postType: "post" | "wim" | "commit" | "project"
      roleType:
        | "guest"
        | "admin"
        | "tutor"
        | "developer"
        | "student"
        | "researcher"
      visibility: "private" | "public" | "friends"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
