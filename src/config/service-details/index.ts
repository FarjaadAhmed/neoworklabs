import type { ServiceDetail } from "./types";
import { detail as videoEditing } from "./video-editing";
import { detail as graphicCharacterDesign } from "./graphic-character-design";
import { detail as webDevelopment } from "./web-development";
import { detail as aiGeneratedAds } from "./ai-generated-ads";

export type { ServiceDetail };

// Keys match the slugs in CONTENT.services.items.
export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "video-editing": videoEditing,
  "graphic-character-design": graphicCharacterDesign,
  "web-development": webDevelopment,
  "ai-generated-ads": aiGeneratedAds,
};
