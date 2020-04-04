import React, { useContext, useEffect } from "react";
import { Button } from "@eoghanmccarthy/ui";

import "./styles.scss";

import { TransportContext } from "features/transportProvider";

const ModulesNav = () => {
  const transportCxt = useContext(TransportContext);

  return (
    <div className={"modules-nav"}>
      <Button size={"md"}>p</Button>
      <Button size={"md"}>n</Button>
    </div>
  );
};

export default ModulesNav;
