export const SPECIAL_STATES = ["halt-accept", "halt-reject", "halt"] as const;

export type SpecialState = (typeof SPECIAL_STATES)[number];

export const isStopState = (state: string) => {
  return !!SPECIAL_STATES.find((s) => s === state);
};
