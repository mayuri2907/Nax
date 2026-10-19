export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export type ProjectStatus = 'Active Development' | 'Architecture Concept' | 'Internal Alpha' | 'Prototype';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  problem: string;
  solution: string;
  technologies: string[];
  founderRole: string;
  previewImage?: string;
  liveUrl?: string;
  repoUrl?: string;
  status: ProjectStatus;
  isVerifiedLive: boolean;
  isVerifiedRepo: boolean;
  featured?: boolean;
}

export interface CapabilityCategory {
  id: string;
  title: string;
  tagline: string;
  technologies: string[];
  focusAreas: string[];
}

export interface Principle {
  number: string;
  title: string;
  summary: string;
  detail: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  isConfigured: boolean;
  displayValue?: string;
}

export interface ProfileData {
  fullName: string;
  nickname: string;
  founderTitle: string;
  startupName: string;
  heroHeadline: string;
  heroSecondary: string;
  heroCopy: string;
  aboutStory: {
    sectionLabel: string;
    headline: string;
    paragraphs: string[];
  };
  vyrobyteVision: {
    sectionLabel: string;
    headline: string;
    mission: string;
    focusPoints: { title: string; desc: string }[];
  };
}
