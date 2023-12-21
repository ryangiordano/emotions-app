// generic react modal using html dialog element

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";
import { AnimatePresence, motion } from "framer-motion";
import UIButton from "../buttons/Button";
import { ModalAnimatePresence } from "../animation/types";
import { getAnimatePresenceConfig } from "../animation/AnimationPresence";

export default function Modal({
  children,
  header,
  open,
  onClose,
  animatePresence = "flip-in-x",
  backgroundColor,
}: {
  header?: string;
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  animatePresence?: ModalAnimatePresence;
  backgroundColor?: string;
}) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) {
      setShow(true);
    }
  }, [open]);
  return (
    <>
      {createPortal(
        <AnimatePresence>
          {show && (
            <motion.dialog
              ref={ref}
              className="modal"
              open={open}
              initial={{ ...getAnimatePresenceConfig(animatePresence).initial }}
              animate={{
                background: backgroundColor ?? "white",
                ...getAnimatePresenceConfig(animatePresence).animate,
              }}
              exit={{
                transition: { type: "tween", duration: 0.2 },
                ...getAnimatePresenceConfig(animatePresence).exit,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {header ? <h1>{header}</h1> : null}
                <UIButton
                  style={{ height: "fit-content", width: "fit-content" }}
                  onClick={() => {
                    if (onClose) {
                      onClose?.();
                    }
                    setShow(false);
                  }}
                >
                  x
                </UIButton>
              </div>
              {children}
            </motion.dialog>
          )}
        </AnimatePresence>,

        document.body
      )}
    </>
  );
}
