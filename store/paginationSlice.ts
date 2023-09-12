import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useRouter } from "next/router";

const initialState = {
    name: '',
    perPage: 10,
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
    orderBy: 'especie.nome',
    order: 'ASC'
};

export type PaginationType = {
    name: string;
    perPage: number;
    currentPage: number;
    totalItems: number;
    totalPages: number;
    orderBy: string;
    order: string;
}

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
      paginate: (state, action: PayloadAction<PaginationType>) => {
        const { name, perPage, currentPage, totalItems, totalPages, orderBy, order } = action.payload
        state.name = name;  
        state.perPage = perPage;
        state.currentPage = currentPage;
        state.totalItems = totalItems;
        state.totalPages = totalPages;
        state.orderBy = orderBy;
        state.order = order;
      },
    setCurrentPagePagination: (state, action: PayloadAction<any>) => {
        state.currentPage = action.payload.currentPage
    }
  },
  
});

const {reducer, actions} = paginationSlice;

export const { paginate, setCurrentPagePagination } = actions;

export default reducer;
