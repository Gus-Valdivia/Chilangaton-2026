import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

export const MapPanel = ({ vista, sel, negocios }) => {
    // Centro por defecto: CDMX
    const defaultCenter = [19.4326, -99.1332];

    // Si hay un seleccionado con coordenadas, centramos ahí
    const center =
        sel && sel.lat && sel.lng ? [sel.lat, sel.lng] : defaultCenter;

    return (
        <div
            role="region"
            aria-label="Mapa de negocios"
            className="w-full md:w-1/2 h-[40vh] md:h-screen md:sticky top-0 self-start flex items-center justify-center bg-[#F0EAF7] border-b-4 md:border-b-0 md:border-l-4 border-[#8F00FF] z-0 relative"
        >
            <MapContainer
                center={center}
                zoom={12}
                className="w-full h-full absolute inset-0 z-0"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {negocios.map((n) => {
                    // Requiere que tu backend mande 'lat' y 'lng'.
                    // Fallback temporal con coordenadas aleatorias cerca del centro para que veas que funciona:
                    const lat = n.lat || 19.4326 + (Math.random() - 0.5) * 0.1;
                    const lng = n.lng || -99.1332 + (Math.random() - 0.5) * 0.1;

                    return (
                        <Marker key={n.id} position={[lat, lng]}>
                            <Popup>
                                <strong className="text-[#4B0082]">
                                    {n.nombre}
                                </strong>
                                <br />
                                {n.tianguis}
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};
