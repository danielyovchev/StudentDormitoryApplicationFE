import { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {}


AuthContext.displayName = 'AuthContext';
export default AuthContext;