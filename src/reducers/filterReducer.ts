import {FilterValuesType} from "../App";

export const filterReducer = (state: FilterValuesType, action: changeFilterACType) => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return action.payload.filterValue
        }
        default:
            return state
    }
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (filterValue: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            filterValue
        }
    } as const
}