"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";

export default function VideoSection() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

const scale = useTransform(
  scrollYProgress,
  [0, 1],
  [1, 1]
);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [48, 12, 12, 32]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [40, 0, 0, 40]
  );

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-10 bg-gradient-to-b from-white via-[#384F37]/5 to-white overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-3 h-3 border-2 border-[#FF7A00]/20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-5"
        >
          <span className="block text-[#384F37]/60 tracking-[0.3em] text-sm mb-4">
            CRAFTSMANSHIP IN MOTION
          </span>

          <h2 className="text-5xl md:text-7xl text-[#384F37] mb-6">
            See The{" "}
            <motion.span
              className="text-[#FF7A00]"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,122,0,0.3)",
                  "0 0 30px rgba(255,122,0,0.5)",
                  "0 0 20px rgba(255,122,0,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Process
            </motion.span>
          </h2>

          <p className="text-xl text-[#384F37]/70 max-w-2xl mx-auto">
            Watch how our master craftsmen transform raw materials into timeless masterpieces
          </p>
        </motion.div>

        {/* Video */}
        <div className="flex justify-center min-h-[60vh] lg:min-h-[80vh]">
          <motion.div style={{ scale, opacity }} className="relative w-full max-w-6xl will-change-transform">
            <motion.div
              style={{ borderRadius }}
              className="relative overflow-hidden bg-[#384F37] border-4 border-[#FF7A00]/20"
            >
              <div className="aspect-video relative">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  loop
                  muted={isMuted}
                  playsInline
                  poster="https://images.unsplash.com/photo-1759774312867-c230ea3c1ea6"
                >
                  <source
                    src="https://thirteenthirty.com/wp-content/uploads/2025/11/1330-mix-video.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* Controls */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="flex gap-4">
                    <button
                      onClick={handlePlayPause}
                      className="w-20 h-20 rounded-full bg-[#FF7A00] flex items-center justify-center"
                    >
                      {isPlaying ? (
                        <div className="flex gap-1">
                          <span className="w-1.5 h-6 bg-white" />
                          <span className="w-1.5 h-6 bg-white" />
                        </div>
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </button>

                    <button
                      onClick={handleMuteToggle}
                      className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mute-btn"
                    >
                      {isMuted ? (
                        <VolumeX className="w-6 h-6 text-white" />
                      ) : (
                        <Volume2 className="w-6 h-6 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="bg-[#384F37]/95 px-8 py-6 border-t border-[#FF7A00]/20">
                <h3 className="text-white text-xl mb-1">
                  The Art of Chair Making
                </h3>
                <p className="text-white/70 text-sm">
                  From sketch to showroom: precision and passion
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
