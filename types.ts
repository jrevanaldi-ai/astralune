
export type ServiceCategory = 'WHATSAPP_BOT' | 'WEBSITE' | 'DISCORD_BOT' | 'TELEGRAM_BOT';
export type DurationOption = 'FAST' | 'MEDIUM' | 'SLOW';

export interface InvoiceData {
  clientName: string;
  clientPhone: string;
  serviceCategory: ServiceCategory;
  duration: DurationOption;
  projectDescription: string;
  features: string[];
  totalPrice: number;
  date: string;
  invoiceNumber: string;
}
