import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type Stage = "letter" | "money" | "package" | "outro";

export function GiftReveal({ onFinish }: { onFinish: () => void }) {
  const [opened, setOpened] = useState(false);
  const [stage, setStage] = useState<Stage>("letter");
  const [bankNumber, setBankNumber] = useState("");
  const [transferState, setTransferState] = useState<
    "idle" | "transferring" | "done"
  >("idle");
  const [packageState, setPackageState] = useState<
    "idle" | "delivering" | "delivered"
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

  const goToPackage = () => setStage("package");

  const orderPackage = () => {
    setPackageState("delivering");
    setTimeout(() => {
      setPackageState("delivered");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 },
        colors: ["#ff6fa3", "#ffd86b", "#ffffff"],
      });
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center"
    >
      <ScatteredLabels />
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
              {(["letter", "money", "package"] as Stage[]).map((s, i) => {
                const order = ["letter", "money", "package"];
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

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setStage("money")}
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
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 8 }}
                          className="text-5xl"
                        >
                          ✅
                        </motion.div>
                        <h4 className="text-xl font-bold text-gradient-romance">
                          Transfer successful!
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          රු. 5,000 ඔයාගේ account එකට ගියා 💗
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={goToPackage}
                          className="mt-4 w-full rounded-full bg-gradient-romance px-6 py-3 text-base font-semibold text-primary-foreground shadow-glow"
                        >
                          තවත් එකක් තියනවා... →
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* ============ STAGE 3: CUTE PACKAGE ============ */}
              {stage === "package" && (
                <motion.div
                  key="package"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  className="glass rounded-3xl p-8 shadow-glow text-center"
                >
                  <div className="mb-2 text-4xl">🎀</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gradient-romance mb-1">
                    අන්තිම surprise එක
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ඔයා ඉන්න තැනටම ඉක්මනට එයි 💕
                  </p>

                  <AnimatePresence mode="wait">
                    {packageState === "idle" && (
                      <motion.div
                        key="order"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="mt-6 flex flex-col items-center gap-5"
                      >
                        <motion.div
                          animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                          className="text-7xl drop-shadow-2xl"
                        >
                          🎁
                        </motion.div>
                        <p className="text-sm text-foreground/80 max-w-xs">
                          පොඩි surprise package එකක් ඔයා ඉන්න තැනටම යවනවා ✨
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={orderPackage}
                          className="w-full rounded-full bg-gradient-romance px-6 py-3 text-base font-semibold text-primary-foreground shadow-glow"
                        >
                          මට යවන්න 🚚
                        </motion.button>
                      </motion.div>
                    )}

                    {packageState === "delivering" && (
                      <motion.div
                        key="delivering"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-8 flex flex-col items-center gap-6"
                      >
                        <DeliveryAnimation />
                        <p className="text-sm text-muted-foreground animate-pulse">
                          ඔයා ඉන්න තැනට එනවා...
                        </p>
                      </motion.div>
                    )}

                    {packageState === "delivered" && (
                      <motion.div
                        key="delivered"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="relative mt-6 flex flex-col items-center gap-4"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", damping: 10 }}
                          className="text-7xl drop-shadow-2xl relative z-10"
                        >
                          🎁
                        </motion.div>
                        <h4 className="text-xl font-bold text-gradient-romance relative z-10">
                          Gift Box 🎉
                        </h4>
                        <p className="text-sm text-muted-foreground max-w-xs relative z-10">
                          ඇතුලේ මොකද්ද කියලා... ඒක surprise එකක් 💕
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={onFinish}
                          className="mt-2 rounded-full bg-gradient-romance px-8 py-3 text-base font-semibold text-primary-foreground shadow-glow animate-pulse-glow relative z-10"
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

/* ---------- Delivery Truck Animation ---------- */
function DeliveryAnimation() {
  return (
    <div className="relative w-full max-w-sm h-24 overflow-hidden">
      {/* Road */}
      <div className="absolute bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rose to-transparent" />
      <div className="absolute bottom-2 left-0 right-0 flex justify-around text-[8px] text-muted-foreground">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i}>•</span>
        ))}
      </div>

      {/* House at the end */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute right-2 bottom-4 text-3xl"
      >
        🏠
      </motion.div>

      {/* Moving truck */}
      <motion.div
        initial={{ x: -60 }}
        animate={{ x: "calc(100% - 90px)" }}
        transition={{ duration: 3.5, ease: "easeInOut" }}
        className="absolute bottom-4 text-4xl"
      >
        🚚
      </motion.div>

      {/* Floating hearts trail */}
      {[0, 0.6, 1.2, 1.8, 2.4].map((delay, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [-5, -25],
            x: [0, 10],
          }}
          transition={{ duration: 1.2, delay, repeat: 1 }}
          className="absolute bottom-10 left-8 text-sm"
        >
          💗
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Scattered Compliment Labels ---------- */
function ScatteredLabels() {
  const labels = [
    { text: "ඔයා හරිම ආදරණීයයි", bg: "bg-rose/30", top: "8%", left: "4%", rotate: -12 },
    { text: "ඔයා හරිම ලස්සනයි", bg: "bg-amber-200/60", top: "12%", left: "70%", rotate: 10 },
    { text: "ඔයා හරිම කරුණාවන්තයි", bg: "bg-emerald-200/50", top: "32%", left: "2%", rotate: 6 },
    { text: "ඔයා හරිම හුරු බුහුටියි", bg: "bg-pink-200/60", top: "55%", left: "75%", rotate: -8 },
    { text: "ඔයා මගේ ලොකේ 💗", bg: "bg-violet-200/50", top: "82%", left: "8%", rotate: -4 },
    { text: "❤️", bg: "bg-rose/50", top: "78%", left: "82%", rotate: 14 },
    { text: "💗", bg: "bg-pink-200/60", top: "45%", left: "45%", rotate: 0 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {labels.map((l, i) => {
        // unique drift path per label
        const dx = 30 + (i % 3) * 25;
        const dy = 25 + (i % 4) * 20;
        const dur = 12 + (i % 5) * 3;
        return (
          <motion.div
            key={i}
            drag
            dragMomentum={false}
            dragElastic={0.6}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, dx, -dx, dx / 2, 0],
              y: [0, -dy, dy / 2, -dy / 2, 0],
              rotate: [l.rotate, l.rotate + 6, l.rotate - 4, l.rotate + 3, l.rotate],
            }}
            transition={{
              opacity: { delay: i * 0.15, duration: 0.6 },
              scale: { delay: i * 0.15, type: "spring", damping: 10 },
              x: { duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
              y: { duration: dur * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
              rotate: { duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
            }}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 1.15, zIndex: 50 }}
            style={{ top: l.top, left: l.left }}
            className={`pointer-events-auto absolute cursor-grab active:cursor-grabbing ${l.bg} backdrop-blur-sm rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold text-foreground/90 shadow-md whitespace-nowrap select-none touch-none`}
          >
            {l.text}
          </motion.div>
        );
      })}
    </div>
  );
}
