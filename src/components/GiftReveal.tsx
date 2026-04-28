import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type Stage = "letter" | "money" | "outro";

export function GiftReveal({
  onFinish,
  prize,
}: {
  onFinish: () => void;
  prize?: { label: string; emoji: string } | null;
}) {
  const [opened, setOpened] = useState(false);
  const [stage, setStage] = useState<Stage>("letter");
  const [bankNumber, setBankNumber] = useState("");
  const [transferState, setTransferState] = useState<
    "idle" | "transferring" | "done"
  >("idle");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
        colors: ["#ff6fa3", "#ffb3c8", "#ffd86b", "#ff4f81", "#ffffff"],
        ...opts,
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  }, []);

  const openGift = () => {
    setOpened(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#ff6fa3", "#ffd86b", "#ffffff", "#ff4f81"],
    });
  };

  const sendTransfer = () => {
    if (!bankNumber.trim() || bankNumber.trim().length < 5) return;
    setTransferState("transferring");
    setTimeout(() => {
      setTransferState("done");
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#ffd86b", "#ff6fa3", "#ffffff"],
      });
    }, 3500);
  };

  const goToMoney = () => {
    setTransitioning(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff6fa3", "#ffd86b", "#ffffff"],
    });
    setTimeout(() => {
      setStage("money");
      setTransitioning(false);
    }, 1600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center"
    >
      
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xs uppercase tracking-[0.4em] text-muted-foreground"
      >
        ඔයා Solve කලා 🎉
      </motion.p>
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="mt-3 text-4xl sm:text-6xl font-bold text-gradient-romance"
      >
        මෙන්න ඔයාගේ surprise 🎁
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-3 inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-rose border border-rose/30"
      >
        🎂 සුභ උපන්දිනක් · 💞 සුභ සංවත්සරයක්
      </motion.div>

      {prize && (
        <motion.div
          initial={{ scale: 0, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", damping: 12 }}
          className="mt-6 inline-flex flex-col items-center gap-2"
        >
          <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Spin එකෙන් ඔයාට ලැබුණේ
          </div>
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="glass rounded-full px-6 py-3 shadow-glow border border-rose/30 flex items-center gap-3"
          >
            <span className="text-3xl">{prize.emoji}</span>
            <span className="text-lg sm:text-xl font-bold text-gradient-romance">
              {prize.label}
            </span>
            <span className="text-2xl">🎀</span>
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="gift"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", damping: 12 }}
            onClick={openGift}
            className="mt-12 text-9xl drop-shadow-2xl animate-pulse-glow rounded-full p-8"
            aria-label="Gift එක open කරන්න"
          >
            🎁
          </motion.button>
        ) : (
          <motion.div
            key="content"
            initial={{ scale: 0.6, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 18 }}
            className="mt-10 flex w-full max-w-xl flex-col gap-6"
          >
            {/* Stage indicator */}
            <div className="flex items-center justify-center gap-2">
              {(["letter", "money"] as Stage[]).map((s, i) => {
                const order = ["letter", "money"];
                const currentIdx = order.indexOf(stage);
                const active = i <= currentIdx;
                return (
                  <div
                    key={s}
                    className={`h-1.5 w-10 rounded-full transition-all ${
                      active ? "bg-gradient-romance" : "bg-muted"
                    }`}
                  />
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {/* ============ STAGE 1: LETTER ============ */}
              {stage === "letter" && (
                <motion.div
                  key="letter"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5 }}
                  className="glass rounded-3xl p-8 sm:p-12 shadow-glow text-left"
                >
                  <div className="mb-3 text-center text-4xl">💌</div>
                  <h3 className="text-2xl font-bold text-gradient-romance mb-4 text-center">
                    මගේ ආදරණීය සුදූට,
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                    අද මගේ ජීවිතේ ලස්සනම දවසක්. ඒකට විශේෂ හේතු දෙකක් තියෙනවා. එකක්, මගේ ලෝකෙම ලස්සන කරපු මගේ පණ මේ ලෝකෙට ඉපදුණු දවස. අනිත් එක, අපේ ආදර කතාවේ තවත් ලස්සන පිටුවක් පෙරළෙන, අපේ Anniversary එක.
                    <br /><br />
                    ඔයාගේ හිනාව, ඔයාගේ කතාබහ, ඔයා මං වෙනුවෙන් කරන හැම පුංචි දෙයක්ම මගේ ජීවිතේට ගෙනාවේ වචන වලින් කියන්න බැරි තරම් ලොකු සතුටක්. මේ ගෙවුණු කාලය පුරාවටම මගේ හෙවනැල්ල වගේ ළඟින්ම ඉඳගෙන, මාව තේරුම් ගත්තාට ඔයාට ගොඩක් ස්තූතියි. මගේ අතින් වැරදි ගොඩක් වෙන්න ඇති බබා, හැබැයි මම ඒවා අයේ වෙන්න දෙන්නේ නෑ.
                    <br /><br />
                    ඉස්සරහට එන හැම බාධාවකදීම ඔයාගේ ළඟින්ම ඉඳගෙන, අපේ ආදරේ මේ වගේම ලස්සනට කිසිම වෙනසක් නැතුව ඉස්සරහට අරන් යන්න මම හැමදාම ඔයා එක්කම ඉන්නවා සුදූ...
                    <br /><br />
                    සුබම සුබ උපන්දිනක් මගේ රත්තරන්... ඒ වගේම අපේ ආදරේට සුබම සුබ සංවත්සරයක්! 💗
                  </p>
                  <p className="mt-6 text-right italic text-rose">
                    හැමදාමත් ඔයාට පණ වගේ ආදරේ කරන,<br />
                    — Sasiru 💞
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={goToMoney}
                    className="mt-6 w-full rounded-full bg-gradient-romance px-6 py-3 text-base font-semibold text-primary-foreground shadow-glow"
                  >
                    ඊළඟ surprise එක බලන්න →
                  </motion.button>
                </motion.div>
              )}

              {/* ============ STAGE 2: MONEY ============ */}
              {stage === "money" && (
                <motion.div
                  key="money"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  className="glass rounded-3xl p-8 shadow-glow text-center"
                >
                  <div className="mb-2 text-4xl">💸</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gradient-romance mb-1">
                    මගේ පොඩි gift එකක්
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ඔයාට කැමති දෙයක් ගන්න 💗
                  </p>

                  <AnimatePresence mode="wait">
                    {transferState === "idle" && (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="mt-6 space-y-4 text-left"
                      >
                        <div className="flex items-center justify-center gap-2 py-3">
                          <span className="text-3xl">🎁</span>
                          <span className="text-xl font-semibold text-gradient-romance">
                            පොඩි surprise එකක් 💗
                          </span>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
                            ඔයාගේ Bank Account එකේ අන්තිම digits 4
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={bankNumber}
                            onChange={(e) => {
                              const v = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
                              setBankNumber(v);
                            }}
                            placeholder="XXXX"
                            maxLength={4}
                            className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground text-center text-2xl font-bold tracking-[0.5em] outline-none focus:ring-2 focus:ring-rose"
                          />
                          <p className="mt-2 text-center text-xs text-muted-foreground">
                            (security එකට last 4 digits විතරක් 🔒)
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={sendTransfer}
                          disabled={bankNumber.trim().length !== 4}
                          className="w-full rounded-full bg-gradient-romance px-6 py-3 text-base font-semibold text-primary-foreground shadow-glow disabled:opacity-40"
                        >
                          Surprise එක යවන්න 💸
                        </motion.button>
                      </motion.div>
                    )}

                    {transferState === "transferring" && (
                      <motion.div
                        key="animation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-8 flex flex-col items-center gap-6"
                      >
                        <TransferAnimation />
                        <p className="text-sm text-muted-foreground animate-pulse">
                          සල්ලි යවනවා...
                        </p>
                      </motion.div>
                    )}

                    {transferState === "done" && (
                      <motion.div
                        key="done"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="mt-6 flex flex-col items-center gap-3"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 8 }}
                          className="text-5xl"
                        >
                          ✅
                        </motion.div>
                        <h4 className="text-xl font-bold text-gradient-romance">
                          Surprise එක යවලා! 🎉
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          ඔයාගේ account එක (••••{bankNumber}) එකට පොඩි surprise එකක් ගියා 💗
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={onFinish}
                          className="mt-4 w-full rounded-full bg-gradient-romance px-6 py-3 text-base font-semibold text-primary-foreground shadow-glow animate-pulse-glow"
                        >
                          ❤️ අන්තිමට →
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ============ LETTER → MONEY TRANSITION OVERLAY ============ */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md pointer-events-none"
          >
            {/* Letter folding away */}
            <motion.div
              initial={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [1, 1.1, 0.4],
                rotate: [0, -8, 12],
                y: [0, -20, 80],
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 1.2, times: [0, 0.4, 1], ease: "easeInOut" }}
              className="absolute text-7xl drop-shadow-2xl"
            >
              💌
            </motion.div>

            {/* Sparkle burst */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const r = 140;
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: Math.cos(angle) * r,
                    y: Math.sin(angle) * r,
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                  }}
                  transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
                  className="absolute text-2xl"
                >
                  {i % 2 === 0 ? "✨" : "💗"}
                </motion.div>
              );
            })}

            {/* Money envelope arriving */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0, y: 60 }}
              animate={{
                scale: [0, 1.2, 1],
                rotate: [-180, 10, 0],
                opacity: [0, 1, 1],
                y: [60, -10, 0],
              }}
              transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
              className="absolute text-7xl drop-shadow-2xl"
            >
              💸
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Bank Transfer Animation ---------- */
function TransferAnimation() {
  return (
    <div className="relative flex w-full max-w-sm items-center justify-between px-4 py-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 14 }}
        className="glass flex h-16 w-16 items-center justify-center rounded-2xl text-2xl shadow-glow"
      >
        🏦
      </motion.div>

      <div className="relative flex-1 mx-2 h-8 overflow-hidden">
        {[0, 0.4, 0.8, 1.2, 1.6].map((delay, i) => (
          <motion.div
            key={i}
            initial={{ x: 0, opacity: 0, scale: 0.6 }}
            animate={{
              x: [0, 60, 120, 180],
              opacity: [0, 1, 1, 0],
              scale: [0.6, 1, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              delay,
              repeat: 1,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-lg"
          >
            💵
          </motion.div>
        ))}
        <motion.div
          className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-gradient-romance rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 14, delay: 0.3 }}
        className="glass flex h-16 w-16 items-center justify-center rounded-2xl text-2xl shadow-glow"
      >
        💗
      </motion.div>
    </div>
  );
}

