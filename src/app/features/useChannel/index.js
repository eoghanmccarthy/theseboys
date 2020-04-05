import React, { useEffect, useRef, useState } from "react";
import Tone from "tone";

const useChannel = (volume = 0, pan = 0) => {
  const channel = useRef(new Tone.Channel(volume, pan));

  const [mute, setMute] = useState(false);
  const [solo, setSolo] = useState(false);

  useEffect(() => {
    channel.current.mute = mute;
  }, [mute]);

  useEffect(() => {
    channel.current.solo = solo;
  }, [solo]);

  return {
    mute: { value: mute, set: setMute },
    solo: { value: solo, set: setSolo },
    channel: channel.current
  };
};

export default useChannel;
