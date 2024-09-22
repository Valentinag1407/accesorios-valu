import { useState } from "react";

export const Input = ({
  label,
  placeholder,
  Icon,
  type = "text",
  value,
  onChange,
  required,
  error = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full flex flex-col gap-1">
      <label
        htmlFor={label}
        className="text-xs font-bold text-gray-400 text-left"
      >
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 bottom-2.5 text-black" size={20} />
        <input
          placeholder={placeholder}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-full h-10 pl-10 pr-3 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md outline-none shadow-sm focus:ring-1 focus:ring-gray-900 transition duration-300`}
        />
        {error && isHovered && (
          <div className="absolute left-0 right-0 mt-1 bg-pink-500 text-white px-2 py-1 z-50 w-fit rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
