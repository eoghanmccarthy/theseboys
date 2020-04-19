import React, { Fragment, useEffect, useRef, useState } from "react";
import { Oscillator as Osc } from "tone";

//import "./styles.scss";

const Oscillator = () => {
  const oscillator = useRef(null);

  const [pos, setPos] = useState({ x: 1, y: 1 });

  useEffect(() => {
    oscillator.current = new Osc(440, "triangle5").toDestination();
  }, []);

  return (
    <div className={"oscillator"}>
      <span>
        {pos.x * 2} {pos.y}
      </span>
      <div
        onPointerEnter={() => oscillator.current.start()}
        onPointerLeave={() => oscillator.current.stop()}
        onPointerMove={val => {
          oscillator.current.frequency.value = val.clientX * 2;
          setPos({ x: val.clientX, y: val.clientY });
        }}
        style={{ width: "200px", height: "200px", backgroundColor: "blue" }}
      >
        osc
      </div>
    </div>
  );
};

export default Oscillator;
