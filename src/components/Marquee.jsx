import React from 'react';
import { motion } from 'framer-motion';

const Marquee = () => {
  const text = "FULL STACK DEVELOPER · REACT · NODE.JS · PROBLEM SOLVER · OPEN TO WORK · KARACHI PK · ";
  const repeatedText = text.repeat(10); // repeat enough to fill screen and scroll

  return (
    <div className="w-full bg-primary text-black py-4 overflow-hidden flex items-center border-y-2 border-primary/20 mt-12">
      <motion.div
        className="whitespace-nowrap flex font-syne font-bold text-4xl tracking-widest uppercase items-center"
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        <span className="inline-block">{repeatedText}</span>
      </motion.div>
    </div>
  );
};

export default Marquee;
