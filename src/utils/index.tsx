import { FilterOption } from "../types";

export const getParams = (filterArr: FilterOption[], filterName: string) => {
    let companyFilterParams: string = "";
    filterArr.forEach((option) => 
    {if (option.checked) {
        companyFilterParams += `&${filterName}[]=${option.name}`;
    }})

    return companyFilterParams;
}