import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type SendState = "idle" | "sending" | "sent" | "error";

export function GiftReveal({ onReplay }: { onReplay: () => void }) {
  const [opened, setOpened] = useState(false);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("500");
  const [sendState, setSendState] = useState<SendState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
    fire(0.1, { spread: 120, startVelocity: 45 });
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

  const sendGift = async () => {
    if (!phone.trim()) {
      setErrorMsg("කරුණාකර phone number එක දාන්න 💗");
      setSendState("error");
      return;
    }
    setSendState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/public/send-gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), amount }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "මොකක්හරි වැරදුනා. ආයෙත් උත්සාහ කරන්න.");
        setSendState("error");
        return;
      }
      setSendState("sent");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffd86b", "#ff6fa3", "#ffffff"],
      });
    } catch {
      setErrorMsg("Network එකේ ප්‍රශ්නයක්. ආයෙත් try කරන්න.");
      setSendState("error");
    }
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
            key="letter"
            initial={{ scale: 0.6, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 18 }}
            className="glass mt-10 max-w-xl rounded-3xl p-8 sm:p-12 shadow-glow text-left"
          >
            <h3 className="text-2xl font-bold text-gradient-romance mb-4">
              මගේ ආදරණීය ඔයාට,
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
              ඔයත් එක්ක ගත කරන හැම දවසක්ම මට පුංචි සැමරුමක් වගේ. හැබැයි අද
              දවස නම් මුළු ලෝකෙම සමරන්න ඕන දවසක්.
              <br />
              <br />
              ඔයාගේ හිනාව, කරුණාව, සහ සාමාන්‍ය හැම දේකටම විස්මයක් එකතු කරන
              හැටි ගැන මම බොහොම සතුටුයි. මේ අවුරුද්දේ ඔයාට ඕන හැම දේම, ඊටත්
              වඩා පොඩි පොඩි සුන්දර surprises ටිකකුත් ලැබේවා.
              <br />
              <br />
              <span className="text-rose font-semibold">
                මගෙන් පොඩි gift එකක් ඔයාගේ phone එකට SMS එකක් විදිහට එනවා 💸✨
              </span>{" "}
              පහල phone number එක දාලා "Send my gift" click කරන්න.
            </p>

            <div className="mt-6 space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  ඔයාගේ Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+9477XXXXXXX"
                  disabled={sendState === "sending" || sendState === "sent"}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-rose disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  ලැබෙන මුදල (LKR)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={sendState === "sending" || sendState === "sent"}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-rose disabled:opacity-50"
                />
              </div>

              {sendState === "error" && (
                <p className="text-sm text-destructive">{errorMsg}</p>
              )}

              {sendState !== "sent" ? (
                <motion.button
                  whileHover={{ scale: sendState === "sending" ? 1 : 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={sendGift}
                  disabled={sendState === "sending"}
                  className="w-full rounded-full bg-gradient-romance px-6 py-3 text-base font-semibold text-primary-foreground shadow-glow disabled:opacity-70"
                >
                  {sendState === "sending"
                    ? "යවනවා... 💗"
                    : "Send my gift 💸"}
                </motion.button>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-full bg-gradient-romance px-6 py-3 text-base font-semibold text-primary-foreground text-center"
                >
                  ✓ SMS එක ඔයාගේ phone එකට ගියා! 🎉
                </motion.div>
              )}
            </div>

            <p className="mt-6 text-right italic text-rose">
              — හැමදාටම ඔයාගේ 💗
            </p>
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
