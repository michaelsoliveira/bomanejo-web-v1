import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    numero_ut: 0
};

export type UtType = {
    id: string;
    numero_ut: number
}

const utSlice = createSlice({
  name: "ut",
  initialState,
  reducers: {
    setUt: (state, action: PayloadAction<UtType>) => {
        const { id, numero_ut } = action.payload
        state.id = id;  
        state.numero_ut = numero_ut;
      }
  },
  
});

const {reducer, actions} = utSlice;

export const { setUt } = actions;

export default reducer;
