import React, { createContext, useContext, useState, type JSX, type ReactNode } from "react";

type PageConext={
    isFrontend: boolean,
    isGameDev: boolean,
    isModel: boolean,
    isAnimation: boolean,
    setIsFrontend: React.Dispatch<React.SetStateAction<boolean>>,
    setIsGameDev: React.Dispatch<React.SetStateAction<boolean>>,
    setIsModel: React.Dispatch<React.SetStateAction<boolean>>,
    setIsAnimation: React.Dispatch<React.SetStateAction<boolean>>
}
type providerProps={
    children: ReactNode
}
const PageContext = createContext<PageConext | undefined>(undefined);
const PageProvider = ({children}:providerProps): JSX.Element => {

    const [isFrontend, setIsFrontend] = useState<boolean>(true);
    const [isGameDev, setIsGameDev] = useState<boolean>(false);
    const [isModel, setIsModel] = useState<boolean>(false);
    const [isAnimation, setIsAnimation] = useState<boolean>(false);
    return ( 
        <PageContext.Provider value={{isFrontend, isGameDev, isModel, isAnimation, setIsFrontend, setIsGameDev, setIsAnimation, setIsModel}}>
            {children}
        </PageContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePage(){
    const page: PageConext | undefined= useContext(PageContext);
    if(!page) throw new Error("useePage must be used within PageProvider");
    return page;
}
export default PageProvider;