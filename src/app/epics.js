import { combineEpics } from "redux-observable";

import authEpics from "authentication/redux/epics";

export const rootEpic = combineEpics(authEpics);
