export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      booking_players: {
        Row: {
          booking_id: string
          club: string | null
          handicap: string | null
          id: string
          initials: string
          player_id: string | null
          player_name: string
          status: string | null
          type: string
        }
        Insert: {
          booking_id: string
          club?: string | null
          handicap?: string | null
          id?: string
          initials: string
          player_id?: string | null
          player_name: string
          status?: string | null
          type: string
        }
        Update: {
          booking_id?: string
          club?: string | null
          handicap?: string | null
          id?: string
          initials?: string
          player_id?: string | null
          player_name?: string
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_players_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booked_at: string | null
          course_id: string
          course_location: string | null
          course_logo_url: string | null
          course_name: string
          date: string
          id: string
          price_per_person: number
          status: string | null
          tee_time_id: string
          time: string
          total_price: number
          user_id: string
        }
        Insert: {
          booked_at?: string | null
          course_id: string
          course_location?: string | null
          course_logo_url?: string | null
          course_name: string
          date: string
          id?: string
          price_per_person: number
          status?: string | null
          tee_time_id: string
          time: string
          total_price: number
          user_id: string
        }
        Update: {
          booked_at?: string | null
          course_id?: string
          course_location?: string | null
          course_logo_url?: string | null
          course_name?: string
          date?: string
          id?: string
          price_per_person?: number
          status?: string | null
          tee_time_id?: string
          time?: string
          total_price?: number
          user_id?: string
        }
        Relationships: []
      }
      challenge_participants: {
        Row: {
          challenge_id: string
          id: string
          joined_at: string | null
          rank: number | null
          user_id: string
          value: number | null
        }
        Insert: {
          challenge_id: string
          id?: string
          joined_at?: string | null
          rank?: number | null
          user_id: string
          value?: number | null
        }
        Update: {
          challenge_id?: string
          id?: string
          joined_at?: string | null
          rank?: number | null
          user_id?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participants_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string
          icon: string | null
          id: string
          prize: string | null
          start_date: string
          status: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date: string
          icon?: string | null
          id?: string
          prize?: string | null
          start_date: string
          status?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string
          icon?: string | null
          id?: string
          prize?: string | null
          start_date?: string
          status?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      club_announcement_reads: {
        Row: {
          announcement_id: string
          id: string
          read_at: string
          user_id: string
        }
        Insert: {
          announcement_id: string
          id?: string
          read_at?: string
          user_id: string
        }
        Update: {
          announcement_id?: string
          id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_announcement_reads_announcement_id_fkey"
            columns: ["announcement_id"]
            isOneToOne: false
            referencedRelation: "club_announcements"
            referencedColumns: ["id"]
          },
        ]
      }
      club_announcements: {
        Row: {
          content: string | null
          course_id: string
          created_at: string
          id: string
          title: string
          type: string
          visibility: string
        }
        Insert: {
          content?: string | null
          course_id: string
          created_at?: string
          id?: string
          title: string
          type?: string
          visibility?: string
        }
        Update: {
          content?: string | null
          course_id?: string
          created_at?: string
          id?: string
          title?: string
          type?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_announcements_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          booking_url: string | null
          created_at: string | null
          description: string | null
          email: string | null
          entity_type: string | null
          fax: string | null
          greenfee: string | null
          holes: number | null
          id: string
          image_url: string | null
          latitude: number | null
          location: string | null
          logo_url: string | null
          longitude: number | null
          name: string
          phone: string | null
          ranking_position: number | null
          ranking_source: string | null
          ranking_url: string | null
          rating: number | null
          reviews: number | null
          slug: string | null
          street: string | null
          website: string | null
          zip: string | null
        }
        Insert: {
          booking_url?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          entity_type?: string | null
          fax?: string | null
          greenfee?: string | null
          holes?: number | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          location?: string | null
          logo_url?: string | null
          longitude?: number | null
          name: string
          phone?: string | null
          ranking_position?: number | null
          ranking_source?: string | null
          ranking_url?: string | null
          rating?: number | null
          reviews?: number | null
          slug?: string | null
          street?: string | null
          website?: string | null
          zip?: string | null
        }
        Update: {
          booking_url?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          entity_type?: string | null
          fax?: string | null
          greenfee?: string | null
          holes?: number | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          location?: string | null
          logo_url?: string | null
          longitude?: number | null
          name?: string
          phone?: string | null
          ranking_position?: number | null
          ranking_source?: string | null
          ranking_url?: string | null
          rating?: number | null
          reviews?: number | null
          slug?: string | null
          street?: string | null
          website?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      favorite_courses: {
        Row: {
          course_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      feed_comments: {
        Row: {
          created_at: string | null
          id: string
          round_id: string
          text: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          round_id: string
          text: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          round_id?: string
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feed_comments_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      feed_kudos: {
        Row: {
          created_at: string | null
          id: string
          round_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          round_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          round_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feed_kudos_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      follow_requests: {
        Row: {
          created_at: string
          id: string
          requester_id: string
          status: string
          target_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          requester_id: string
          status?: string
          target_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          requester_id?: string
          status?: string
          target_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      hole_scores: {
        Row: {
          fairway_hit: boolean | null
          hole: number
          id: string
          par: number
          putts: number | null
          round_id: string
          strokes: number
        }
        Insert: {
          fairway_hit?: boolean | null
          hole: number
          id?: string
          par: number
          putts?: number | null
          round_id: string
          strokes: number
        }
        Update: {
          fairway_hit?: boolean | null
          hole?: number
          id?: string
          par?: number
          putts?: number | null
          round_id?: string
          strokes?: number
        }
        Relationships: [
          {
            foreignKeyName: "hole_scores_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      live_score_flags: {
        Row: {
          created_at: string
          hole: number
          id: string
          marker_strokes: number
          player_strokes: number
          player_user_id: string
          resolved: boolean
          session_id: string
        }
        Insert: {
          created_at?: string
          hole: number
          id?: string
          marker_strokes: number
          player_strokes: number
          player_user_id: string
          resolved?: boolean
          session_id: string
        }
        Update: {
          created_at?: string
          hole?: number
          id?: string
          marker_strokes?: number
          player_strokes?: number
          player_user_id?: string
          resolved?: boolean
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_score_flags_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      live_scores: {
        Row: {
          hole: number
          id: string
          par: number
          player_user_id: string
          putts: number
          scored_by_user_id: string
          session_id: string
          strokes: number
          updated_at: string
        }
        Insert: {
          hole: number
          id?: string
          par: number
          player_user_id: string
          putts?: number
          scored_by_user_id: string
          session_id: string
          strokes: number
          updated_at?: string
        }
        Update: {
          hole?: number
          id?: string
          par?: number
          player_user_id?: string
          putts?: number
          scored_by_user_id?: string
          session_id?: string
          strokes?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_scores_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      live_session_players: {
        Row: {
          current_hole: number
          display_name: string
          finished_at: string | null
          id: string
          is_connected: boolean
          joined_at: string
          last_seen_at: string
          marker_for_user_id: string | null
          session_id: string
          tee_id: string | null
          tee_name: string | null
          user_id: string
        }
        Insert: {
          current_hole?: number
          display_name: string
          finished_at?: string | null
          id?: string
          is_connected?: boolean
          joined_at?: string
          last_seen_at?: string
          marker_for_user_id?: string | null
          session_id: string
          tee_id?: string | null
          tee_name?: string | null
          user_id: string
        }
        Update: {
          current_hole?: number
          display_name?: string
          finished_at?: string | null
          id?: string
          is_connected?: boolean
          joined_at?: string
          last_seen_at?: string
          marker_for_user_id?: string | null
          session_id?: string
          tee_id?: string | null
          tee_name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_session_players_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      live_sessions: {
        Row: {
          course_id: string
          course_name: string
          created_at: string
          created_by_type: Database["public"]["Enums"]["live_session_creator_type"]
          holes_played: number
          host_user_id: string
          id: string
          join_code: string
          spectator_password: string | null
          status: Database["public"]["Enums"]["live_session_status"]
        }
        Insert: {
          course_id: string
          course_name: string
          created_at?: string
          created_by_type?: Database["public"]["Enums"]["live_session_creator_type"]
          holes_played: number
          host_user_id: string
          id?: string
          join_code: string
          spectator_password?: string | null
          status?: Database["public"]["Enums"]["live_session_status"]
        }
        Update: {
          course_id?: string
          course_name?: string
          created_at?: string
          created_by_type?: Database["public"]["Enums"]["live_session_creator_type"]
          holes_played?: number
          host_user_id?: string
          id?: string
          join_code?: string
          spectator_password?: string | null
          status?: Database["public"]["Enums"]["live_session_status"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          club: string | null
          created_at: string | null
          dark_mode: boolean | null
          friend_activity: boolean | null
          full_name: string | null
          handicap: number | null
          home_club_id: string | null
          id: string
          is_public: boolean | null
          notifications_last_seen_at: string | null
          push_notifications: boolean | null
          round_reminders: boolean | null
          show_followers: boolean
          show_following: boolean
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          club?: string | null
          created_at?: string | null
          dark_mode?: boolean | null
          friend_activity?: boolean | null
          full_name?: string | null
          handicap?: number | null
          home_club_id?: string | null
          id: string
          is_public?: boolean | null
          notifications_last_seen_at?: string | null
          push_notifications?: boolean | null
          round_reminders?: boolean | null
          show_followers?: boolean
          show_following?: boolean
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          club?: string | null
          created_at?: string | null
          dark_mode?: boolean | null
          friend_activity?: boolean | null
          full_name?: string | null
          handicap?: number | null
          home_club_id?: string | null
          id?: string
          is_public?: boolean | null
          notifications_last_seen_at?: string | null
          push_notifications?: boolean | null
          round_reminders?: boolean | null
          show_followers?: boolean
          show_following?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "profiles_home_club_id_fkey"
            columns: ["home_club_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      round_partners: {
        Row: {
          id: string
          partner_initials: string
          partner_name: string
          partner_user_id: string | null
          round_id: string
        }
        Insert: {
          id?: string
          partner_initials: string
          partner_name: string
          partner_user_id?: string | null
          round_id: string
        }
        Update: {
          id?: string
          partner_initials?: string
          partner_name?: string
          partner_user_id?: string | null
          round_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "round_partners_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      rounds: {
        Row: {
          completed: boolean | null
          course_id: string
          course_name: string
          created_at: string | null
          date: string | null
          headline: string | null
          holes_played: number
          id: string
          live_session_id: string | null
          photo_url: string | null
          total_par: number
          total_score: number
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          course_id: string
          course_name: string
          created_at?: string | null
          date?: string | null
          headline?: string | null
          holes_played?: number
          id?: string
          live_session_id?: string | null
          photo_url?: string | null
          total_par: number
          total_score: number
          user_id: string
        }
        Update: {
          completed?: boolean | null
          course_id?: string
          course_name?: string
          created_at?: string | null
          date?: string | null
          headline?: string | null
          holes_played?: number
          id?: string
          live_session_id?: string | null
          photo_url?: string | null
          total_par?: number
          total_score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rounds_live_session_id_fkey"
            columns: ["live_session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_courses: {
        Row: {
          course_id: string
          created_at: string | null
          external_id: number | null
          id: string
          is_9_hole: boolean | null
          name: string
          par: number | null
        }
        Insert: {
          course_id: string
          created_at?: string | null
          external_id?: number | null
          id?: string
          is_9_hole?: boolean | null
          name: string
          par?: number | null
        }
        Update: {
          course_id?: string
          created_at?: string | null
          external_id?: number | null
          id?: string
          is_9_hole?: boolean | null
          name?: string
          par?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      tees: {
        Row: {
          cr: number | null
          created_at: string | null
          external_id: number | null
          holes: Json
          id: string
          name: string
          par: number | null
          slope: number | null
          sub_course_id: string
        }
        Insert: {
          cr?: number | null
          created_at?: string | null
          external_id?: number | null
          holes?: Json
          id?: string
          name: string
          par?: number | null
          slope?: number | null
          sub_course_id: string
        }
        Update: {
          cr?: number | null
          created_at?: string | null
          external_id?: number | null
          holes?: Json
          id?: string
          name?: string
          par?: number | null
          slope?: number | null
          sub_course_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tees_sub_course_id_fkey"
            columns: ["sub_course_id"]
            isOneToOne: false
            referencedRelation: "sub_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      waitlist_signups: {
        Row: {
          created_at: string | null
          email: string
          id: string
          type: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          type: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_session_participant: {
        Args: { _session_id: string; _user_id: string }
        Returns: boolean
      }
      session_has_spectator_password: {
        Args: { _join_code: string }
        Returns: boolean
      }
      verify_spectator_password: {
        Args: { _join_code: string; _supplied_password: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      live_session_creator_type: "player" | "admin"
      live_session_status: "waiting" | "active" | "completed" | "abandoned"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      live_session_creator_type: ["player", "admin"],
      live_session_status: ["waiting", "active", "completed", "abandoned"],
    },
  },
} as const
