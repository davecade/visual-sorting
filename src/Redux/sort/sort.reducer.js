import { SortTypes } from "./sort.types";

const INITIAL_STATE = {
    list: [],
    graphGenerated: false
}

const sortReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case SortTypes.GENERATE_GRAPH:
            return {
                ...state,
                list: action.payload,
                graphGenerated: true
            }

        case SortTypes.UPDATE_GRAPH:
            return {
                ...state,
                list: action.payload,
            }
        
        default:
            return state;
    }
}

export default sortReducer;