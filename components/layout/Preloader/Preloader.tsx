"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{
          duration: 1.2,
          ease: [0.85, 0, 0.15, 1],
        }}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backgroundImage: `url('/red-bg.png')`, // apni image ka path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Image
          src="/tt_logo.png"
          alt="Thirteen Thirty Logo"
          width={200}
          height={200}
          className="drop-shadow-xl"
          priority
        />
      </motion.div>
    </div>
  );
}
