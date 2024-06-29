import { createContext, useState } from 'react';

const FamilyContext = createContext();

const FamilyProvider = ({ children }) => {
    const [familyData, setFamilyData] = useState({
        children: [],
        spouse: {},
        father: {},
        mother: {},
        siblings: []
    });

    return (
        <FamilyContext.Provider value={{ familyData, setFamilyData }}>
            {children}
        </FamilyContext.Provider>
    );
};

export { FamilyContext, FamilyProvider };
