import Blur from "./components/Blur";
import Brighten from "./components/Brighten";
import Crop from "./components/Crop";
import Invert from "./components/Invert";
import Rotate from "./components/Rotate";

function App() {
  const cardGridCommonStyle =
    "flex-col text-slate-100 font-semibold  uppercase items-center min-h-full bg-[#1D232A]";
  return (
    <div className="flex">
      <div className="flex-col w-screen mx-auto text-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#F8F1F1] mt-7 uppercase">
            <span className="text-[#8247E5] bg-[#F8F1F1] px-2 py-1 rounded-tl-lg">
              Rusty{" "}
            </span>
            <span className="text-[#F8F1F1] bg-[#8247E5] font-bold border-2 border-[#8247E5] px-2 py-1 rounded-r-xl">
              IMG
            </span>
          </h1>
          <h3 className="text-lg text-slate-300 font-medium my-7 uppercase">
            Select from the below options:
          </h3>
        </div>
        <div className={cardGridCommonStyle}>
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
            <Blur />
            <Brighten />
            <Crop />
            <Rotate />
            <Invert />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
