import { createAction, createReducer, on } from "@ngrx/store";

/* Store */
export type ModeType = 'addition' | 'subtraction'
export const mode = 'addition';


/* Actions */
export const setMode = createAction('changeMode', (mode: ModeType) => ({ mode }));

/* Reducer */
export const modeReducer = createReducer(
  mode,
  on(
    setMode,
    (state,  { mode } ) => mode
  )
);
