import styled from "styled-components";
import { FunctionComponent, useEffect} from "react";
import { IItem } from "../types";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { changeTransfer } from "../store/slices/filterSlice";
import { getParams } from "../utils";

const transfers: IItem[] = [
    {value: "0", label: "Без пересадок"},
    {value: "1", label: "1 пересадка"},
    {value: "2", label: "2 пересадки"},
    {value: "3", label: "3 пересадки"},
];

interface IProps {
    transfersFilterCallback: (value: string) => void;
}

const TransfersFilter: FunctionComponent<IProps> = ( {transfersFilterCallback} ): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();
    const transfersFilter = useSelector(
        (state: RootState) => state.filter.transfers
    );

    useEffect(() => { 
        transfersFilterCallback(getParams(transfersFilter, "connectionAmount"))}, [transfersFilter, transfersFilterCallback])

    return (
        <TransfersFilterStyle>
            <h3> Количество пересадок </h3>
            <ul>
                {transfers.map((transfer: IItem) => (
                    <li key={transfer.value}>
                        <input
                        type="checkbox"
                        id={transfer.value}
                        checked={
                            transfersFilter.find((c) => c.name ===transfer.value)?.checked
                        }
                        onChange={() => dispatch(changeTransfer(transfer.value))}
                        />
                        <label htmlFor={transfer.value}>{transfer.label}</label>
                    </li>
                ))}
                
            </ul>
        </TransfersFilterStyle>
    )
}

const TransfersFilterStyle = styled.div`
  padding: 18px 18px 48px;
  border-radius: 10px;
  background: rgb(232, 235, 242);
  margin-bottom: 47px;

  h3 {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: max(2.6rem, 12px);
  }

  ul {
    color: rgb(133, 138, 227);
    line-height: 19px;
  }

  li:not(:last-of-type) {
    margin-bottom: 19px;
  }

  input {
    margin-right: 20px;
    opacity: 0;
  }

  label {
    position: relative;
  }

  input + label::before {
    content: "";
    position: absolute;
    left: -37px;
    width: 21px;
    height: 21px;
    border: 1px solid rgb(78, 20, 140);
    border-radius: 4px;
  }

  input:checked + label::before {
    content: url("./icons/checked.png");
    padding: 1px;
  }

  @media (max-width: 1360px) {
    padding: 0;
    background-color: transparent;
    color: rgb(247, 249, 247);
    order: 2;

    ul {
      color: rgb(247, 249, 247);
    }

    input + label:before {
      border-color: rgb(247, 249, 247);
    }
  }
`;

export default TransfersFilter;