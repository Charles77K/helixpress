import { motion } from "motion/react";

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-500 text-xl font-bold"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full bg-red-500 animate-pulse"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-3 h-3 rounded-full bg-red-500 animate-pulse"
            style={{ animationDelay: "300ms" }}
          />
          <div
            className="w-3 h-3 rounded-full bg-red-500 animate-pulse"
            style={{ animationDelay: "600ms" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
