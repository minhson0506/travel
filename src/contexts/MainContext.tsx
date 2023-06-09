import { createContext, useContext } from 'react';
import { Profile } from '../interfaces/Profile';
import { User } from '../interfaces/User';

export type ContextType = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    profile: Profile | null;
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
    state: number;
    setState: React.Dispatch<React.SetStateAction<number>>;
};

export const MainContext = createContext<ContextType>({
    token: null,
    setToken: () => {},
    page: 0,
    setPage: () => {},
    profile: null,
    setProfile: () => {},
    state: 0,
    setState: () => {},
});

export const useMainContext = () => useContext(MainContext);
