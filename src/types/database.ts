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
  | 'technician_assigned'
  | 'completed'
  | 'cancelled'
  | 'in_progress'; // Preserved for backwards compatibility with historical records

export type EmailStatus = 'pending' | 'sent' | 'failed';

export type NotificationType =
  | 'booking_created'
  | 'status_confirmed'
  | 'technician_assigned'
  | 'service_day_reminder'
  | 'status_completed'
  | 'status_cancelled';

export type NotificationStatus = 'pending' | 'sent' | 'failed';

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
  arrival_window?: string | null;
  status: BookingStatus;
  email_status: EmailStatus;
  email_sent_at?: string | null;
  email_message_id?: string | null;
  email_error?: string | null;
  technician_name?: string | null;
  technician_phone?: string | null;
  assigned_technician?: string | null;
  scheduled_service_date?: string | null;
  cancellation_reason?: string | null;
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
  service_type?: ServiceType;
  system_type?: SystemConfiguration;
  preferred_date: string;
  arrival_window?: string | null;
  status?: BookingStatus;
  email_status?: EmailStatus;
  email_sent_at?: string | null;
  email_message_id?: string | null;
  email_error?: string | null;
  technician_name?: string | null;
  technician_phone?: string | null;
  assigned_technician?: string | null;
  scheduled_service_date?: string | null;
  cancellation_reason?: string | null;
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
  arrival_window?: string | null;
  status?: BookingStatus;
  email_status?: EmailStatus;
  email_sent_at?: string | null;
  email_message_id?: string | null;
  email_error?: string | null;
  technician_name?: string | null;
  technician_phone?: string | null;
  assigned_technician?: string | null;
  scheduled_service_date?: string | null;
  cancellation_reason?: string | null;
  notes?: string | null;
  updated_at?: string;
}

export interface BookingNotification {
  id: string;
  booking_id: string;
  booking_ref: string;
  notification_type: NotificationType;
  recipient_email: string;
  notification_status: NotificationStatus;
  provider_message_id?: string | null;
  error_message?: string | null;
  service_date?: string | null;
  created_at: string;
  sent_at?: string | null;
}

export interface BookingNotificationInsert {
  id?: string;
  booking_id: string;
  booking_ref: string;
  notification_type: NotificationType;
  recipient_email: string;
  notification_status?: NotificationStatus;
  provider_message_id?: string | null;
  error_message?: string | null;
  service_date?: string | null;
  created_at?: string;
  sent_at?: string | null;
}

export interface BookingNotificationUpdate {
  booking_id?: string;
  booking_ref?: string;
  notification_type?: NotificationType;
  recipient_email?: string;
  notification_status?: NotificationStatus;
  provider_message_id?: string | null;
  error_message?: string | null;
  service_date?: string | null;
  sent_at?: string | null;
}

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: Booking;
        Insert: BookingInsert;
        Update: BookingUpdate;
      };
      booking_notifications: {
        Row: BookingNotification;
        Insert: BookingNotificationInsert;
        Update: BookingNotificationUpdate;
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
