import {useQuery} from "@tanstack/react-query"
import RestService from "./RestService";

export function useQueryLwm<t>(key: string, url: string)
{
    
    
    return useQuery({
        queryKey: [key],
        queryFn: () => RestService.GetWithType<t>(url)});
}