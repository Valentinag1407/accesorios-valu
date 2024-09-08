export const ItemNavbar = ({ Icon, title, link }) => {
  const handleClick = () => {
    if (title === "Logout") {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      window.location.href = link;
    }
  };
  return (
    <div
      className="flex items-center justify-center gap-2 hover:underline py-2 px-3 rounded-md transition cursor-pointer"
      onClick={handleClick}
    >
      <Icon className="text-xl" />
      <p className="text-xl">{title}</p>
    </div>
  );
};
