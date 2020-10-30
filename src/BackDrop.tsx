import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

export function BackDrop() {
  const [isOpen, setIsOpen] = useState(false);

  const [{ y }, set] = useSpring(() => ({ y: 0 }));
  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(
    ({ down, movement: [_, my] }) => {
      if (!down && my < -100) {
        setIsOpen(true);
        set({ y: -(72 * 2) });
        return;
      }

      if (!down && my > 100) {
        setIsOpen(false);
        set({ y: 0 });
        return;
      }

      const currentY = isOpen ? -(72 * 2) : 0;

      set({ y: down ? currentY + my : currentY });
    },
    {
      axis: "y",
      filterTaps: true,
      bounds: isOpen ? { top: 0 } : { bottom: 0 },
      rubberband: true
    }
  );

  return (
    <animated.div className="BackDrop" {...bind()} style={{ y }}>
      <div className="PullIndicator"></div>
      <div className="Icons">
        <div className="Icon"></div>
        <div className="Icon"></div>
        <div className="Icon"></div>
        <div className="Icon"></div>
        <div className="Icon"></div>
        <div className="Icon"></div>
        <div className="Icon"></div>
        <div className="Icon"></div>
        <div className="Icon"></div>
        <div className="Icon"></div>
        <div className="Icon"></div>
        <div className="Icon"></div>
      </div>
    </animated.div>
  );
}
