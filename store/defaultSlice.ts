import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    umf: {},
    upa: {},
    ut: {},
    poa: {}
};

export type ProjetoType = {
    umf: any;
    upa: any;
    ut: any;
    poa: any;
}

const defaultSlice = createSlice({
  name: "defaultData",
  initialState,
  reducers: {
      setDefaultData: (state, action: PayloadAction<ProjetoType>) => {
        const { umf, upa, ut, poa } = action.payload
        state.umf = umf;  
        state.upa = upa;
        state.ut = ut;
        state.poa = poa;
      }
  },
  
});

const {reducer, actions} = defaultSlice;

export const { setDefaultData } = actions;

export default reducer;
