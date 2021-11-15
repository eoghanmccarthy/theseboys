import { KEYS } from './keys';

export const actionTogglePlayback = {
  enabled: true,
  name: 'togglePlayback',
  perform: () => {
    //
  },
  contextItemLabel: 'labels.togglePlayback',
  keyTest: event => event[KEYS.SPACE]
};

export const actionSelectTrack = {
  name: 'selectTrack',
  perform: (elements, appState) => {
    if (appState.editingLinearElement) {
      return false;
    }

    return {
      appState: {
        ...appState
      },
      commitToHistory: true
    };
  },
  contextItemLabel: 'labels.selectTrack',
  keyTest: event => event[KEYS.CTRL_OR_CMD] && event.key === KEYS.A
};
