"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { playStep, startMoment } from "@/services/progress.service";
import { audioService } from "@/services/audio.service";
import { motion, AnimatePresence } from "framer-motion";
import { Scene, Choice } from "@/types/progress";

const BG_BY_TYPE: Record<string, string> = {
  scene: "radial-gradient(ellipse at 50% 60%, #1a1a2e 0%, #0a0a0f 70%)",
  decision: "radial-gradient(ellipse at 30% 50%, #1c1408 0%, #0a0a0f 70%)",
  pause: "linear-gradient(180deg, #060608 0%, #0a0a0f 100%)",
  reveal: "radial-gradient(ellipse at 50% 40%, #0d1a0d 0%, #0a0a0f 70%)",
  narrative: "radial-gradient(ellipse at 50% 60%, #1a1a2e 0%, #0a0a0f 70%)",
};

type Props = {
  playerId: string;
  momentId: string;
  onFinish?: () => void;
};

export default function MomentPlayer({ playerId, momentId, onFinish }: Props) {
  const [type, setType] = useState<string>("scene");
  const [scene, setScene] = useState<Scene | null>(null);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [nextStep, setNextStep] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [isLast, setIsLast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [textDone, setTextDone] = useState(false);
  const [stepsTotal, setStepsTotal] = useState(0);
  const [stepsSeen, setStepsSeen] = useState(0);

  const autoNextRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (autoNextRef.current) clearTimeout(autoNextRef.current);
      if (typingRef.current) clearTimeout(typingRef.current);
      void audioService.stop();
    };
  }, []);

  const handlePlay = useCallback(async (step: string, choiceNext?: string) => {
    if (!isMounted.current) return;

    try {
      setLoading(true);
      setError(null);
      setTextDone(false);
      setDisplayText("");

      const res = await playStep({
        player_id: playerId,
        moment_id: momentId,
        step,
        choice_next: choiceNext || null,
      });

      if (!isMounted.current) return;

      setCurrentStep(res.step);
      setType(res.type);
      setScene(res.scene || null);
      setChoices(res.choices || []);
      setNextStep(res.next_step || null);
      setIsLast(res.is_last);
      setStepsSeen((s) => s + 1);

      const flags = res.flags;
      if (flags && typeof flags === "object" && "steps_total" in flags) {
        const total = (flags as Record<string, unknown>).steps_total;
        if (typeof total === "number") setStepsTotal(total);
      }

      if (res.scene?.audio) void audioService.play(res.scene.audio);

      if (autoNextRef.current) clearTimeout(autoNextRef.current);

      if (res.autoNext && res.next_step) {
        autoNextRef.current = setTimeout(() => {
          if (isMounted.current) handlePlay(res.next_step!);
        }, res.autoNext);
      }

      if (res.type === "pause" && res.duration && res.next_step) {
        autoNextRef.current = setTimeout(() => {
          if (isMounted.current) handlePlay(res.next_step!);
        }, res.duration);
      }
    } catch (err) {
      if (isMounted.current) {
        setError("Error al cargar este momento. Intenta de nuevo.");
        console.error("Error playing step", err);
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, [playerId, momentId]);

  useEffect(() => {
    async function init() {
      try {
        const { start_step } = await startMoment(playerId, momentId);
        if (isMounted.current) handlePlay(start_step);
      } catch (err) {
        if (isMounted.current) {
          setError("No se pudo iniciar el momento.");
          console.error("Error starting moment", err);
        }
      }
    }

    init();
  }, [playerId, momentId, handlePlay]);

  useEffect(() => {
    const text = scene?.text || "";
    if (!text) {
      setDisplayText("");
      setTextDone(true);
      return;
    }

    setTextDone(false);
    setDisplayText("");

    const pace = scene?.pace;
    const speed = pace === "fast" ? 10 : pace === "slow" ? 35 : 20;

    let i = 0;
    const tick = () => {
      if (!isMounted.current) return;
      i++;
      setDisplayText(text.slice(0, i));

      if (i < text.length) {
        typingRef.current = setTimeout(tick, speed);
      } else {
        setTextDone(true);
      }
    };

    typingRef.current = setTimeout(tick, speed);
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [scene?.text, scene?.pace]);

  const bg = BG_BY_TYPE[type] ?? BG_BY_TYPE.scene;
  const bgImage = scene?.bg ? `url(/backgrounds/${scene.bg}.jpg)` : undefined;

  const isFast = scene?.pace === "fast";
  const isReveal = type === "reveal";

  function skipTyping() {
    if (textDone) return;
    if (typingRef.current) clearTimeout(typingRef.current);
    setDisplayText(scene?.text || "");
    setTextDone(true);
  }

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden cursor-pointer"
      style={{ background: bg }}
      onClick={skipTyping}
    >
      <AnimatePresence>
        {bgImage && (
          <motion.div
            key={scene?.bg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
            style={{
              backgroundImage: bgImage,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <AnimatePresence>
        {isReveal && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-8 left-8 z-20"
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              ◆ Revelación histórica
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {stepsTotal > 0 && (
        <div className="absolute top-0 left-0 right-0 z-20 h-px bg-white/10">
          <motion.div
            className="h-full"
            style={{ background: "var(--gold)" }}
            animate={{ width: `${Math.min((stepsSeen / stepsTotal) * 100, 100)}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center gap-12 px-6 w-full max-w-3xl">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded border border-red-500/30 bg-red-500/10 px-6 py-3 text-red-400 text-sm flex items-center gap-4"
            >
              {error}
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setError(null);
                  if (currentStep) handlePlay(currentStep);
                }}
                className="underline text-red-300 hover:text-red-100 transition"
              >
                Reintentar
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="min-h-[160px] flex items-center justify-center text-center w-full">
          <AnimatePresence mode="wait">
            {!loading && scene?.text && (
              <motion.div
                key={scene.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <p
                  className={isFast ? "player-text-fast" : "player-text"}
                  style={isReveal ? { color: "var(--gold)" } : undefined}
                >
                  {displayText}
                  {!textDone && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "2px",
                        height: "1.1em",
                        background: "var(--gold)",
                        marginLeft: "3px",
                        verticalAlign: "middle",
                        animation: "breathe 0.8s ease-in-out infinite",
                      }}
                    />
                  )}
                </p>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-2"
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "var(--ash)",
                      display: "inline-block",
                      animation: `breathe 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {!loading && !isLast && type === "decision" && textDone && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md flex flex-col gap-3"
              onClick={(event) => event.stopPropagation()}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--gold-dim)",
                  marginBottom: "0.5rem",
                }}
              >
                ¿Qué haces?
              </p>
              {choices.map((choice, i) => (
                <motion.button
                  key={choice.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="choice-btn"
                  onClick={() => handlePlay(choice.next, choice.next)}
                >
                  <span style={{ color: "var(--gold)", marginRight: "0.75rem", fontSize: "0.7rem" }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {choice.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!loading && !isLast && type !== "decision" && !scene?.autoNext && type !== "pause" && textDone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="continue-btn"
                onClick={() => nextStep && handlePlay(nextStep)}
                disabled={!nextStep || loading}
              >
                Continuar
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isLast && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6 text-center"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "var(--gold)",
                  margin: "0 auto",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Momento completado
              </p>
              <button
                className="continue-btn"
                onClick={() => {
                  audioService.stop();
                  onFinish?.();
                }}
              >
                Volver al explorador
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!textDone && !loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-0 right-0 text-center pointer-events-none"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "var(--ash)",
              textTransform: "uppercase",
            }}
          >
            Toca para saltar
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
