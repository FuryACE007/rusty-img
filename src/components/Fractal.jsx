import { invoke } from "@tauri-apps/api";
import { useState } from "react";

const Fractal = () => {
  const cardStyle =
    "bg-[#16181d] shadow-2xl border-[#664eae] hover:border-[#8247E5] transition duration-500 border-2 md:mx-20 mx-5 my-8 rounded-3xl min-h-[10rem] pb-5 ";

  const [inputFile, setInputFile] = useState("");

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setInputFile(file);
  };

  const handleFractal = async () => {
    const response = await invoke("fractal");

    if (response && response.success) {
      console.log("Fractal generated successfully");
    } else {
      console.log("Failed to generate the image");
    }
  };
  return (
    <div className={cardStyle}>
      <h3 className=" border-b-2 border-slate-600 bg-[#23272f] py-3 mb-1 rounded-t-3xl">
        Generate Fractal Image
      </h3>
      <button
        onClick={handleFractal}
        className=" py-2 px-3 mt-7 bg-[#8247E5] hover:bg-[#664eae] transition ease-linear rounded-lg"
      >
        Generate Fractal
      </button>
    </div>
  );
};

export default Fractal;
