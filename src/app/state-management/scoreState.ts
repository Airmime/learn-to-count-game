import { createAction, createReducer, on } from "@ngrx/store";

/* Store */
export const score: number = 0;

/* Actions */
export const setScore = createAction('incrementScore', (score: number) => ({ score }));

/* Reducer */
export const scoreReducer = createReducer(
    score,
    on(
        setScore,
        (state, { score }) => score
    )
);