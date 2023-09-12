import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    nome: '',
    active: false
};

export type ProjetoType = {
    id: string;
    nome: string;
    active: boolean;
}

const projetoSlice = createSlice({
  name: "projeto",
  initialState,
  reducers: {
      setProjeto: (state, action: PayloadAction<ProjetoType>) => {
        const { id, nome, active } = action.payload
        state.id = id;  
        state.nome = nome;
        state.active = active;
      }
  },
  
});

const {reducer, actions} = projetoSlice;

export const { setProjeto } = actions;

export default reducer;
