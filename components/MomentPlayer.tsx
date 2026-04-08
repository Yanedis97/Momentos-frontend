"use client";

import { useEffect, useState, useRef } from "react";
import { playStep } from "@/services/progress.service";
import { motion, AnimatePresence } from "framer-motion";

type Scene = {
  bg?: string;
  audio?: string;
  text?: string;
  pace?: "slow" | "medium" | "fast";
};

type Choice = {
  id: string;
  label: string;
  next: string;
};

type Props = {
  playerId: string;
  momentId: string;
  onFinish?: () => void;
};

export default function MomentPlayer({ playerId, momentId, onFinish }: Props) {

  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [type, setType] = useState<string>("scene");
  const [scene, setScene] = useState<Scene | null>(null);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [nextStep, setNextStep] = useState<string | null>(null);
  const [isLast, setIsLast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayText, setDisplayText] = useState("");

  const autoNextRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  async function handlePlay(step: string, choiceNext?: string) {
    try {
      setLoading(true);

      const res = await playStep({
        player_id: playerId,
        moment_id: momentId,
        step,
        choice_next: choiceNext || null
      });

      setCurrentStep(res.step);
      setType(res.type);
      setScene(res.scene || null);
      setChoices(res.choices || []);
      setNextStep(res.next_step || null);
      setIsLast(res.is_last);

      if (autoNextRef.current) clearTimeout(autoNextRef.current);

      if (res.autoNext && res.next_step) {
        autoNextRef.current = setTimeout(() => {
          handlePlay(res.next_step!);
        }, res.autoNext);
      }

      if (res.type === "pause" && res.duration && res.next_step) {
        autoNextRef.current = setTimeout(() => {
          handlePlay(res.next_step!);
        }, res.duration);
      }

    } catch (err) {
      console.error("Error playing step", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!currentStep) {
      handlePlay("intro_1"); 
    }
  }, []);

  // cleanup timers
  useEffect(() => {
    return () => {
      if (autoNextRef.current) clearTimeout(autoNextRef.current);
    };
  }, []);

  useEffect(() => {
    if (!scene?.audio) return;

    // detener audio anterior
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(`/audio/${scene.audio}.mp3`);
    audio.volume = 0.5;
    audio.play();

    audioRef.current = audio;

  }, [scene?.audio]);

  useEffect(() => {
    const text = scene?.text || "";

    if (!text) {
      setDisplayText("");
      return;
    }

    let i = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;

      if (i > text.length) {
        clearInterval(interval);
      }
    }, 20); // velocidad (puedes ajustar)

    return () => clearInterval(interval);

  }, [scene?.text]);

  const text = scene?.text || "";

  return (
    <div
      className="flex flex-col items-center justify-center text-center space-y-8 min-h-screen w-full"
      style={{
        background: scene?.bg
          ? `url(/backgrounds/${scene.bg}.jpg) center/cover no-repeat`
          : "#020617"
      }}
    >

      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center space-y-8">

        {/* TEXT */}
        <div className="min-h-[120px] flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-2xl md:text-3xl leading-relaxed"
            >
              {displayText || (loading ? "..." : "")}
            </motion.p>
          </AnimatePresence> 
        </div>

        {/* DECISION */}
        {!isLast && type === "decision" && (
          <div className="flex flex-col gap-3 w-full max-w-md">
            {choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handlePlay(choice.next, choice.next)}
                className="rounded-xl bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition"
              >
                {choice.label}
              </button>
            ))}
          </div>
        )}

        {/* CONTINUE */}
        {!isLast && type !== "decision" && !scene?.autoNext && type !== "pause" && (
          <button
            onClick={() => nextStep && handlePlay(nextStep)}
            disabled={!nextStep}
            className="rounded-xl bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition"
          >
            Continuar →
          </button>
        )}

        {/* FIN */}
        {isLast && (
          <div className="space-y-4">
            <p className="text-green-400 text-lg">✨ Momento completado</p>
            <button
              onClick={onFinish}
              className="rounded-xl border border-gray-600 px-6 py-3 hover:bg-gray-800 transition"
            >
              Volver
            </button>
          </div>
        )}

      </div>
    </div>
  );
}