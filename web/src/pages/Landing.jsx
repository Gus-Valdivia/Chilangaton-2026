import { useState, useEffect } from "react";
import { CATEGORIAS, ALCALDIAS } from "../utils/constants.js";
import { fetchLocals } from "../api/establecimiento.js";
import { verifyTokenReq } from "../api/vendedor.js"; // Asumiendo tu auth con axios
import { MapPanel } from "../components/MapPanel";
import { Button, Input, Select } from "../components/UI";
import {
    BusinessList,
    BusinessDetail,
    AuthForm,
    MyBusinessForm,
} from "../components/Views";

export default function Landing() {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [negocios, setNegocios] = useState([]);
    const [mio, setMio] = useState(null);

    const [vista, setVista] = useState("lista");
    const [sel, setSel] = useState(null);
    const [msg, setMsg] = useState("");

    const [q, setQ] = useState("");
    const [cat, setCat] = useState("");
    const [alc, setAlc] = useState("");
    const [solo, setSolo] = useState(false);

    useEffect(() => {
        const loadLocals = async () => {
            try {
                const { data } = await fetchLocals();
                setNegocios(data);
            } catch (error) {
                setMsg("Error cargando establecimientos.");
            }
        };
        loadLocals();
    }, []);

    const changeView = async (v) => {
        setVista(v);
        setSel(null);
        setMsg("");
        if (v === "mio") {
            try {
                const { data } = await verifyTokenReq(); // endpoint que trae req.user / su negocio
                setMio(data.negocio || {});
            } catch (error) {
                setMio({});
            }
        }
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
        changeView("lista");
    };

    const filteredNegocios = negocios?.lenght
        ? negocios?.filter((n) => {
              const matchQ =
                  !q ||
                  (n.nombre + " " + n.tianguis)
                      .toLowerCase()
                      .includes(q.toLowerCase());
              const matchCat = !cat || n.Categoria === cat;
              const matchAlc = !alc || n.alcaldia === alc;
              return matchQ && matchCat && matchAlc;
          })
        : [];

    return (
        <div className="flex flex-col md:flex-row-reverse min-h-screen bg-[#F8F6FB] text-[#241A2D] font-sans">
            <MapPanel vista={vista} sel={sel} negocios={filteredNegocios} />

            <div className="w-full md:w-1/2 flex flex-col min-w-0">
                <h1 className="flex items-center gap-3 m-0 py-3 px-4 bg-[#4B0082] border-b-4 border-[#D6007A] text-white font-bold text-2xl font-serif before:content-[''] before:shrink-0 before:w-7 before:h-7 before:border-[3px] before:border-white before:rounded-full before:bg-[#A83278]">
                    Mercadopolis
                </h1>

                <div className="flex-1 p-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                        <Button
                            active={vista === "lista"}
                            onClick={() => changeView("lista")}
                        >
                            Negocios
                        </Button>
                        <Button
                            active={vista !== "lista"}
                            onClick={() => changeView(token ? "mio" : "auth")}
                        >
                            {token ? "Mi negocio" : "Soy vendedor"}
                        </Button>
                        {token && <Button onClick={handleLogout}>Salir</Button>}
                    </div>

                    {msg && (
                        <div
                            role="status"
                            className="mb-3 py-3 px-4 border-2 border-[#E4DCEB] border-l-6 border-l-[#8F00FF] rounded-xl bg-white text-[#241A2D]"
                        >
                            {msg}
                        </div>
                    )}

                    {vista === "auth" && (
                        <AuthForm
                            setMsg={setMsg}
                            onAuthSuccess={(t) => {
                                setToken(t);
                                localStorage.setItem("token", t);
                                changeView("mio");
                            }}
                        />
                    )}

                    {vista === "mio" && (
                        <MyBusinessForm
                            mio={mio}
                            token={token}
                            setMsg={setMsg}
                            onSaveSuccess={async () => {
                                const { data } = await fetchLocals();
                                setNegocios(data);
                            }}
                        />
                    )}

                    {vista === "lista" && sel && (
                        <BusinessDetail
                            negocio={sel}
                            onBack={() => setSel(null)}
                        />
                    )}

                    {vista === "lista" && !sel && (
                        <>
                            <Input
                                placeholder="Buscar negocio o tianguis"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                            <Select
                                options={CATEGORIAS}
                                placeholder="Todas las categorías"
                                value={cat}
                                onChange={(e) => setCat(e.target.value)}
                            />
                            <Select
                                options={ALCALDIAS}
                                placeholder="Todas las alcaldías"
                                value={alc}
                                onChange={(e) => setAlc(e.target.value)}
                            />
                            <label className="flex items-center gap-3 min-h-[2.75rem] cursor-pointer mb-3">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 m-0 accent-[#8F00FF]"
                                    checked={solo}
                                    onChange={(e) => setSolo(e.target.checked)}
                                />
                                Solo abiertos ahora
                            </label>

                            <BusinessList
                                negocios={filteredNegocios}
                                onSelect={setSel}
                            />
                        </>
                    )}
                </div>

                <footer className="mt-6 py-6 px-4 pb-20 bg-[#4B0082] border-t-4 border-[#D6007A] text-white">
                    <h3 className="m-0 mb-1 text-white font-bold text-lg font-serif">
                        Gracias por apoyar a los comerciantes mexicanos
                    </h3>
                    <h4 className="m-0 text-[#E4DCEB] font-normal text-base">
                        Con el apoyo de todos podemos progresar para un mejor
                        futuro
                    </h4>
                </footer>
            </div>

            <button
                onClick={() => alert("espuro adorno mamon")}
                className="fixed right-4 bottom-4 z-50 flex items-center gap-2 min-h-[3rem] px-4 border-2 border-white rounded-full bg-[#8F00FF] text-white font-bold shadow-[0_8px_24px_rgb(36_26_45/0.18)] cursor-pointer transition-colors hover:bg-[#6b00bf] hover:border-white hover:text-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#4B0082]"
            >
                <svg
                    aria-hidden="true"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Chadbot
            </button>
        </div>
    );
}
