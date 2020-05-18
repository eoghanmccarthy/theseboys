import React, { useMemo, createContext, useState, useEffect } from 'react';
import { Transport, context, start as startTone } from 'tone';

export const TransportContext = createContext();

import useEventListener from 'utils/hooks/useEventListener';

const TransportProvider = ({ children }) => {
  const [transportState, setTransportState] = useState('stopped');

  useEventListener('keydown', e => {
    switch (e.code) {
      case 'Space':
        setTransportState(s => {
          if (s === 'paused' || s === 'stopped') return 'playing';
          return 'paused';
        });
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    // https://github.com/Tonejs/Tone.js/issues/341#issuecomment-386725880
    if (context.state !== 'running') {
      startTone();
      context.resume();
    }

    return () => context.dispose();
  }, []);

  useEffect(() => {
    if (transportState === 'playing') {
      startTone();
      context.resume();
      Transport.start();
    } else if (transportState === 'paused') {
      Transport.pause();
    } else {
      Transport.stop();
    }
  }, [transportState]);

  const values = useMemo(() => {
    return {
      value: {
        transportState
      },
      actions: {
        setTransportState
      }
    };
  }, [transportState]);

  return <TransportContext.Provider value={values}>{children}</TransportContext.Provider>;
};

export default TransportProvider;
