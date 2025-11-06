export interface Attribute {
  id: string;
  name: string;
  description: string;
}

export type Scores = Record<string, number>;

export interface Practice {
  id: string;
  description: string;
  scores: Scores;
  category: string;
  summary: PracticeSummary;
}

export interface Recommendation {
  title: string;
  description: string;
  impacted_attributes: string[];
}

export interface PracticeSummary {
  summary: string;
  positive_impacts: string[];
  negative_impacts: string[];
  key_pros: string[];
  key_cons: string[];
}
