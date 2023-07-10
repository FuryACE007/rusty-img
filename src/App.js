function App() {
  return (
    <div className="flex">
      <div className="flex-col w-screen mx-auto items-center text-center">
        <div className="my-5">
          <h1 className="text-2xl font-semibold text-[#F8F1F1] mt-10 uppercase">
            Image editor with{" "}
            <span className="text-[#8247E5] border-2 border-[#8247E5] px-2 py-1 rounded-xl">
              the power of Rust 🔥
            </span>
          </h1>
          <h3 className="text-lg text-slate-300 font-medium my-10 uppercase">Select from the below options:</h3>
        </div>
        <div className="flex-col items-center min-h-full bg-[#1D232A]">
          <div className="grid grid-cols-2">
            <div className="">
              Blur
            </div>
            <div className="">
              Brighten
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
