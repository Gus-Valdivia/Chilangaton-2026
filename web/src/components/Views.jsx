import { useState } from "react";
import { Card, Badge, Chip, Button, Input, Select } from "./UI";
import {
    CATEGORIAS,
    ALCALDIAS,
    PAGOS,
    CORTO,
    money,
    getMapsUrl,
    apiFetch,
    API,
} from "../utils/constants";

export const BusinessList = ({ negocios, onSelect }) => (
    <div>
        {negocios?.length === 0 ? (
            <p className="text-[#62586B]">No hay negocios con ese filtro.</p>
        ) : null}
        {negocios?.map((n) => (
            <Card key={n.id} clickable onClick={() => onSelect(n)}>
                <h3 className="m-0 mb-1 text-[#4B0082] font-serif font-bold text-lg leading-tight">
                    {n.nombre}
                </h3>
                <div className="text-[#62586B] text-sm mt-2">
                    {n.Categoria} · {n.alcaldia} ·{" "}
                    {n.registrado ? "Registrado" : "Sin registrar"}
                </div>
                <Badge negocio={n} />
                <div className="text-[#62586B] text-sm mt-2">
                    Tianguis: {n.tianguis}
                </div>
                <div className="mt-2">
                    {n.pagos?.length ? (
                        n.pagos.map((p) => <Chip key={p} text={p} />)
                    ) : (
                        <span className="text-[#62586B] text-sm">
                            No especificado
                        </span>
                    )}
                </div>
            </Card>
        ))}
    </div>
);

