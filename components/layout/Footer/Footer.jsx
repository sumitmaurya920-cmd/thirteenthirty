"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  const links = {
    Company: ["About Us", "Showrooms", "Careers", "Press"],
    Support: ["Contact", "Warranty", "Shipping", "Returns"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer className="footer-gradient relative border-t-2 border-[#FF7A00]/20 py-16 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden footer-text">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: ["100%", "-100%"] }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-[#FF7A00]/20 to-transparent"
            style={{ left: `${20 + i * 15}%` }}
          />
        ))}
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo Column */}
          <div className="lg:col-span-2">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl tracking-[0.3em] footer-title mb-6 relative inline-block"
            >
              <img
                id=""
                src="/tt-logo-small.png"
                alt="logo"
                className="w-[70px]"
              />
              <motion.span
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#FF7A00] origin-left"
              />
            </motion.h3>

            <p className="footer-text mb-8 leading-relaxed max-w-md">
              Crafting timeless furniture masterpieces since 1975. Where luxury
              meets sustainability, and design transcends trends.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -5, scale: 1.1, rotate: 360 }}
                    className="relative w-10 h-10 bg-green border-2 border-[#FF7A00]/30 rounded-full flex items-center justify-center group"
                  >
                    <Icon className="w-5 h-5 group-hover:text-white transition-colors" />
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                      className="absolute inset-0 rounded-full border-2 border-[#FF7A00]"
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="footer-title mb-6 tracking-wider relative inline-block">
                {category}
                <span className="absolute -bottom-1 left-0 h-0.5 w-1/2 bg-[#FF7A00]" />
              </h4>

              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="footer-accent hover:text-[#FF7A00] transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-[#FF7A00]/20 flex flex-col md:flex-row justify-between items-center footer-site-credit text-sm">
          <p>© 2025 ThirteenThirty All rights reserved.</p>
          <p className="flex items-center gap-2">
            ✦ Handcrafted with precision and passion ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
