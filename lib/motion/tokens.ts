export const motionDurations = {
  instant: 0.08,
  fast: 0.14,
  normal: 0.22,
  slow: 0.32,
}

export const motionEasings = {
  standard: [0.2, 0.8, 0.2, 1],
  emphasized: [0.16, 1, 0.3, 1],
  exit: [0.4, 0, 0.6, 1],
}

export const motionDistances = {
  micro: 3,
  small: 8,
  medium: 16,
  large: 28,
}

export const motionSprings = {
  drawerSpring: {
    type: "spring",
    stiffness: 320,
    damping: 32,
    mass: 0.8,
  },
  cardReorderSpring: {
    type: "spring",
    stiffness: 280,
    damping: 24,
    mass: 0.9,
  },
  countSpring: {
    type: "spring",
    stiffness: 120,
    damping: 20,
    mass: 0.9,
  },
}

export const overlayOpacity = {
  light: 0.32,
  dark: 0.45,
}

export const staggerTokens = {
  children: 0.04,
}

export const reducedMotionStrategy = {
  disableSpring: true,
  noTranslate: true,
  fadeOnly: true,
}
