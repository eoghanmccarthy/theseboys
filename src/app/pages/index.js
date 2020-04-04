import React from "react";

import "./styles.scss";

import TransportProvider from "features/transportProvider";
import ModulesNav from "features/modulesNav";
import Master from "features/master";
import StepSequencer from "features/stepSequencer";

const modules = ["step sequencer"];

const Home = () => {
  return (
    <TransportProvider>
      <main className={"me__content"}>
        <div className={"console"}>
          <Master />
          <div className={"modules"}>
            <ModulesNav />
            <StepSequencer />
          </div>
        </div>
      </main>
    </TransportProvider>
  );
};

export default Home;
