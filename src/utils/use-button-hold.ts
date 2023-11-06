import { useState, useEffect, useRef } from "react";

function useButtonHold() {
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const elementRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const startHold = () => setIsHolding(true);

    const endHold = () => {
      setIsHolding(false);
    };

    const contextMenu = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    };

    elementRef.current?.addEventListener("mousedown", startHold);
    elementRef.current?.addEventListener("mouseup", endHold);
    elementRef.current?.addEventListener("mouseleave", endHold);
    elementRef.current?.addEventListener("oncontextmenu", contextMenu);

    return () => {
      elementRef.current?.removeEventListener("mousedown", startHold);
      elementRef.current?.removeEventListener("mouseup", endHold);
      elementRef.current?.removeEventListener("mouseleave", endHold);
      elementRef.current?.removeEventListener("oncontextmenu", contextMenu);
    };
  }, [elementRef.current]);

  return { elementRef, isHolding };
}

export default useButtonHold;
