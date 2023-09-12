import { Action, configureStore, getDefaultMiddleware, ThunkAction } from "@reduxjs/toolkit";
import projetoReducer from './projetoSlice'
import userReducer from './userSlice'
import messageReducer from './messageSlice'
import paginationReducer from "./paginationSlice";
import umfReducer from './umfSlice'
import upaReducer from './upaSlice'
import utReducer from './utSlice'
import poaReducer from './poaSlice'
import { loadState } from "./browser-storage";

export const store = configureStore({
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: true,
    reducer: {
        projeto: projetoReducer,
        user: userReducer,
        message: messageReducer,
        pagination: paginationReducer,
        umf: umfReducer,
        upa: upaReducer,
        ut: utReducer,
        poa: poaReducer
    },
    preloadedState: loadState()
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<String>
>
