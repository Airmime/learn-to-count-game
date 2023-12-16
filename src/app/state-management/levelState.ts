import { createAction, createReducer, on } from "@ngrx/store";

/* Store */
export const level: number = 1;

/* Actions */
export const setlevel = createAction('changeLevel', (level: number) => ({ level }));

/* Reducer */
export const levelReducer = createReducer(
  level,
  on(
    setlevel,
    (state, { level }) => level
  )
);
