import RootState from '../types/RootState'

export const selectTasks = (store: RootState) => store.tasks.tasks

export const selectError = (store: RootState) => store.tasks.error

export const selectInfo = (store: RootState) => store.tasks.info
