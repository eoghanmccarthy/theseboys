import React from "react";

import "./styles.scss";

import TransportProvider from "features/transportProvider";
import Master from "features/master";
import StepSequencer from "features/stepSequencer";

const Home = () => {
  return (
    <TransportProvider>
      <main className={"me__content"}>
        <div className={"console"}>
          <Master />
          <StepSequencer />
        </div>
      </main>
    </TransportProvider>
  );
};

export default Home;
