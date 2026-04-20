import { motion } from "motion/react";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.16, ease: "easeInOut" }}
      className="w-full flex justify-center"
    >
      {children}
    </motion.div>
  );
};