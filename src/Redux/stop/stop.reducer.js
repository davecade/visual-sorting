import { StopTypes } from "./stop.types";

const INITIAL_STATE = {
    stopClicked: false,
}

const stopReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        
        case StopTypes.TOGGLE_STOP_CLICKED:
            return {
                ...state,
                stopClicked: action.payload,
            }
        
        default:
            return state;
    }
}

export default stopReducer;