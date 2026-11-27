export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type BookingStatus =
  | 'queued'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type EmailStatus = 'pending' | 'sent' | 'failed';

export type ServiceType =
  | 'AC Servicing'
  | 'AC Repair'
  | 'AC Installation'
  | 'Gas Refill & Clean';

export type SystemConfiguration =
  | 'Ducted Central / VRF'
  | 'High-Wall Split'
  | 'Multi-Zone Split'
  | 'Concealed Cassette'
  | 'Chiller System'
  | 'Other / Not Sure';

export interface Booking {
  id: string;
  booking_ref: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_address: string;
  service_type: ServiceType;
  system_type: SystemConfiguration;
  preferred_date: string; // ISO date string (YYYY-MM-DD)
  arrival_window: string;
  status: BookingStatus;
  email_status: EmailStatus;
  email_sent_at?: string | null;
  email_message_id?: string | null;
  email_error?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingInsert {
  id?: string;
  booking_ref?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_address: string;
  service_type: ServiceType;
  system_type: SystemConfiguration;
  preferred_date: string;
  arrival_window: string;
  status?: BookingStatus;
  email_status?: EmailStatus;
  email_sent_at?: string | null;
  email_message_id?: string | null;
  email_error?: string | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BookingUpdate {
  booking_ref?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  service_address?: string;
  service_type?: ServiceType;
  system_type?: SystemConfiguration;
  preferred_date?: string;
  arrival_window?: string;
  status?: BookingStatus;
  email_status?: EmailStatus;
  email_sent_at?: string | null;
  email_message_id?: string | null;
  email_error?: string | null;
  notes?: string | null;
  updated_at?: string;
}

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: Booking;
        Insert: BookingInsert;
        Update: BookingUpdate;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_booking_ref: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      booking_status: BookingStatus;
      service_type: ServiceType;
      system_configuration: SystemConfiguration;
      email_status: EmailStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

