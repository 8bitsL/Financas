import { configureStore } from '@reduxjs/toolkit'
import estadosApp  from './estados'

export const store = configureStore({
  reducer: {
	estado: estadosApp,
  },
})
