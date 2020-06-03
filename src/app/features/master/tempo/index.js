import React, { useEffect, useState } from 'react';
import { Transport } from 'tone';

import { Control, ControlBlock } from 'componentLib/control';
import { SliderWithValues } from 'componentLib/slider';
import useEventListener from 'utils/hooks/useEventListener';

const TEMPO_MIN = 30;
const TEMPO_MAX = 240;

const Tempo = () => {
  const [bpm, setBpm] = useState(120);

  useEventListener('keydown', e => {
    switch (e.code) {
      case 'ArrowRight':
        if (e.shiftKey) {
          setBpm(b => {
            if (b + 1 <= TEMPO_MAX) {
              return b + 1;
            }
            return b;
          });
        }
        break;
      case 'ArrowLeft':
        if (e.shiftKey) {
          setBpm(b => {
            if (b - 1 >= TEMPO_MIN) {
              return b - 1;
            }
            return b;
          });
        }
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    Transport.set({ bpm: bpm });
  }, []);

  return (
    <ControlBlock>
      <Control>
        <SliderWithValues
          title={'bpm'}
          min={TEMPO_MIN}
          max={TEMPO_MAX}
          value={bpm}
          onChange={e => {
            let value = e.target.value;
            Transport.set({ bpm: value });
            setBpm(value);
          }}
        />
      </Control>
    </ControlBlock>
  );
};

export default Tempo;
