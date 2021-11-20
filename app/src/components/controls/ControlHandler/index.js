import React, { memo, forwardRef } from 'react';
import { isString } from 'utils/helpers/typeCheck';

import BitCrusherControls from '../BitCrusherControls';
import CompressorControls from '../CompressorControls';
import DelayControls from '../DelayControls';
import DistortionControls from '../DistortionControls';
import EnvelopeControls from '../EnvelopeControls';
import Eq3Controls from '../Eq3Controls';
import FilterControls from '../FilterControls';
import LimiterControls from '../LimiterControls';
import PhaserControls from '../PhaserControls';
import PitchShiftControls from '../PitchShiftControls';
import ReverbControls from '../ReverbControls';
import StereoWidenerControls from '../StereoWidenerControls';

export const ControlHandler = memo(
  forwardRef(({ trackId, name, node }, ref) => {
    if (!isString(trackId) || !isString(name) || !node) {
      return null;
    }

    //const Component = `${name}Controls`;

    switch (name) {
      case 'BitCrusher':
        return <BitCrusherControls trackId={trackId} node={node} />;
      case 'Compressor':
        return <CompressorControls trackId={trackId} node={node} />;
      case 'Distortion':
        return <DistortionControls trackId={trackId} node={node} />;
      case 'Envelope':
        return <EnvelopeControls trackId={trackId} node={node} />;
      case 'EQ3':
        return <Eq3Controls trackId={trackId} node={node} />;
      case 'FeedbackDelay':
        return <DelayControls trackId={trackId} node={node} />;
      case 'Filter':
        return <FilterControls trackId={trackId} node={node} />;
      case 'Limiter':
        return <LimiterControls trackId={trackId} node={node} />;
      case 'Phaser':
        return <PhaserControls trackId={trackId} node={node} />;
      case 'PitchShift':
        return <PitchShiftControls trackId={trackId} node={node} />;
      case 'Reverb':
        return <ReverbControls trackId={trackId} node={node} />;
      case 'StereoWidener':
        return <StereoWidenerControls trackId={trackId} node={node} />;
      default:
        return null;
    }
  })
);
