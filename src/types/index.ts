export interface ITicketTime {
    startTime: string;
    endTime: string;
  }

export interface ITicket {
    id: number;
    from: string;
    to: string;
    company: string;
    price: number;
    currency: "RUB";
    time: ITicketTime;
    duration: number;
    date: string;
    connectionAmount: number | null;
  }

  interface IMeta {
    current_page: number;
    per_page: number;
    remaining_count: number;
    total_items: number;
    total_pages: number;
  }

  export interface IData {
    items: ITicket[];
    meta: IMeta;
  }
  
  export interface IParams {
    limit: number;
    sortBy: string;
    companyFilterParams: string;
    transferFilterParams: string;
  }

  export interface IItem {
    value: string;
    label: string;
  }
  
  export interface FilterOption {
    name: string;
    checked: boolean;
  }

  export interface IOptions {
    [key: string]: boolean;
  }
  
  export type ISortOptions = "price" | "duration" | "connectionAmount";
  
  export interface ISort {
    value: ISortOptions;
    label: string;
  }