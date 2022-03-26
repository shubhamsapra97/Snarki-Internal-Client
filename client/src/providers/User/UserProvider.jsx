import React, {createContext} from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({value, children}) => (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
);
