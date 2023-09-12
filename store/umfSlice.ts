import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    nome: ''
};

export type UmfType = {
    id: string;
    nome: string;
}

const umfSlice = createSlice({
  name: "umf",
  initialState,
  reducers: {
      setUmf: (state, action: PayloadAction<UmfType>) => {
        const { id, nome } = action.payload
        state.id = id;  
        state.nome = nome;
      }
  },
  
});

const {reducer, actions} = umfSlice;

export const { setUmf } = actions;

export default reducer;
