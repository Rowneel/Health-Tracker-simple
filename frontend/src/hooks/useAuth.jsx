import { useContext, useDebugValue } from "react";
import AuthContext from "../provider/authProvider";

const useAuth = () => {
    const context = useContext(AuthContext);
    useDebugValue(context.auth, auth => auth?.email ? "Logged In" : "Logged Out")
    return context;
}

export default useAuth;