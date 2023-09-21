import React, { createContext } from 'react'
import { initialState } from '../reducer/state'
import TasksListState from '../types/TasksListState'
import Action from '../types/Action'

interface StateContextType {
    state: TasksListState
    dispatch: React.Dispatch<Action>
}

export const StateContext = createContext<StateContextType>({ state: initialState, dispatch: {} as React.Dispatch<Action>})