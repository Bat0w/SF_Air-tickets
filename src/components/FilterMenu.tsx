import styled from "styled-components";
import { FunctionComponent, useState, memo} from "react";
import TransfersFilter from "./TransfersFilter";
import CompaniesFilter from "./CompaniesFilter";

interface IProps {
    companyFilterCallback: (value: string) => void;
    transferFilterCallback: (value: string) => void;
}

const FilterMenu: FunctionComponent<IProps> = memo(
    ({ companyFilterCallback, transferFilterCallback }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <FilterMenuStyle $isOpen={isOpen}>
                <div className="header">
                    <p>Любая компания, любое кол-во пересадок</p>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <span>Открыть настройки</span>
                        <img src="./icons/arrow.png" alt="arrow" />
                    </button>
                </div>
                <div className="body">
          <TransfersFilter transfersFilterCallback={transferFilterCallback} />
          <CompaniesFilter companyFilterCallback={companyFilterCallback} />
        </div>
            </FilterMenuStyle>
        )
    }
)

const FilterMenuStyle = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: -296px;
  margin-bottom: max(3.4rem, 25px);

  .header {
    display: none;
  }

  .body {
    position: fixed;
    top: 121px;
  }

  @media (max-width: 1360px) {
    position: static;
    border-radius: 10px;
    background: rgb(78, 20, 140);
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: rgb(247, 249, 247);
      line-height: 19px;
      padding: 12px 23px;

      button {
        font-size: 12px;
        line-height: 15px;
        background-color: transparent;

        img {
          transition: all 200ms linear;
          margin-left: 17px;
          transform: ${(props) => (props.$isOpen ? "scale(-1)" : "")};
        }
      }
    }

    .body {
      display: flex;
      position: static;
      gap: 66px;
      transition: all 200ms linear;
      padding: ${(props) => (props.$isOpen ? "5px 23px 41px" : "0 23px")};
      height: ${(props) => (props.$isOpen ? "223px" : "0px")};
      border-top: ${(props) =>
        props.$isOpen ? "1px solid rgba(128, 0, 255, 0.3)" : ""};

      div {
        display: ${(props) => (props.$isOpen ? "" : "none")};
      }
    }
  }

  @media (max-width: 670px) {
    .head {
      button {
        span {
          display: none;
        }
      }
    }
  }

  @media (max-width: 485px) {
    .body {
      height: ${(props) => (props.$isOpen ? "240px" : "0px")};
    }
  }
`;

export default FilterMenu;