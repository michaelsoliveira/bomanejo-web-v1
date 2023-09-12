"use strict";
exports.__esModule = true;
exports.setPoa = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    id: '',
    descricao: '',
    data_ultimo_plan: new Date(0),
    pmfs: ''
};
var poaSlice = toolkit_1.createSlice({
    name: "poa",
    initialState: initialState,
    reducers: {
        setPoa: function (state, action) {
            var _a = action.payload, id = _a.id, descricao = _a.descricao, data_ultimo_plan = _a.data_ultimo_plan, pmfs = _a.pmfs;
            state.id = id;
            state.descricao = descricao;
            state.data_ultimo_plan = data_ultimo_plan;
            state.pmfs = pmfs;
        }
    }
});
var reducer = poaSlice.reducer, actions = poaSlice.actions;
exports.setPoa = actions.setPoa;
exports["default"] = reducer;
