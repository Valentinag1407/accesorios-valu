export const CardAbout = ({ Icon, title, description = "" }) => {
  return (
    <div className="flex items-center gap-2 flex-col px-2 py-4 h-auto max-w-96">
      <div className="flex items-center justify-center border-2 border-red-700 w-12 h-12 rounded-full">
        <Icon className="text-red-700" />
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className=" text-lg px-5 text-gray-500 text-center">{description}</p>
    </div>
  );
};
