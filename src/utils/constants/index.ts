import { z } from "zod";

export const tags = [
  "All",
  "Design",
  "Cheat Sheet",
  "News Letters",
  "Productivity",
  "Auth",
  "APIs",
  "Job",
  "Security",
  "Other",
] as const;

export const tagEnum = z.enum(tags);
