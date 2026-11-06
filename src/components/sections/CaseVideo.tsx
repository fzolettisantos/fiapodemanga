"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type CaseVideoProps = {
  mp4: string;
  webm?: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  pauseLabel: string;
  playLabel: string;
};

/**
 * Vídeo de demonstração do case: sem áudio, em loop, com botão de pausar.
 * Com prefers-reduced-motion, não inicia sozinho (mostra o pôster e o botão de reproduzir).
 */
export function CaseVideo({ mp4, webm, poster, width, height, label, pauseLabel, playLabel }: CaseVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Só toca quando está visível (economiza bateria e dados)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div className="case-video relative overflow-hidden rounded-sm bg-[#11131d]">
      <video
        ref={ref}
        className="block h-auto w-full"
        width={width}
        height={height}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {webm ? <source src={webm} type="video/webm" /> : null}
        <source src={mp4} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        title={playing ? pauseLabel : playLabel}
        className="absolute right-4 bottom-4 inline-flex size-11 items-center justify-center rounded-full bg-[#212121]/85 text-white ring-1 ring-white/20 transition-colors hover:bg-[#212121] md:right-6 md:bottom-6"
      >
        {playing ? (
          <Pause aria-hidden="true" className="size-4" strokeWidth={2} />
        ) : (
          <Play aria-hidden="true" className="size-4 translate-x-px" strokeWidth={2} />
        )}
      </button>
    </div>
  );
}
