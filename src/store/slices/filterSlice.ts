import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { FilterOption } from "../../types";

const filterAdapter = createEntityAdapter();

const initialState: { company: FilterOption[];
    transfers: FilterOption[] } = 
        filterAdapter.getInitialState({
            company: [
                {name: "pobeda", checked: false},
                {name: "red-wings", checked: false},
                {name: "s7-airlines", checked: false},
            ],
            transfers: [
                {name: "0", checked: false},
                {name: "1", checked: false},
                {name: "2", checked: false},
                {name: "3", checked: false},
            ],
        })

export const filterSlice = createSlice({
    name: "tickets",
    initialState: initialState,
    reducers: {
        changeCompany: (state, action) => {
          state.company = state.company.map((company) => {
            if (company.name === action.payload) {
              return { ...company, checked: !company.checked };
            } else {
              return company;
            }
            })
        },
        changeTransfer: (state, action) => {
            state.transfers = state.transfers.map((transfer) => {
              if (transfer.name === action.payload) {
                return { ...transfer, checked: !transfer.checked };
              } else {
                return transfer;
              }
              })
          }
    }
})

export const { changeCompany, changeTransfer } = filterSlice.actions;

export default filterSlice.reducer;