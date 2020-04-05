import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import cx from "classnames";
import Tone from "tone";
import { Dialog } from "@eoghanmccarthy/ui";

import "./styles.scss";

const TrackDetail = ({ isVisible }) => {
  return (
    <Dialog
      id={"track-detail-dialog"}
      isVisible={isVisible}
      closeDialog={close}
      onClick={close}
    >
      <div>track</div>
    </Dialog>
  );
};

export default TrackDetail;

// <SliderWithValues
//     title={"dist"}
//     min={"0"}
//     max={"10"}
//     value={distState * 10}
//     onChange={e => setDistState(e.target.value / 10)}
// />
// <SliderWithValues
// title={"reverb"}
// min={"0"}
// max={"10"}
// value={JCReverb.current.roomSize.value * 10}
// onChange={e => (JCReverb.current.roomSize.value = e.target.value / 10)}
// />
