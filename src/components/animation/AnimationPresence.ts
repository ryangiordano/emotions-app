import { type ModalAnimatePresence } from "./types";

export const getAnimatePresenceConfig = (
  animatePresence: ModalAnimatePresence,
) => {
  switch (animatePresence) {
    case "slide-left":
      return {
        initial: { opacity: 0, x: 1000, y: 0 },
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 1000, y: 0 },
      };
    case "slide-right":
      return {
        initial: { opacity: 0, x: -1000, y: 0 },
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: -1000, y: 0 },
      };
    case "fade":
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };
    case "slide-up":
      return {
        initial: { opacity: 0, x: 0, y: 1000 },
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: 1000 },
      };
    case "slide-down":
      return {
        initial: { opacity: 0, x: 0, y: -1000 },
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -1000 },
      };
    case "flip-in-x":
      return {
        initial: { opacity: 0, rotateX: -90 },
        animate: { opacity: 1, rotateX: 0 },
        exit: { opacity: 0, rotateX: -90 },
      };
    case "flip-in-y":
      return {
        initial: { opacity: 0, rotateY: -90 },
        animate: { opacity: 1, rotateY: 0 },
        exit: { opacity: 0, rotateY: -90 },
      };
  }
};
