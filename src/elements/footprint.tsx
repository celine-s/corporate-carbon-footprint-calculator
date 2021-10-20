import React, { FC } from 'react';
import { motion } from 'framer-motion';

const helloVariants = {
  hidden: {
    opacity: 0,
    rotateZ: 90,
  },
  celine: {
    opacity: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],

    x: [
      '0%',
      '5%',
      '10%',
      '15%',
      '20%',
      '25%',
      '30%',
      '35%',
      '40%',
      '45%',
      '50%',
      '55%',
      '60%',
      '65%',
      '70%',
      '75%',
      '80%',
      '85%',
      '90%',
      '95%',
      '100%',
    ],
    y: '70%',
    transition: { repeat: Infinity, type: 'spring', duration: 5, delay: 1, ease: 'linear' },
  },
};
const helloVariants2 = {
  hidden: {
    opacity: 0,
    rotateZ: 90,
  },
  celine: {
    opacity: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    x: [
      '0%',
      '5%',
      '10%',
      '15%',
      '20%',
      '25%',
      '30%',
      '35%',
      '40%',
      '45%',
      '50%',
      '55%',
      '60%',
      '65%',
      '70%',
      '75%',
      '80%',
      '85%',
      '90%',
      '95%',
      '100%',
    ],
    y: '90%',
    transition: { repeat: Infinity, type: 'spring', delay: 1, duration: 5, ease: 'linear' },
  },
};

export const Footprint: FC = () => {
  return (
    <div className={'p-8 mt-8'}>
      <motion.div variants={helloVariants2} initial="hidden" animate="celine">
        Y
      </motion.div>
      <motion.div variants={helloVariants} initial="hidden" animate="celine">
        Y
      </motion.div>
    </div>
  );
};
