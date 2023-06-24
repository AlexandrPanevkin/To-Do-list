export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as null | string,
  isInitialized: false,
};

type InitialStateType = typeof initialState;

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    case "login/SET-IS-INITIALIZED":
      return { ...state, isInitialized: action.value };
    default:
      return state;
  }
};

export const setRequestStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status } as const);

export const setErrorAC = (error: null | string) => ({ type: "APP/SET-ERROR", error } as const);

export const setIsInitializedAC = (value: boolean) => ({ type: "login/SET-IS-INITIALIZED", value } as const);

export type setRequestStatusACType = ReturnType<typeof setRequestStatusAC>;
export type setErrorACType = ReturnType<typeof setErrorAC>;
type ActionsType = setRequestStatusACType | setErrorACType | ReturnType<typeof setIsInitializedAC>;
