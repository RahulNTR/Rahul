export const FORMATS = [
  "Feature Film", "Short Film", "Web Series", "TV Series", "Episode", "Mini Series", "Custom",
] as const;

export const LANGUAGES = [
  "English", "Telugu", "Hindi", "Tamil", "Kannada", "Malayalam", "Bengali", "Marathi", "Gujarati", "Punjabi", "Other",
] as const;

export const GENRES = [
  "Drama", "Thriller", "Crime", "Romance", "Comedy", "Action", "Horror", "Sci-Fi", "Fantasy", "Mystery",
  "Family", "Political", "Historical", "Biography", "Sports", "Social", "Adventure",
] as const;

export const AUDIENCES = [
  "Kids", "Young Adults", "Adults", "Family", "Mass", "Urban", "Global", "Regional",
] as const;

export const TONES = [
  "Dark", "Emotional", "Fun", "Gritty", "Realistic", "Commercial", "Inspirational", "Romantic", "Suspenseful",
] as const;

// The development journey from the PRD; progress % is derived from the stage index.
export const STAGES = [
  "Idea", "Story Development", "Characters", "World & Tone", "Structure", "Acts / Sequences",
  "Scene Builder", "Screenplay", "AI Review", "Rewrite", "Script Lock",
] as const;

export type Project = {
  id: string;
  user_id: string;
  name: string;
  format: string;
  language: string;
  genres: string[];
  audience: string[];
  tones: string[];
  idea: string | null;
  stage: string;
  progress: number;
  status: "active" | "archived";
  created_at: string;
  updated_at: string;
};
