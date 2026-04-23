import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function GiftReveal({ onReplay }: { onReplay: () => void }) {
  const [opened, setOpened] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [bankNumber, setBankNumber] = useState("");
  const [transferState, setTransferState] = useState<
    "idle" | "transferring" | "done"
  >("idle");

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
    // Show money gift after a delay
    setTimeout(() => setShowGift(true), 4000);
  };

  const sendTransfer = () => {
    if (!bankNumber.trim() || bankNumber.trim().length < 5) return;
    setTransferState("transferring");
    // Simulate the transfer animation for ~3.5 seconds
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
        මෙන්න ඔයාගේ gift එක 🎁
      </motion.h2>

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
            {/* Love Letter */}
            <div className="glass rounded-3xl p-8 sm:p-12 shadow-glow text-left">
              <h3 className="text-2xl font-bold text-gradient-romance mb-4">
                මගේ ආදරණීය ඔයාට,
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                ඔයත් එක්ක ගත කරන හැම දවසක්ම මට පුංචි සැමරුමක් වගේ. හැබැයි අද
                දවස නම් මුළු ලෝකෙම සමරන්න ඕන දවසක්.
                <br /><br />
                ඔයාගේ හිනාව, කරුණාව, සහ සාමාන්‍ය හැම දේකටම විස්මයක් එකතු කරන
                හැටි ගැන මම බොහොම සතුටුයි. මේ අවුරුද්දේ ඔයාට ඕන හැම දේම, ඊටත්
                වඩා පොඩි පොඩි සුන්දර surprises ටිකකුත් ලැබේවා.
              </p>
              <p className="mt-6 text-right italic text-rose">
                — හැමදාටම ඔයාගේ 💗
              </p>
            </div>

            {/* Money gift section - appears after delay */}
            <AnimatePresence>
              {showGift && (
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 16, delay: 0.1 }}
                  className="glass rounded-3xl p-8 shadow-glow text-center"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-muted-foreground mb-2"
                  >
                    ඒ විතරක් නෙවෙයි...
                  </motion.p>
                  <motion.h3
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="text-2xl sm:text-3xl font-bold text-gradient-romance mb-1"
                  >
                    මෙන්න මගේ තවත් පොඩි gift එකක් 💸
                  </motion.h3>

                  <AnimatePresence mode="wait">
                    {transferState === "idle" && (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ delay: 0.7 }}
                        className="mt-6 space-y-4 text-left"
                      >
                        {/* Amount display */}
                        <div className="flex items-center justify-center gap-2 py-3">
                          <span className="text-4xl font-bold text-gradient-romance">
                            රු. 5,000
                          </span>
                          <span className="text-2xl">💰</span>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
                            ඔයාගේ Bank Account Number
                          </label>
                          <input
                            type="text"
                            value={bankNumber}
                            onChange={(e) => {
                              const v = e.target.value.replace(/[^0-9\s-]/g, "");
                              setBankNumber(v);
                            }}
                            placeholder="XXXX XXXX XXXX XXXX"
                            maxLength={30}
                            className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground text-center text-lg tracking-widest outline-none focus:ring-2 focus:ring-rose"
                          />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={sendTransfer}
                          disabled={!bankNumber.trim() || bankNumber.trim().length < 5}
                          className="w-full rounded-full bg-gradient-romance px-6 py-3 text-base font-semibold text-primary-foreground shadow-glow disabled:opacity-40"
                        >
                          Send my gift 💸
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
                        <div className="text-5xl">✅</div>
                        <h4 className="text-xl font-bold text-gradient-romance">
                          Transfer successful!
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          රු. 5,000 ඔයාගේ account එකට ගියා 💗
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {opened && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={onReplay}
          className="mt-10 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          ↻ ආයෙත් play කරන්න
        </motion.button>
      )}
    </motion.div>
  );
}

/* ---------- Bank Transfer Animation ---------- */
function TransferAnimation() {
  return (
    <div className="relative flex w-full max-w-sm items-center justify-between px-4 py-6">
      {/* Sender */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 14 }}
        className="glass flex h-16 w-16 items-center justify-center rounded-2xl text-2xl shadow-glow"
      >
        🏦
      </motion.div>

      {/* Money flying across */}
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
        {/* Animated line */}
        <motion.div
          className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-gradient-romance rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </div>

      {/* Receiver */}
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
