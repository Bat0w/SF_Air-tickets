import {
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
  } from "@reduxjs/toolkit";
import axios from "axios";
import { IData, IParams } from "../../types";

export const fetchTickets = createAsyncThunk<IData, IParams>(
    "tickets/fetchTickets",
    async (params: IParams): Promise<IData> => {
      try {
        const { data } = await axios.get<IData>(
          `https://efaa115836ca538c.mokky.dev/tickets?limit=${params.limit}&sortBy=${params.sortBy}${params.companyFilterParams}${params.transferFilterParams}`
        );
  
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

  const ticketsAdapter = createEntityAdapter();

  const initialState: IData = ticketsAdapter.getInitialState({
    items: [],
    meta: {
      current_page: 0,
      per_page: 0,
      remaining_count: 0,
      total_items: 0,
      total_pages: 0,
    },
  });

  export const ticketsSlice = createSlice({
    name: "tickets",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
      .addCase(fetchTickets.pending, () => {
        console.log("pending");
      })
      .addCase(fetchTickets.fulfilled,
        (state, action: PayloadAction<IData>) => {
          state.items.splice(0, state.items.length, ...action.payload.items);
          state.meta = action.payload.meta;
        })
      .addCase(fetchTickets.rejected, () => {
        console.log("rejected");
      })
  }
})

export default ticketsSlice.reducer