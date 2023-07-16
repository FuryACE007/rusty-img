import { invoke } from "@tauri-apps/api";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Crop = () => {
  const cardStyle =
    "bg-[#16181d] shadow-2xl border-[#664eae] hover:border-[#8247E5] transition duration-500 border-2 md:mx-20 mx-5 my-8 rounded-3xl min-h-[10rem] pb-5 ";

  const [inputFile, setInputFile] = useState("");
  const [x, setX] = useState(10);
  const [y, setY] = useState(20);
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(100);

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    setInputFile(file);
  };

  const handleXChange = (event) => {
    setX(parseInt(event.target.value));
  };
  const handleYChange = (event) => {
    setY(parseInt(event.target.value));
  };
  const handleWidthChange = (event) => {
    setWidth(parseInt(event.target.value));
  };
  const handleHeightChange = (event) => {
    setHeight(parseInt(event.target.value));
  };

  const handleCrop = async () => {
    if (!inputFile) {
      toast.info("No input file selected");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const base64Data = fileReader.result.split(",")[1]; // Extract the base64-encoded data
      const response = await invoke("crop", {
        infile: base64Data,
        x: x,
        y: y,
        width: width,
        height: height,
      });

      if (response) {
        toast.success("Image cropped successfully");
      } else {
        toast.error("Failed to crop the image");
      }
    };
    fileReader.readAsDataURL(inputFile); // Read the file as a data URL
  };
  return (
    <div className={cardStyle}>
      <h3 className=" border-b-2 border-slate-600 bg-[#23272f] py-3 mb-4 rounded-t-3xl">
        Crop Image
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
        <label htmlFor="X" className="mx-3">
          X :
        </label>
        <input
          type="number"
          id="X"
          value={x}
          onChange={handleXChange}
          className=" text-slate-800 rounded-lg px-4 my-2 text-center"
        />
      </div>
      <div>
        <label htmlFor="Y" className="mx-3">
          Y :
        </label>
        <input
          type="number"
          id="Y"
          value={y}
          onChange={handleYChange}
          className=" text-slate-800 rounded-lg px-4 my-2 text-center"
        />
      </div>
      <div>
        <label htmlFor="width" className="mx-3">
          Width :
        </label>
        <input
          type="number"
          id="width"
          value={width}
          onChange={handleWidthChange}
          className=" text-slate-800 rounded-lg px-4 my-2 text-center"
        />
      </div>
      <div>
        <label htmlFor="height" className="mx-3">
          Height :
        </label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={handleHeightChange}
          className=" text-slate-800 rounded-lg px-4 my-2 text-center"
        />
      </div>
      <button
        onClick={handleCrop}
        className=" py-2 px-3 mt-7 bg-[#8247E5] hover:bg-[#664eae] transition ease-linear rounded-lg"
      >
        Crop Image
      </button>
    </div>
  );
};

export default Crop;
