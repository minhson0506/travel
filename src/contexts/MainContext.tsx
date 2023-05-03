import {createContext, useContext} from "react";

export type ContextType = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const MainContext = createContext<ContextType>({
    token: null,
    setToken: () => {},
    page: 0,
    setPage: () => {}
});

export const useMainContext = () => useContext(MainContext);