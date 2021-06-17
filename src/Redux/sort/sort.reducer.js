import { SortTypes } from "./sort.types";

const INITIAL_STATE = {
    list: [],
    graphGenerated: false,
    sortRunning: false,
    stopClicked: false,
    leftPointer: 0,
    rightPointer: null,
}

const sortReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case SortTypes.GENERATE_GRAPH:
            return {
                ...state,
                list: [...action.payload],
                graphGenerated: true
            }

        case SortTypes.UPDATE_GRAPH:
            return {
                ...state,
                list: [...action.payload],
            }

        case SortTypes.TOGGLE_SORT_RUNNING:
            return {
                ...state,
                sortRunning: action.payload,
            }
        
        case SortTypes.TOGGLE_STOP_CLICKED:
            return {
                ...state,
                stopClicked: action.payload,
            }
        
        case SortTypes.UPDATE_LEFT_POINTER:
            return {
                ...state,
                leftPointer: action.payload,
            }
        
        case SortTypes.UPDATE_RIGHT_POINTER:
            return {
                ...state,
                rightPointer: action.payload,
            }
        
        default:
            return state;
    }
}

export default sortReducer;