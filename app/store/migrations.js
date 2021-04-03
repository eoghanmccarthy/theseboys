//https://github.com/rt2zz/redux-persist/issues/1015
//https://www.freecodecamp.org/news/how-to-use-redux-persist-when-migrating-your-states-a5dee16b5ead/

const migrations = {
  0: state => {
    return {
      ...state.app,
      master: { ...state.app.master },
      tracks: {
        ...state.app.tracks,
        t005: {
          ...state.app.tracks.t005,
          instrument: {
            ...state.app.tracks.t005.instrument,
            effects: {
              ...state.app.tracks.t005.instrument.effects,
              Reverb: { decay: 4, preDelay: 0.2, wet: 0.28 }
            }
          }
        }
      }
    };
  }
};

export default migrations;
