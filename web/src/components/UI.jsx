import { getEstado } from "../utils/constants";

export const Button = ({ primary, active, className = "", ...props }) => (
    <button
        className={`inline-flex items-center justify-center gap-2 min-h-[2.75rem] px-4 py-2 border-2 rounded-xl font-bold leading-tight text-center cursor-pointer transition-all duration-120 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#8F00FF] focus-visible:outline-offset-2
    ${
        primary
            ? "bg-[#8F00FF] border-[#8F00FF] text-white hover:bg-[#6b00bf] hover:border-[#6b00bf] active:bg-[color-mix(in_srgb,#8F00FF_70%,#000)]"
            : active
              ? "bg-[#4B0082] border-[#4B0082] text-white shadow-[inset_0_-4px_0_#F06FAE]"
              : "bg-white border-[#8F00FF] text-[#8F00FF] hover:bg-[color-mix(in_srgb,#8F00FF_10%,#fff)] hover:border-[color-mix(in_srgb,#8F00FF_85%,#000)] hover:text-[color-mix(in_srgb,#8F00FF_85%,#000)] active:bg-[color-mix(in_srgb,#8F00FF_20%,#fff)]"
    } ${className}`}
        {...props}
    />
);

export const Input = (props) => (
    <input
        className="block w-full min-h-[2.75rem] mb-2 px-3 py-2 border-2 border-[#7A6F85] rounded-xl bg-white text-[#241A2D] placeholder-[#62586B] hover:border-[#4B0082] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#8F00FF] focus-visible:outline-offset-2 transition-colors"
        {...props}
    />
);

export const Select = ({ options, placeholder, ...props }) => (
    <select
        className="block w-full min-h-[2.75rem] mb-2 px-3 py-2 border-2 border-[#7A6F85] rounded-xl bg-white text-[#241A2D] hover:border-[#4B0082] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#8F00FF] focus-visible:outline-offset-2 transition-colors"
        {...props}
    >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
            <option key={opt} value={opt}>
                {opt}
            </option>
        ))}
    </select>
);

export const Card = ({ children, clickable, onClick }) => (
    <div
        onClick={onClick}
        className={`mb-3 p-4 border-2 border-[#E4DCEB] rounded-2xl bg-white shadow-[0_1px_2px_rgb(36_26_45/0.08)] transition-all duration-120 ${clickable ? "cursor-pointer hover:border-[#8F00FF] hover:shadow-[0_3px_10px_rgb(36_26_45/0.16)]" : ""}`}
    >
        {children}
    </div>
);

export const Badge = ({ negocio }) => {
    const e = getEstado(negocio);
    return (
        <div className="mt-2">
            <span
                className={`inline-flex items-center min-h-[1.75rem] px-3 border-2 rounded-full text-sm font-bold ${e.open ? "bg-[color-mix(in_srgb,#287A52_8%,#fff)] border-[#287A52] text-[#287A52]" : "bg-[#F0EAF7] border-[#7A6F85] text-[#62586B]"}`}
            >
                {e.open ? "ABIERTO" : "CERRADO"}
            </span>
            <span className="text-[#62586B] text-sm ml-2">({e.txt})</span>
        </div>
    );
};

export const Chip = ({ text }) => (
    <span className="inline-flex items-center min-h-[1.75rem] mr-1 mb-1 px-3 rounded-full bg-[color-mix(in_srgb,#8F00FF_10%,#fff)] text-[#4B0082] text-sm font-bold">
        {text}
    </span>
);
