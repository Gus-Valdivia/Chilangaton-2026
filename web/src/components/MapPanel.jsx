import { API } from "../utils/constants";

export const MapPanel = ({ vista, sel, negocios }) => {
    let content = (
        <p className="text-[#62586B] p-3 text-center">
            Aquí va el pinche mapa culeros.
        </p>
    );

    if (API) {
        let ruta = "";
        if (vista === "lista" && sel && sel.id != null) {
            ruta = `/negocios/${encodeURIComponent(sel.id)}/mapa`;
        } else {
            const ids = negocios?.map((n) => n.id).filter((x) => x != null);
            if (ids.length)
                ruta = `/mapa?ids=${ids.map(encodeURIComponent).join(",")}`;
        }

        if (ruta) {
            content = (
                <img
                    alt="Mapa de negocios"
                    src={`${API}${ruta}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.replaceWith("No se pudo cargar el mapa.");
                    }}
                />
            );
        } else {
            content = (
                <p className="text-[#62586B] p-3 text-center">
                    No hay negocios para mostrar en el mapa.
                </p>
            );
        }
    }

    return (
        <div
            role="region"
            aria-label="Mapa de negocios"
            className="w-full md:w-1/2 h-[40vh] md:h-screen md:sticky top-0 self-start flex items-center justify-center overflow-hidden bg-[#F0EAF7] border-b-4 md:border-b-0 md:border-l-4 border-[#8F00FF]"
        >
            {content}
        </div>
    );
};
