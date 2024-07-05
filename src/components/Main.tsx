import styled from "styled-components";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { ITicket } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../store/slices/ticketSlice";
import { AppDispatch, RootState } from "../store/store";
import OptionMenu from "./OptionMenu"
import TicketBlock from "./TicketBlock";
import FilterMenu from "./FilterMenu";

const Main: FunctionComponent = (): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();
    const tickets = useSelector((state: RootState) => state.tickets.items);
    const ticketsLength = useSelector(
        (state: RootState) => state.tickets.meta.total_items
      );
    const [limit, setLimit] = useState<number>(3);
    const [companyFilterParams, setCompanyFilterParams] = useState<string>("");
    const [transferFilterParams, setTransferFilterParams] = useState<string>("");
    const [sort, setSort] = useState<string>("price")

    useEffect(() => {
        dispatch(
          fetchTickets({
            limit,
            sortBy: sort,
            companyFilterParams,
            transferFilterParams,
          })
        )
      }, [ dispatch, limit, companyFilterParams, transferFilterParams, sort]);

      const sortCallback = useCallback(
        (sortBy: "price" | "duration" | "connectionAmount") => setSort(sortBy),
        []
      );
    
      const companyFilterCallback = useCallback(
        (value: string) => setCompanyFilterParams(value),
        []
      );
    
      const transferFilterCallback = useCallback(
        (value: string) => setTransferFilterParams(value),
        []
      );

    return (
        <MainStyle>
          <div className="container">
            <OptionMenu sortCallback={sortCallback} />
            <FilterMenu
              companyFilterCallback={companyFilterCallback}
              transferFilterCallback={transferFilterCallback}
            />
            <ul className="tickets">
              {tickets.slice(0, limit).map((ticket: ITicket) => (
                <TicketBlock key={ticket.id} ticket={ticket} />
              ))}
            </ul>
            <button
              onClick={() => setLimit((prev) => prev + 3)}
                disabled={limit >= ticketsLength}>
                Загрузить ещё билеты
            </button>
          </div>
        </MainStyle>
    )
}

const MainStyle = styled.section`
    .container {
    position: relative;
  }
  
  & > .container > button {
    color: rgb(247, 249, 247);
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
    width: 100%;
    border-radius: 10px;
    background-color: rgb(78, 20, 140);
    padding: 16px 0;
    margin: max(7.4rem, 52px) 0 10rem;
    transition: all 300ms linear;

    &:hover {
      background-color: rgba(78, 20, 140, 0.9);
      cursor: pointer;
    }

    &:active {
      opacity: 0.6;
    }

    &:disabled,
    &:disabled:hover,
    &:disabled:active {
      background-color: rgb(80, 0, 80);
      cursor: auto;
      opacity: 1;
    }
  }
  
  .tickets {
    display: flex;
    flex-direction: column;
    gap: 47px;
  }
`;

export default Main;