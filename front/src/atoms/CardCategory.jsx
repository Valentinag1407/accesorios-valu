import { useNavigate } from "react-router-dom";

export const CardCategory = ({ img, title, description = "", link }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(link);
  };
  return (
    <div
      className="flex items-center gap-4 flex-col shadow-2xl w-72 rounded-lg hover:bg-red-100 transition duration-300 ease-in-out cursor-pointer px-2 py-4 h-auto"
      onClick={handleClick}
    >
      <h3 className="text-3xl font-semibold">{title}</h3>
      <img src={img} className=" w-full rounded" />
      <p className=" text-xl text-left px-5">{description}</p>
    </div>
  );
};
