import type { ReactNode } from "react";

/** A build/portfolio entry, or a published research entry. */
export interface Project {
  title: string;
  desc: string;
  tech: string[];
  image: string;
  /** Set on build projects only. */
  role?: string;
  /** Publication / venue note, set on research entries only. */
  note?: string;
  authors?: string;
  github?: string;
  doi?: string;
}

export interface Achievement {
  title: string;
  subtitle: string;
  images: string[];
  description: string;
  tags: string[];
  /** Controls card aspect ratio; defaults to portrait when omitted. */
  layout?: "landscape";
  linkedin?: string;
}

export interface ExperienceItem {
  title: string;
  org: string;
  role: string;
  period: string;
  description: string;
  skills: string[];
  image?: string;
}

export interface SkillGroup {
  title: string;
  icon: ReactNode;
  emoji: string;
  /** box-shadow applied on hover. */
  glow: string;
  items: string[];
}

export interface JourneyItem {
  title: string;
  year: string;
  institute: string;
  location: string;
  current?: boolean;
}
