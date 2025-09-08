import ReactDOM from 'react-dom/client'
import './index.css'
import App from './app/app'
import {createBrowserRouter, RouterProvider} from "react-router";
import {GetModules} from "./entities/framework/moduleDefinition.ts";
import ScheduleManager from "./modules/schedule/schedule-manager.tsx";

const routes = GetModules()
    .map(module => ({
        path: module.navLink, 
        Component: module.module,
        loader: () => module,
        id: module.name,
    }));

const defaultModule = GetModules().find(x => x.isDefault);

if (defaultModule) {
    routes.push({
        path: "/",
        Component:() => (<ScheduleManager/>),
        loader: () => defaultModule,
        id: "_default"
    })
}

let router = createBrowserRouter([
    {
        element: <App></App>,
        children: routes,
    }
]);

const root = document.getElementById("root");

if (root) {
    ReactDOM.createRoot(root).render(
        <RouterProvider router={router} />,
    );
}


