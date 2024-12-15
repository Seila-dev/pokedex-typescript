import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./MainPage";
import { Page } from "./Page";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/pokemon/:id' element={<Page />} />
        </Routes>
    </BrowserRouter>
);

export { AppRoutes }