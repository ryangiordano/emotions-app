// generic react modal using html dialog element

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";
import { AnimatePresence, motion } from "framer-motion";
import { emotionBackgroundMap } from "../constants";
import UIButton from "../buttons/Button";

export default function Modal({
  children,
  header,
  open,
  onClose,
}: {
  header?: string;
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
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
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{
                opacity: 1,
                scaleY: children ? 1 : 0,
                background: emotionBackgroundMap["anxious"],
                x: 0,
              }}
              exit={{
                opacity: 0,
                scaleY: 0,
                transition: { type: "tween", duration: 0.2 },
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
                  // className="button ui-button close-button"
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
