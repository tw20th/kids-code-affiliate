export interface BlogAnalysis {
  analyzedAt: Date;
  score: number;
  improvement: string;
  suggestedTitle: string;
  suggestedOutline: string[];
}

export interface BlogHistory {
  updatedAt: Date;
  title: string;
  content: string;
  score: number;
}

export interface BlogData {
  slug: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  analysis: BlogAnalysis;
  analysisHistory?: BlogHistory[];
}
