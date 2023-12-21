import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { getAnimatePresenceConfig } from "../../../components/animation/AnimationPresence";
import UIButton from "../../../components/buttons/Button";
import "./nav-modal.scss";
import { emotionBackgroundMap } from "../../../components/constants";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../services/firebase";
import { useIdToken } from "react-firebase-hooks/auth";

const backgrounds = [
  emotionBackgroundMap["happy"],
  emotionBackgroundMap["sad"],
  emotionBackgroundMap["anxious"],
  emotionBackgroundMap["angry"],
];

export default function NavModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) {
      setShow(true);
    }
  }, [isOpen]);
  const randomBackground = useMemo(
    () => backgrounds[Math.floor(Math.random() * backgrounds.length)],
    []
  );

  const [loggedInUser, loading] = useIdToken(auth);
  const navigate = useNavigate();
  const getNavClassName = (navData: any) => {
    return navData.isActive ? "active ui-button" : "ui-button";
  };

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {show && (
            <motion.dialog
              ref={ref}
              className="nav-modal"
              open={isOpen}
              initial={{ ...getAnimatePresenceConfig("slide-right").initial }}
              animate={{
                background: randomBackground,
                ...getAnimatePresenceConfig("slide-right").animate,
              }}
              exit={{
                transition: { type: "tween", duration: 0.2 },
                ...getAnimatePresenceConfig("slide-right").exit,
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
                <UIButton
                  style={{ height: "fit-content", width: "fit-content" }}
                  onClick={() => {
                    if (onClose) {
                      onClose?.();
                    }
                    setShow(false);
                  }}
                >
                  ◀
                </UIButton>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <NavLink to={"/"} className={getNavClassName}>
                  Home
                </NavLink>
                {!loading && loggedInUser && (
                  <NavLink to={"/account-info"} className={getNavClassName}>
                    Account
                  </NavLink>
                )}
                {!loading && loggedInUser && (
                  <UIButton
                    onClick={() => {
                      auth.signOut().then(() => {
                        navigate("/");
                      });
                    }}
                    style={{ textAlign: "left" }}
                  >
                    Logout
                  </UIButton>
                )}
                {!loading && !loggedInUser && (
                  <NavLink to={"/login"} className={getNavClassName}>
                    Login
                  </NavLink>
                )}
              </div>
            </motion.dialog>
          )}
        </AnimatePresence>,

        document.body
      )}
    </>
  );
}
