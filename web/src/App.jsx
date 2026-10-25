import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VendedorProvider } from "./context/VendedorContext";

import Landing from "./pages/Landing";

function App() {
    return (
        <VendedorProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                </Routes>
            </BrowserRouter>
        </VendedorProvider>
    );
}

export default App;
