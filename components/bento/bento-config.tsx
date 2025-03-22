import type React from "react"
import {
  Youtube,
  MapPin,
  Music,
  Video,
  Link,
  MessageSquareQuote,
  ImageIcon,
  Instagram,
  Twitter,
  Github,
  Linkedin,
  Calendar,
  Mail,
  Clock,
} from "lucide-react"
import type { BlockType } from "@/components/bento/bento-types"

// Helper function to get profile icon
export const getProfileIcon = (displayName: string) => {
  return (
    <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-3 text-white">
      {displayName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()}
    </div>
  )
}

// Block type configurations
export const blockTypeConfig: Record<BlockType, { icon: React.ReactNode; label: string; description: string }> = {
  profile: {
    icon: <div className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 text-white">PC</div>,
    label: "Profile",
    description: "Your profile information",
  },
  youtube: {
    icon: <Youtube className="text-red-500" />,
    label: "YouTube",
    description: "Add a YouTube channel or video",
  },
  map: {
    icon: <MapPin className="text-blue-500" />,
    label: "Map",
    description: "Show a location on a map",
  },
  music: {
    icon: <Music className="text-green-500" />,
    label: "Music",
    description: "Share your favorite music",
  },
  video: {
    icon: <Video className="text-orange-500" />,
    label: "Video",
    description: "Embed a video from any platform",
  },
  link: {
    icon: <Link className="text-gray-700 dark:text-gray-300" />,
    label: "Link",
    description: "Add a custom link",
  },
  note: {
    icon: <MessageSquareQuote className="text-blue-400" />,
    label: "Note",
    description: "Add a text note or quote",
  },
  photo: {
    icon: <ImageIcon className="text-amber-500" />,
    label: "Photo",
    description: "Share a photo or image",
  },
  instagram: {
    icon: <Instagram className="text-pink-600" />,
    label: "Instagram",
    description: "Connect your Instagram",
  },
  twitter: {
    icon: <Twitter className="text-blue-400" />,
    label: "Twitter",
    description: "Connect your Twitter",
  },
  github: {
    icon: <Github className="text-gray-800 dark:text-gray-200" />,
    label: "GitHub",
    description: "Show your GitHub profile",
  },
  linkedin: {
    icon: <Linkedin className="text-blue-700" />,
    label: "LinkedIn",
    description: "Connect your LinkedIn",
  },
  calendar: {
    icon: <Calendar className="text-violet-500" />,
    label: "Calendar",
    description: "Schedule meetings",
  },
  email: {
    icon: <Mail className />,
    label: "Calendar",
    description: "Schedule meetings",
  },
  email: {
    icon: <Mail className="text-red-400" />,
    label: "Email",
    description: "Add your email contact",
  },
  clock: {
    icon: <Clock className="text-teal-500" />,
    label: "Clock",
    description: "Show your local time",
  },
}

