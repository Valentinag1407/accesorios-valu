export const Input = ({
  label,
  placeholder,
  Icon,
  type = "text",
  value,
  onChange,
  required,
}) => {
  return (
    <div className="relative w-full flex flex-col gap-1">
      <label
        htmlFor="email"
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
          className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-md outline-none shadow-sm focus:ring-1 focus:ring-gray-900 transition duration-300"
        />
      </div>
    </div>
  );
};
