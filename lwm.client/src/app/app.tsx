import React, {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import './app.css';
import AuthService from "../services/network/authentication/authService";
import LoginSplash from "./authentication/login-spash/login-splash";
import ModuleLoader from "./modulePanel/module-loader.tsx";
import MenuBar from "./menuBar/menu-bar.tsx";

interface Props {}

 const App: React.FunctionComponent<Props> = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthService.isLoggedIn());
    
    
    addEventListener("app-logout", handleLogout, true);
    function onLoginComplete() {
        setIsAuthenticated(true);
    }

    function handleLogout() {
        AuthService.Logout();
        setIsAuthenticated(false);
    }
    
    const queryClient = new QueryClient();

     if (isAuthenticated) {
         return (
             <QueryClientProvider client={queryClient}>
                 <div className="appOuterContainer">
                     <MenuBar/>
                     <ModuleLoader/>
                </div>
             </QueryClientProvider>);
     }

     return (
         <div className="appOuterContainer-login-spalsh">
             <LoginSplash onLoginSuccsess={onLoginComplete}/>
         </div>);
}
export default App;