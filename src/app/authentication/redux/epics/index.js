import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import {
  map,
  mergeMap,
  catchError,
  timeout,
  takeUntil,
  tap
} from "rxjs/operators";

import axios from "axios";

export default (action$, state$) =>
  action$.pipe(
    ofType("auth/FETCH_CONFIG"),
    mergeMap(() => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      return from(
        axios.get(`http://eoghan.io/data/config`, {
          cancelToken: source.token
        })
      ).pipe(
        timeout(60000),
        map(response => {
          return {
            type: "auth/FETCH_CONFIG_SUCCESS",
            payload: response.data
          };
        }),
        takeUntil(
          action$.pipe(
            ofType("auth/FETCH_CONFIG_CANCEL"),
            tap(() => source.cancel())
          )
        ),
        catchError(error =>
          of({
            type: "auth/FETCH_CONFIG_ERROR",
            error
          })
        )
      );
    })
  );
