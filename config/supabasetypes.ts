export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      communities: {
        Row: {
          community_posts: Json[] | null
          created_at: string
          id: number
          name: string
          tags: string[] | null
          users: Json[] | null
        }
        Insert: {
          community_posts?: Json[] | null
          created_at?: string
          id?: number
          name?: string
          tags?: string[] | null
          users?: Json[] | null
        }
        Update: {
          community_posts?: Json[] | null
          created_at?: string
          id?: number
          name?: string
          tags?: string[] | null
          users?: Json[] | null
        }
        Relationships: []
      }
      eventinterest: {
        Row: {
          data: Json | null
          event_id: string
          id: number
          joined: string
          user_id: string | null
        }
        Insert: {
          data?: Json | null
          event_id: string
          id?: number
          joined?: string
          user_id?: string | null
        }
        Update: {
          data?: Json | null
          event_id?: string
          id?: number
          joined?: string
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
          end: string | null
          id: string
          image: Json | null
          link: string | null
          location: string
          name: string
          start: string
          tags: string[]
          type: string | null
          event_search: string | null
        }
        Insert: {
          created_at?: string
          creator?: string | null
          desc?: string | null
          end?: string | null
          id?: string
          image?: Json | null
          link?: string | null
          location: string
          name?: string
          start: string
          tags: string[]
          type?: string | null
        }
        Update: {
          created_at?: string
          creator?: string | null
          desc?: string | null
          end?: string | null
          id?: string
          image?: Json | null
          link?: string | null
          location?: string
          name?: string
          start?: string
          tags?: string[]
          type?: string | null
        }
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "invitekeys_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          contents: Json | null
          coverimage: string | null
          created_at: string
          desc: string | null
          featured: boolean
          id: string
          length: number | null
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
          length?: number | null
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
          length?: number | null
          tags?: string[] | null
          title?: string
          type?: string | null
          userid?: string | null
        }
        Relationships: []
      }
      newsposts: {
        Row: {
          author: Json
          category: string | null
          created_at: string
          id: number
          post_data: Json[]
          tags: string[] | null
          title: string
        }
        Insert: {
          author: Json
          category?: string | null
          created_at?: string
          id?: number
          post_data: Json[]
          tags?: string[] | null
          title: string
        }
        Update: {
          author?: Json
          category?: string | null
          created_at?: string
          id?: number
          post_data?: Json[]
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          created_at: string
          creator: Json | null
          data: Json
          id: string
          relations: string[] | null
          tags: string[] | null
          title: string | null
          type: Database["public"]["Enums"]["postType"]
          userid: string
          visibilty: Database["public"]["Enums"]["visibility"]
          title_tags_creator: string | null
        }
        Insert: {
          created_at?: string
          creator?: Json | null
          data: Json
          id?: string
          relations?: string[] | null
          tags?: string[] | null
          title?: string | null
          type: Database["public"]["Enums"]["postType"]
          userid: string
          visibilty?: Database["public"]["Enums"]["visibility"]
        }
        Update: {
          created_at?: string
          creator?: Json | null
          data?: Json
          id?: string
          relations?: string[] | null
          tags?: string[] | null
          title?: string | null
          type?: Database["public"]["Enums"]["postType"]
          userid?: string
          visibilty?: Database["public"]["Enums"]["visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "public_posts_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          boxlist: Json[] | null
          college: string | null
          created_at: string | null
          id: string
          major: string | null
          real_name: string | null
          role: string
          username: string | null
          website: string | null
          widgets: Json[] | null
        }
        Insert: {
          avatar_url?: string | null
          boxlist?: Json[] | null
          college?: string | null
          created_at?: string | null
          id: string
          major?: string | null
          real_name?: string | null
          role?: string
          username?: string | null
          website?: string | null
          widgets?: Json[] | null
        }
        Update: {
          avatar_url?: string | null
          boxlist?: Json[] | null
          college?: string | null
          created_at?: string | null
          id?: string
          major?: string | null
          real_name?: string | null
          role?: string
          username?: string | null
          website?: string | null
          widgets?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
          {
            foreignKeyName: "public_questionRepsonses_responder_id_fkey"
            columns: ["responder_id"]
            isOneToOne: false
            referencedRelation: "users"
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
      userinfo: {
        Row: {
          bio: string | null
          created_at: string
          id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_userinfo_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      widgets: {
        Row: {
          component: string
          id: string
        }
        Insert: {
          component: string
          id?: string
        }
        Update: {
          component?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
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
      immutable_array_to_string: {
        Args: {
          "": string[]
        }
        Returns: string
      }
      title_tags_creator: {
        Args: {
          "": unknown
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
      postType: "post" | "wim" | "commit" | "project"
      visibility: "private" | "public" | "friends"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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