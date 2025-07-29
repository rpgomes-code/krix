import { SidebarItem } from "@/types/general/sidebar";
import {
  LifeBuoy,
  Send,
  Shell,
  Users,
  MemoryStick,
  Bell,
  Library,
} from "lucide-react";

export const systemUser = {
  name: "Krix",
  username: "Krix",
  role: "System",
  email: "system@krix.com",
  avatar: "/krix/krix-minimalist.jpg",
};

export const mainSidebarItems: SidebarItem[] = [
  {
    title: "Requests",
    url: "/requests",
    icon: Bell,
    isActive: true,
    items: [
      {
        title: "Make a Request",
        url: "/requests/new",
        isActive: true,
      },
      {
        title: "My Requests",
        url: "/requests/my-requests",
        isActive: true,
      },
      {
        title: "Recent Requests",
        url: "/requests/recent",
      },
    ],
  },
  {
    title: "Library",
    url: "/library",
    icon: Library,
    isActive: true,
    items: [
      {
        title: "Movies",
        url: "/library/movies",
        isActive: true,
      },
      {
        title: "Shows",
        url: "/library/shows",
        isActive: true,
      },
      {
        title: "Documentaries",
        url: "/library/documentaries",
      },
      {
        title: "Anime Movies",
        url: "/library/anime-movies",
      },
      {
        title: "Anime Shows",
        url: "/library/anime-shows",
      },
      {
        title: "Music",
        url: "/library/music",
      },
      {
        title: "Books",
        url: "/library/books",
      },
      {
        title: "Comics",
        url: "/library/comics",
      },
      {
        title: "Manga",
        url: "/library/manga",
      },
    ],
  },
];

export const backofficeSidebarItems: SidebarItem[] = [
  {
    title: "Users",
    url: "/backoffice/users",
    icon: Users,
    isActive: true,
  },
  {
    title: "Logs",
    url: "/backoffice/logs",
    icon: Shell,
    isActive: true,
  },
  {
    title: "Cache",
    url: "/backoffice/cache",
    icon: MemoryStick,
  },
];

export const secondarySidebarItems: SidebarItem[] = [
  {
    title: "Support",
    url: "/support",
    icon: LifeBuoy,
    isActive: true,
  },
  {
    title: "Feedback",
    url: "/feedback",
    icon: Send,
    isActive: true,
  },
];
