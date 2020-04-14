import React from "react";
import { useSpring, animated } from "react-spring";

import "./styles.scss";

import TransportProvider from "features/transportProvider";
import ModulesNav from "features/modulesNav";
import Master from "features/master";
import StepSequencer from "features/stepSequencer";

const modules = ["step sequencer"];

const Home = () => {
  const [props, set, stop] = useSpring(() => ({ x: 0 }));

  console.log(props);

  return (
    <TransportProvider>
      <main className={"me__content"}>
        <button onClick={() => set({ x: 1 })}>next</button>
        <div className={"console"}>
          <Master />
          <div className={"modules"}>
            <ModulesNav />
            <animated.div
              style={{
                display: "flex",
                transform: props.x.interpolate(v => `translateX(${v * 100}%)`)
              }}
            >
              <StepSequencer />
            </animated.div>
          </div>
        </div>
      </main>
    </TransportProvider>
  );
};

export default Home;
