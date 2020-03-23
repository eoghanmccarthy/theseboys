import React, { useEffect } from "react";
import { Events, animateScroll as scroll, scrollSpy } from "react-scroll";
import "./styles.scss";

import { Button } from "@eoghanmccarthy/ui";

const TopScroll = () => {
  useEffect(() => {
    Events.scrollEvent.register("begin", null);
    Events.scrollEvent.register("end", null);
    scrollSpy.update();
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  });

  return (
    <Button
      size={"lg"}
      shape={"circle"}
      className={"btn-scroll"}
      onClick={() => scroll.scrollToTop()}
    >
      <span />
      <span />
    </Button>
  );
};

export default TopScroll;
