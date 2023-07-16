import React, { useState } from "react";
import { invoke } from "@tauri-apps/api";
import { toast } from "react-toastify";

const Brighten = () => {
  const cardStyle =
    "bg-[#16181d] shadow-2xl border-[#664eae] hover:border-[#8247E5] transition duration-500 border-2 md:mx-20 mx-5 my-8 rounded-3xl min-h-[10rem] pb-5 ";

  const [inputFile, setInputFile] = useState("");
  const [brightenValue, setBrightenValue] = useState(5);

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    setInputFile(file);
  };

  const handleBrightenValueChange = (event) => {
    setBrightenValue(parseFloat(event.target.value));
  };

  const handleBrighten = async () => {
    if (!inputFile) {
      toast.info("No input file selected");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const base64Data = fileReader.result.split(",")[1]; // Extract the base64-encoded data
      const response = await invoke("brighten", {
        infile: base64Data,
        brightenValue: brightenValue,
      });

      if (response) {
        toast.success("Image brightened successfully");
      } else {
        toast.error("Failed to brighten the image");
      }
    };
    fileReader.readAsDataURL(inputFile); // Read the file as a data URL
  };

  return (
    <div className={cardStyle}>
      <h3 className=" border-b-2 border-slate-600 bg-[#23272f] py-3 mb-4 rounded-t-3xl">
        Brighten Image
      </h3>
      <div>
        <input
          type="file"
          id="inputFile"
          accept="image/*"
          onChange={handleInputChange}
          className="my-2"
        />
      </div>
      <div>
        <label htmlFor="brightenValue" className="mx-3">
          Brighten Value:
        </label>
        <input
          type="number"
          id="brightenValue"
          value={brightenValue}
          onChange={handleBrightenValueChange}
          className=" text-slate-800 rounded-lg px-4 my-2 text-center"
        />
      </div>
      <button
        onClick={handleBrighten}
        className=" py-2 px-3 mt-7 bg-[#8247E5] hover:bg-[#664eae] transition ease-linear rounded-lg"
      >
        Brighten Image
      </button>
    </div>
  );
};

export default Brighten;
