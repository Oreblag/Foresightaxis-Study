'use client';
import { motion, MotionProps } from 'framer-motion';
import React from 'react';

type FramerWrapperProps = MotionProps & React.HTMLAttributes<HTMLDivElement>;

export const FramerWrapper: React.FC<FramerWrapperProps> = ({
  children,
  initial,
  animate,
  transition,
  className,
  ...rest
}) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};