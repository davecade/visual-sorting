import { StopTypes } from './stop.types'

export const toggleStopClicked = status => ({
    type: StopTypes.TOGGLE_STOP_CLICKED,
    payload: status
})