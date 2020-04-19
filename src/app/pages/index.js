import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Button } from "@eoghanmccarthy/ui";

import "./styles.scss";

import TransportProvider from "features/transportProvider";
import Master from "features/master";
import ModuleContainer from "features/moduleContainer";

const modules = [
  { id: "seq", name: "step sequencer" },
  { id: "osc", name: "oscillator" }
];

const Home = () => {
  const [props, set, stop] = useSpring(() => ({ x: 0 }));

  return (
    <TransportProvider>
      <main className={"me__content"}>
        <div className={"console"}>
          <Master />
          <div className={"modules"}>
            <ModulesNav
              onDecrement={() => set({ x: 0 })}
              onIncrement={() => set({ x: 1 })}
            />
            <animated.div
              style={{
                flex: 1,
                position: "relative",
                transform: props.x.interpolate(
                  x => `translateX(${x * -1 * 100}%)`
                )
              }}
            >
              {modules.map((m, i) => (
                <ModuleContainer key={i} index={i} data={m} />
              ))}
            </animated.div>
          </div>
        </div>
      </main>
    </TransportProvider>
  );
};

export default Home;

const ModulesNav = ({ onDecrement, onIncrement }) => {
  return (
    <div className={"modules-nav"}>
      <Button size={"md"} onClick={onDecrement}>
        p
      </Button>
      <Button size={"md"} onClick={onIncrement}>
        n
      </Button>
    </div>
  );
};