export const BusinessDetail = ({ negocio: n, onBack }) => (
    <div>
        <Button onClick={onBack}>Volver</Button>
        <Card className="mt-3">
            <h3 className="m-0 mb-1 text-[#4B0082] font-serif font-bold text-lg leading-tight">
                {n.nombre}
            </h3>
            <div className="text-[#62586B] text-sm mt-2">
                {n.Categoria} · {n.alcaldia} ·{" "}
                {n.registrado ? "Registrado" : "Sin registrar"}
            </div>
            <Badge negocio={n} />
            <p className="mt-2 mb-2">
                Tianguis: <b className="text-[#4B0082]">{n.tianguis}</b>
            </p>
            <a
                href={getMapsUrl(n)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[2.75rem] px-4 py-2 mt-2 border-2 border-[#8F00FF] rounded-xl bg-white text-[#8F00FF] font-bold text-center no-underline transition-colors hover:bg-[color-mix(in_srgb,#8F00FF_10%,#fff)] hover:border-[#6b00bf] hover:text-[#6b00bf]"
            >
                Ver en Google Maps
            </a>
        </Card>
        <Card>
            <h2 className="text-xl text-[#4B0082] m-0 mb-1 leading-tight">
                Horario
            </h2>
            <div className="mt-2">
                {n.horario?.length ? (
                    n.horario.map((h, i) => (
                        <div
                            key={i}
                            className={`flex justify-between gap-3 py-2 ${i > 0 ? "border-t border-[#E4DCEB]" : ""}`}
                        >
                            <span>
                                {h.dias.map((d) => CORTO[d]).join(", ")}
                            </span>
                            <span>
                                {h.llegada} a {h.salida}
                            </span>
                        </div>
                    ))
                ) : (
                    <span className="text-[#62586B] text-sm">Sin horario</span>
                )}
            </div>
        </Card>
        <Card>
            <h2 className="text-xl text-[#4B0082] m-0 mb-1 leading-tight">
                Productos
            </h2>
            <div className="mt-2">
                {n.productos?.length ? (
                    n.productos.map((p, i) => (
                        <div
                            key={i}
                            className={`flex justify-between gap-3 py-2 ${i > 0 ? "border-t border-[#E4DCEB]" : ""}`}
                        >
                            <span>{p.nombre}</span>
                            <b className="text-[#4B0082]">{money(p.precio)}</b>
                        </div>
                    ))
                ) : (
                    <span className="text-[#62586B] text-sm">
                        Sin productos
                    </span>
                )}
            </div>
        </Card>
        <Card>
            <h2 className="text-xl text-[#4B0082] m-0 mb-1 leading-tight">
                Formas de pago
            </h2>
            <div className="mt-2">
                {n.pagos?.length ? (
                    n.pagos.map((p) => <Chip key={p} text={p} />)
                ) : (
                    <span className="text-[#62586B] text-sm">
                        No especificado
                    </span>
                )}
            </div>
        </Card>
    </div>
);

export const AuthForm = ({ onAuthSuccess, setMsg }) => {
    const [isReg, setIsReg] = useState(false);
    const [form, setForm] = useState({ correo: "", password: "", nombre: "" });

    const handleSubmit = async () => {
        if (!API)
            return setMsg("Configura la constante API para usar cuentas.");
        try {
            const body = isReg
                ? form
                : { correo: form.correo, password: form.password };
            const r = await apiFetch(isReg ? "/auth/registro" : "/auth/login", {
                method: "POST",
                body: JSON.stringify(body),
            });
            onAuthSuccess(r.token);
        } catch (e) {
            setMsg(e.message);
        }
    };

    return (
        <Card>
            <h2 className="text-xl text-[#4B0082] m-0 mb-3 leading-tight">
                {isReg ? "Crear cuenta de vendedor" : "Entrar como vendedor"}
            </h2>
            {isReg && (
                <Input
                    placeholder="Nombre del negocio"
                    value={form.nombre}
                    onChange={(e) =>
                        setForm({ ...form, nombre: e.target.value })
                    }
                />
            )}
            <Input
                type="email"
                placeholder="Correo"
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
            />
            <Input
                type="password"
                placeholder="Contraseña (mínimo 8 caracteres)"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <div className="flex gap-2 mt-2">
                <Button primary onClick={handleSubmit}>
                    {isReg ? "Registrarme" : "Entrar"}
                </Button>
                <Button onClick={() => setIsReg(!isReg)}>
                    {isReg ? "Ya tengo cuenta" : "No tengo cuenta"}
                </Button>
            </div>
        </Card>
    );
};

export const MyBusinessForm = ({ mio, setMsg, token, onSaveSuccess }) => {
    const [form, setForm] = useState(
        mio || {
            nombre: "",
            Categoria: "",
            alcaldia: "",
            tianguis: "",
            maps: "",
            pagos: [],
        },
    );

    const handlePago = (p) => {
        const pagos = form.pagos.includes(p)
            ? form.pagos.filter((x) => x !== p)
            : [...form.pagos, p];
        setForm({ ...form, pagos });
    };

    const handleSave = async () => {
        if (!form.nombre) return setMsg("Pon el nombre del negocio.");
        if (!API) return setMsg("Configura la constante API para guardar.");
        try {
            await apiFetch(
                "/negocios/mio",
                { method: "PUT", body: JSON.stringify(form) },
                token,
            );
            onSaveSuccess();
            setMsg("Guardado.");
        } catch (e) {
            setMsg(e.message);
        }
    };

    if (!mio) return <p className="text-[#62586B]">Cargando...</p>;

    return (
        <Card>
            <h2 className="text-xl text-[#4B0082] m-0 mb-3 leading-tight">
                Mi negocio
            </h2>
            <Input
                placeholder="Nombre del negocio"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            <Select
                options={CATEGORIAS}
                placeholder="Categoría"
                value={form.Categoria}
                onChange={(e) =>
                    setForm({ ...form, Categoria: e.target.value })
                }
            />
            <Select
                options={ALCALDIAS}
                placeholder="Alcaldía"
                value={form.alcaldia}
                onChange={(e) => setForm({ ...form, alcaldia: e.target.value })}
            />
            <Input
                placeholder="Tianguis y dirección"
                value={form.tianguis}
                onChange={(e) => setForm({ ...form, tianguis: e.target.value })}
            />
            <Input
                placeholder="Link de Google Maps (opcional)"
                value={form.maps}
                onChange={(e) => setForm({ ...form, maps: e.target.value })}
            />
            <div className="mt-2 mb-4">
                {PAGOS.map((p) => (
                    <label
                        key={p}
                        className="flex items-center gap-3 min-h-[2.75rem] cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            className="w-5 h-5 m-0 accent-[#8F00FF]"
                            checked={form.pagos.includes(p)}
                            onChange={() => handlePago(p)}
                        />{" "}
                        {p}
                    </label>
                ))}
            </div>
            <Button primary onClick={handleSave}>
                Guardar
            </Button>
        </Card>
    );
};
