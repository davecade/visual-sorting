import { SortTypes } from './sort.types'
import { createArray } from './sort.utils'

export const generateGraph = () => ({
    type: SortTypes.GENERATE_GRAPH,
    payload: createArray()
})

export const updateGraph = graph => ({
    type: SortTypes.UPDATE_GRAPH,
    payload: [...graph]
})

export const toggleSortRunning = status => ({
    type: SortTypes.TOGGLE_SORT_RUNNING,
    payload: status
})

export const toggleStopClicked = status => ({
    type: SortTypes.TOGGLE_STOP_CLICKED,
    payload: status
})


export const updateLeftPointer = idx => ({
    type: SortTypes.UPDATE_LEFT_POINTER,
    payload: idx
})

export const updateRightPointer = idx => ({
    type: SortTypes.UPDATE_RIGHT_POINTER,
    payload: idx
})