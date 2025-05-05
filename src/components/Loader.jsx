const Loader = () => {

  return (
<div className="h-screen">
  <div className="flex flex-col items-center justify-center h-screen space-y-10 px-4">
    <div className="relative w-40 h-40">
      <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2">
        <div
          className="orbit absolute top-1/2 left-1/2 w-6 h-6 bg-white shadow-lg"
          style={{ transformOrigin: '-12px center' }}
        ></div>
        <div
          className="orbit absolute top-1/2 left-1/2 w-6 h-6 bg-pink-400 shadow-lg"
          style={{ transformOrigin: '-12px center', animationDelay: '0.625s' }}
        ></div>
        <div
          className="orbit absolute top-1/2 left-1/2 w-6 h-6 bg-purple-400 shadow-lg"
          style={{ transformOrigin: '-12px center', animationDelay: '1.25s' }}
        ></div>
        <div
          className="orbit absolute top-1/2 left-1/2 w-6 h-6 bg-indigo-400 shadow-lg"
          style={{ transformOrigin: '-12px center', animationDelay: '1.875s' }}
        ></div>
      </div>
    </div>
    <div className="text-white text-4xl text-center font-extrabold tracking-wide font-sans select-none drop-shadow-lg animate-pulse">
      Loading, please wait...
    </div>
    <div className="flex space-x-6">
      <div className="w-5 h-5 bg-white rounded-full pulse-dot shadow-lg"></div>
      <div className="w-5 h-5 bg-white rounded-full pulse-dot shadow-lg"></div>
      <div className="w-5 h-5 bg-white rounded-full pulse-dot shadow-lg"></div>
      <div className="w-5 h-5 bg-white rounded-full pulse-dot shadow-lg"></div>
    </div>
    <div className="text-white text-center text-base font-light max-w-xs select-none drop-shadow-md">
      Preparing your experience. This will only take a moment.
    </div>
  </div>
</div>
  );
};

export default Loader;