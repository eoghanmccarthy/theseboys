import React, { useEffect, useRef, useState } from "react";
import Tone from "tone";

const useChannel = (v = 0, p = 0, m = false, s = false) => {
  const channel = useRef(new Tone.Channel(v, p));

  const [volume, setVolume] = useState(v);
  const [pan, setPan] = useState(p);
  const [mute, setMute] = useState(m);
  const [solo, setSolo] = useState(s);

  useEffect(() => {
    channel.current.volume.value = volume;
  }, [volume]);

  useEffect(() => {
    channel.current.pan.value = pan;
  }, [pan]);

  useEffect(() => {
    channel.current.mute = mute;
  }, [mute]);

  useEffect(() => {
    channel.current.solo = solo;
  }, [solo]);

  return {
    volume: { value: volume, set: setVolume },
    pan: { value: pan, set: setPan },
    mute: { value: mute, set: setMute },
    solo: { value: solo, set: setSolo },
    current: channel.current
  };
};

export default useChannel;
