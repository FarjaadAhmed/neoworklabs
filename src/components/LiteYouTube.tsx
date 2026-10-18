"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith("/embed/")) {
      return parsed.pathname.split("/")[2] ?? null;
    }
    return parsed.searchParams.get("v") ?? parsed.pathname.split("/").pop() ?? null;
  } catch {
    return null;
  }
}

/**
 * Click-to-load YouTube embed. Renders a lightweight thumbnail facade and
 * only mounts the (heavy) iframe after the user asks to play — keeps
 * third-party JS off the critical path.
 */
export function LiteYouTube({
  url,
  title,
  preload = false,
}: {
  url: string;
  title: string;
  /** Set when the thumbnail is the page's LCP element. */
  preload?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const id = extractYouTubeId(url);

  if (!id) return null;

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        setPlaying(true);
      }}
      aria-label={`Play video: ${title}`}
      className="group/yt absolute inset-0 h-full w-full cursor-pointer overflow-hidden"
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={title}
        fill
        preload={preload}
        sizes="(max-width: 768px) 100vw, 480px"
        className="object-cover transition-transform duration-500 group-hover/yt:scale-105"
      />
      <span className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover/yt:bg-black/15" />
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm ring-1 ring-white/25 transition-all duration-300 group-hover/yt:scale-110 group-hover/yt:bg-accent group-hover/yt:ring-accent">
        <Play className="ml-0.5 h-6 w-6 fill-white text-white" />
      </span>
    </button>
  );
}
