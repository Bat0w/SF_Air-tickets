import { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { ISort, ISortOptions } from "../types/index"

const inputs: ISort[] = [
  { value: "price", label: "Самый дешевый" },
  { value: "duration", label: "Самый быстрый" },
  { value: "connectionAmount", label: "Самый оптимальный" },
];

interface IProps {
    sortCallback: (value: ISortOptions) => void;
}

const OptionMenu: FunctionComponent<IProps> = ({ sortCallback }): JSX.Element => {
    const [value, setValue] = useState<ISortOptions>("price");
    
    useEffect(() => {
        sortCallback(value)
    }, [sortCallback, value]);

    return (
        <OptionMenuStyle>
            {inputs.map((item) => (
                <li key={item.value}>
                    <input
                        type="radio"
                        name="radio"
                        id={item.value}
                        value={item.value}
                        checked={value === item.value}
                        onChange={() => setValue(item.value)}
                    />
                    <label htmlFor={item.value}>{item.label}</label>
                </li>
            ))}
        </OptionMenuStyle>
    )
}

const OptionMenuStyle = styled.ul`
  display: flex;
  justify-content: space-between;
  background: rgb(232, 235, 242);
  border: 1px solid rgb(78, 20, 140);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: max(2.9rem, 12px);

  li {
    flex-grow: 1;
    text-align: center;
    box-sizing: border-box;

    label {
      display: inline-block;
      padding: max(1.8rem, 14px) 0;
      width: 100%;
      transition: all 300ms linear;
    }

    label:hover {
      cursor: pointer;
      background-color: rgba(78, 20, 140, 0.1);
    }

    input:checked + label {
      background-color: rgb(78, 20, 140);
      color: rgb(247, 249, 247);
    }

    input {
      position: absolute;
      opacity: 0;
    }

    &:not(:last-child) {
      border-right: 1px solid rgb(78, 20, 140);
    }
  }
`;

export default OptionMenu;