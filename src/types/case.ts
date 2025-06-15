
export interface Case {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  beforeImage: string;
  afterImage: string | null;
  description: string;
  workPeriod: string;
  status: 'published' | 'draft' | 'scheduled';
  createdAt: string;
  publishedAt?: string;
  scheduledDate?: string;
  reminderTime?: string;
}
