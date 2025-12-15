"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

export default function Contact() {
  const [focused, setFocused] = useState(null);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "C-63, MIDC Estate, TTC Area, Turbhe, Navi-Mumbai – 400705",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (212) 555-0123",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "connect@thirteenthirty.com",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Sat: 10AM - 7PM\nSunday: 12PM - 5PM",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-32 bg-[#384F37] overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#FF7A00] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-white rounded-full blur-[120px]"
        />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-white/60 tracking-[0.3em] text-sm mb-4">
              GET IN TOUCH
            </span>

            <h2 className="text-5xl md:text-7xl text-white mb-8 tracking-tight">
              Let’s Create <br />
              <motion.span
                className="text-[#FF7A00]"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255,122,0,0.3)",
                    "0 0 40px rgba(255,122,0,0.6)",
                    "0 0 20px rgba(255,122,0,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Together
              </motion.span>
            </h2>

            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              Experience our collection in person at our flagship showroom. Our
              design consultants are ready to bring your vision to life.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="flex items-start gap-6"
                  >
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/40">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg text-white">{info.title}</h3>
                      <p className="text-white/70 whitespace-pre-line">
                        {info.content}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT – FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 lg:p-12 bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-3xl text-white mb-8">
              Schedule a Consultation
            </h3>

            <form className="space-y-6">
              {["name", "email", "phone"].map((field) => (
                <div key={field}>
                  <label className="block text-white/70 mb-2 capitalize">
                    {field}
                  </label>
                  <motion.input
                    type="text"
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    animate={{
                      borderColor:
                        focused === field
                          ? "rgba(255,122,0,0.8)"
                          : "rgba(255,255,255,0.2)",
                    }}
                    className="w-full px-4 py-4 bg-white/5 border text-white outline-none"
                  />
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#FF7A00] py-5 flex items-center justify-center gap-3 text-white"
              >
                SEND MESSAGE
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
