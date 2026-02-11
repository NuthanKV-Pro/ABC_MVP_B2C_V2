import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [pan, setPan] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const upperPan = pan.toUpperCase();
    if (!panRegex.test(upperPan)) {
      setError("Please enter a valid PAN (e.g., ABCDE1234F)");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    // Store PAN for demo and navigate to loading
    sessionStorage.setItem("abc_pan", upperPan);
    navigate("/loading");
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="rounded-2xl border border-border bg-card p-8 gold-glow">
            <div className="text-center">
              <h1 className="font-display text-3xl font-bold gold-text-gradient">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Login with your Income Tax credentials
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  PAN Number
                </label>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <button
                type="submit"
                className="w-full gradient-gold rounded-lg py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                Login & Analyze
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Your credentials are used solely to access your Income Tax e-filing portal.
              We do not store your password.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
