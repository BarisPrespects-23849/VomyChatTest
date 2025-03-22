export type BlockSize = "1x1" | "1x2" | "2x1" | "2x2"

export type BlockType =
  | "profile"
  | "youtube"
  | "map"
  | "music"
  | "video"
  | "link"
  | "note"
  | "photo"
  | "instagram"
  | "twitter"
  | "github"
  | "linkedin"
  | "calendar"
  | "email"
  | "clock"

export interface BentoBlockItem {
  id: string
  type: BlockType
  title: string
  content: string
  size: BlockSize
  color?: string
  url?: string
  image?: string
  active: boolean
}

