"use client";

import { useEffect, useState } from "react";
import { playStep } from "@/services/progress.service";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "inicio",
  "contexto",
  "evento",
  "suceso",
  "reaccion",
  "dato_curioso",
];

type Props = {
  playerId: string;
  momentId: string;
  onFinish?: () => void;
};

export default function MomentPlayer({ playerId, momentId, onFinish }: Props) {
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [nextStep, setNextStep] = useState<string | null>(null);
  const [isLast, setIsLast] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handlePlay(step: string) {
    try {
      setLoading(true);

      const res = await playStep({
        player_id: playerId,
        moment_id: momentId,
        step,
      });

      setCurrentStep(res.step);
      setText(res.text);
      setNextStep(res.next_step);
      setIsLast(res.is_last);
    } catch (err) {
      console.error("Error playing step", err);
    } finally {
      setLoading(false);
    }
  }

  // iniciar automáticamente
  useEffect(() => {
    if (!currentStep) {
      handlePlay("inicio");
    }
  }, []);

  const currentIndex = currentStep ? STEPS.indexOf(currentStep) : -1;

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">

      {/* PROGRESS BAR */}
      <div className="flex items-center gap-2">
        {STEPS.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`h-3 w-3 rounded-full ${
                index <= currentIndex ? "bg-white" : "bg-gray-700"
              }`}
            />
            {index < STEPS.length - 1 && (
              <div
                className={`h-[2px] w-6 ${
                  index < currentIndex ? "bg-white" : "bg-gray-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* TEXT */}
      <div className="min-h-[120px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-xl md:text-2xl max-w-2xl leading-relaxed"
          >
            {text || (loading ? "Cargando..." : "...")}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* BUTTON */}
      {!isLast ? (
        <button
          onClick={() => nextStep && handlePlay(nextStep)}
          disabled={loading || !nextStep}
          className="rounded-xl bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading ? "..." : "Continuar →"}
        </button>
      ) : (
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
  );
}
