import {createContext, useContext} from "react";
import {Profile} from "../interfaces/Profile";

export type ContextType = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    profile: Profile | null;
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}

export const MainContext = createContext<ContextType>({
    token: null,
    setToken: () => {},
    page: 0,
    setPage: () => {},
    profile: null,
    setProfile: () => {}
});

export const useMainContext = () => useContext(MainContext);