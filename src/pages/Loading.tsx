import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
  "Connecting to Income Tax Portal...",
  "Logging in with your credentials...",
  "Fetching filed returns...",
  "Downloading notices & orders...",
  "Analyzing tax history with AI...",
  "Preparing your dashboard...",
];

const Loading = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => navigate("/questionnaire"), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [navigate]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="dark flex min-h-screen items-center justify-center bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg px-4 text-center"
      >
        <div className="font-display text-4xl font-bold gold-text-gradient">ABC</div>
        <p className="mt-2 text-sm text-muted-foreground">Processing your data</p>

        <div className="mt-12">
          <div className="mx-auto h-2 w-full max-w-sm overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full gradient-gold rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: i <= currentStep ? 1 : 0.3,
                x: 0,
              }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center justify-center gap-2 text-sm"
            >
              <span
                className={
                  i < currentStep
                    ? "text-gold"
                    : i === currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                }
              >
                {i < currentStep ? "✓" : i === currentStep ? "●" : "○"}
              </span>
              <span
                className={
                  i < currentStep
                    ? "text-muted-foreground"
                    : i === currentStep
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }
              >
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;
