import ReactDOM from 'react-dom/client'
import './index.css'
import App from './app/app'
import {createBrowserRouter, RouterProvider} from "react-router";
import {GetModules} from "./entities/framework/moduleDefinition.ts";
import ScheduleManager from "./applets/schedule/schedule-manager.tsx";

const routes = GetModules()
    .map(module => ({
        path: module.navLink, 
        Component: module.module,
        loader: () => module,
        id: module.name,
    }));

routes.push({
    path: "/",
    Component:() => (<ScheduleManager/>),
    loader: () => GetModules().find(x => x.name === 'Schedules'),
    id: "_default"
})

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


