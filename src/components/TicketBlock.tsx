import styled from "styled-components";
import { FunctionComponent, useEffect, useState } from "react";
import { ITicket } from "../types/index";

interface IProps {
    ticket: ITicket
}

const TicketBlock: FunctionComponent<IProps> = ({ticket}): JSX.Element => {
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);

    useEffect(() => {
        (function () {
            setHours(Math.floor(ticket.duration / 60));
            setMinutes(ticket.duration % 60)
        })();
    }, [ticket.duration]);

    return(
        <TicketBlockStyle>
            <div className="header">
                <p>{ticket.price} Р</p>
                <div className="aircompany">
                    <img src={`./icons/${ticket.company}.png`} alt="aircompany_logo" />
                </div>
            </div>
            <ul className="body">
                <li>
                    <p>{ticket.from} - {ticket.to}</p>
                    <p>{ticket.time.startTime} - {ticket.time.endTime}</p>
                </li>
                <li>
                    <p>В пути</p>
                    <p>{`${hours} ч ${minutes} мин`}</p>
                </li>
                <li>
                    <p>Пересадки</p>
                    <p>
                        {
                            !ticket.connectionAmount
                             ? "Без пересадок" 
                             : ticket.connectionAmount === 1 
                             ? "1 пересадка" 
                             : `${ticket.connectionAmount} пересадки`
                        }
                    </p>
                </li>
                <li>
                    <p>Дата</p>
                    <p>{ticket.date}</p>
                </li>
            </ul>
        </TicketBlockStyle>
    )
}

const TicketBlockStyle = styled.li`
    max-width: 727px;
    padding: 38px 40px 25px;
    border-radius: 10px;
    background: rgb(232, 235, 242);
    list-style-type: none;

    .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    height: 50px;

    p {
      font-size: 32px;
      font-weight: 700;        
    }

    .aircompany {
        max-width: 180px;

        img {
            object-fit: cover;
        }
    }
}

.body {
    display: flex;
    justify-content: space-between;
    font-size: 16px;

    p:first-child {
      color: rgb(133, 138, 227);
      line-height: 19px;
      margin-bottom: 9px;
    }
    
    li {
    list-style-type: none;
}
}   

@media (max-width: 810px) {
    padding: 30px 23px 25px;
  }

  @media (max-width: 500px) {
    .body {
      flex-wrap: wrap;
      gap: 20px;
      li {
        width: calc(50% - 10px);
      }
    }
  }

`;

export default TicketBlock;