import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MedhaIntroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl"
      >
        <Card className="rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10">
          <CardContent className="p-10 text-center">
            {/* Title */}
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-bold tracking-widest bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
            >
              MEDHA
            </motion.h1>
            <p className="text-xl mt-3 text-indigo-200">
              A Brain Training & Productivity Platform
            </p>

            {/* Intro Text */}
            <p className="mt-6 text-base leading-relaxed text-slate-300 max-w-3xl mx-auto">
              Medha is a next-generation intelligent web platform designed to enhance your <span className="font-semibold text-purple-300">focus, memory, retention and productivity</span>. Inspired by the ancient concept of Medha Shakti and powered by modern AI-driven tools, this platform helps students study smarter, revise effectively and achieve long-term knowledge mastery.
            </p>

            {/* Features */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[...
                ["AI Flashcards", "Smart auto-generated revision cards"],
                ["Focus Audio", "Brain frequency sessions for deep focus"],
                ["Retention Graph", "Track your memory improvement visually"],
                ["Smart Trackers", "Study, sleep & hydration monitoring"]
              ].map(([title, desc], i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl p-5 bg-white/10 border border-white/10 shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-pink-300 mb-2">{title}</h3>
                  <p className="text-sm text-slate-300">{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <Button 
                className="px-10 py-6 rounded-2xl text-lg shadow-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transition-all duration-300 hover:brightness-110 active:scale-95"
              >
                Get Started
              </Button>
              <Button 
                className="px-10 py-6 rounded-2xl text-lg shadow-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transition-all duration-300 hover:brightness-110 active:scale-95"
              >
                Login
              </Button>
            </div>

            {/* Footer */}
            <p className="mt-8 text-sm text-slate-400">© 2025 MEDHA | Smart Study Companion</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
