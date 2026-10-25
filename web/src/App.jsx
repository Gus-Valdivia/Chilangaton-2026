import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VendedorProvider } from "./context/VendedorContext";

function App() {
    return (
        <VendedorProvider>
            <BrowserRouter>
                <Routes>
                    <Route />
                </Routes>
            </BrowserRouter>
        </VendedorProvider>
    );
}

export default App;
