export const API = "";

export const ALCALDIAS = [
    "Álvaro Obregón",
    "Azcapotzalco",
    "Benito Juárez",
    "Coyoacán",
    "Cuajimalpa de Morelos",
    "Cuauhtémoc",
    "Gustavo A. Madero",
    "Iztacalco",
    "Iztapalapa",
    "La Magdalena Contreras",
    "Miguel Hidalgo",
    "Milpa Alta",
    "Tláhuac",
    "Tlalpan",
    "Venustiano Carranza",
    "Xochimilco",
];
export const CATEGORIAS = [
    "Alimentos",
    "Florería/Plantas",
    "Ropa",
    "Accesorios/Moda",
    "Papelería",
    "Tecnología",
    "Artesanías",
    "Música",
    "Chácharas",
];
export const PAGOS = [
    "Efectivo",
    "Tarjeta",
    "Transferencia",
    "Mercado Pago",
    "Criptos",
];
export const DIAS = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
];
export const CORTO = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export const INITIAL_NEGOCIOS = [
    {
        id: 1,
        nombre: "Tacos Mr Uriel",
        registrado: true,
        Categoria: "Alimentos",
        alcaldia: "Cuauhtémoc",
        tianguis: "Tianguis del Domingo, Av. Reforma",
        maps: "",
        pagos: ["Efectivo", "Criptos"],
        horario: [{ dias: [0, 6], llegada: "07:00", salida: "15:00" }],
        productos: [
            { nombre: "Taco de pastor", precio: 150 },
            { nombre: "Agua de horchata el Vic", precio: 200 },
        ],
    },
    {
        id: 2,
        nombre: "Frutas y Verduras Don Rocky",
        registrado: false,
        Categoria: "Alimentos",
        alcaldia: "Coyoacán",
        tianguis: "Tianguis de los Miércoles, Col. Centro",
        maps: "",
        pagos: ["Efectivo", "Tarjeta", "Mercado Pago", "Organos", "Criptos"],
        horario: [{ dias: [3, 5], llegada: "06:00", salida: "14:00" }],
        productos: [
            { nombre: "El tripi", precio: 22 },
            { nombre: "Aguacate (kg)", precio: 65 },
        ],
    },
];

export const money = (n) => "$" + Number(n).toLocaleString("es-MX");
export const min = (t) => {
    const [h, m] = t.split(":");
    return +h * 60 + +m;
};

export const getEstado = (n) => {
    const hor = n.horario || [],
        now = new Date(),
        d = now.getDay(),
        m = now.getHours() * 60 + now.getMinutes();
    for (const h of hor)
        if (h.dias.includes(d) && min(h.llegada) <= m && m < min(h.salida))
            return { open: true, txt: "cierra a las " + h.salida };
    for (let off = 0; off <= 7; off++) {
        const dd = (d + off) % 7;
        let best = null;
        for (const h of hor)
            if (
                h.dias.includes(dd) &&
                (off > 0 || min(h.llegada) > m) &&
                (!best || min(h.llegada) < min(best.llegada))
            )
                best = h;
        if (best)
            return {
                open: false,
                txt:
                    "abre " +
                    (off === 0 ? "hoy" : off === 1 ? "mañana" : DIAS[dd]) +
                    " a las " +
                    best.llegada,
            };
    }
    return { open: false, txt: "sin horario" };
};

export const getMapsUrl = (n) =>
    /^https?:\/\//i.test(n.maps || "")
        ? n.maps
        : "https://www.google.com/maps/search/?api=1&query=" +
          encodeURIComponent(n.tianguis || "");

export const apiFetch = async (ruta, op = {}, token = null) => {
    const r = await fetch(API + ruta, {
        ...op,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: "Bearer " + token } : {}),
            ...(op.headers || {}),
        },
    });
    if (!r.ok) {
        let m = "Error " + r.status;
        try {
            m = (await r.json()).error || m;
        } catch (e) {}
        throw new Error(m);
    }
    return r.json();
};
