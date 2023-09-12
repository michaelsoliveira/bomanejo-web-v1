import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Action types
interface SetDateAction {
  type: 'SET_POA';
  payload: Date;
}

const initialState = {
    id: '',
    descricao: '',
    data_ultimo_plan: null,
    pmfs: ''
};

export interface PoaType {
    id: string;
    descricao: string;
    data_ultimo_plan: Date | null;
    pmfs: '';
}

const poaSlice = createSlice({
  name: "poa",
  initialState,
  reducers: {
      setPoa: (state, action: PayloadAction<PoaType>) => {
        const { id, descricao, data_ultimo_plan, pmfs }: any = action.payload
        state.id = id;  
        state.descricao = descricao;
        state.data_ultimo_plan = data_ultimo_plan;
        state.pmfs = pmfs;
      }
  },
  
});

const {reducer, actions} = poaSlice;

export const { setPoa } = actions;

export default reducer;
