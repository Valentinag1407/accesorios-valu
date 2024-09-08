export const LoadingFullScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-pink-100 bg-opacity-80 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-4 border-pink-500 border-solid rounded-full animate-spin scale-150"></div>
        <p className="mt-6 text-lg text-gray-700 animate-bounce">Loading...</p>
      </div>
    </div>
  );
};
