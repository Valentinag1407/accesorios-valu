export const CardCategory = ({ img, title, description = "" }) => {
  return (
    <div className="flex items-center gap-4 flex-col shadow-2xl w-72 rounded-lg hover:bg-red-100 transition duration-300 ease-in-out cursor-pointer px-2 py-4 h-auto">
      <h3 className="text-3xl font-bold">{title}</h3>
      <img src={img} className=" w-full rounded" />
      <p className=" text-xl text-left px-5">{description}</p>
    </div>
  );
};
