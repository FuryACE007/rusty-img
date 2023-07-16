import { invoke } from "@tauri-apps/api";
import { useState } from "react";
import { toast } from "react-toastify";

const Invert = () => {
  const cardStyle =
    "bg-[#16181d] shadow-2xl border-[#664eae] hover:border-[#8247E5] transition duration-500 border-2 md:mx-20 mx-5 my-8 rounded-3xl min-h-[10rem] pb-5 ";

  const [inputFile, setInputFile] = useState("");

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    setInputFile(file);
  };

  const handleInvert = async () => {
    if (!inputFile) {
      toast.info("No input file selected");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const base64Data = fileReader.result.split(",")[1]; // Extract the base64-encoded data
      const response = await invoke("invert", {
        infile: base64Data,
      });

      if (response) {
        toast.success("Image inverted successfully");
      } else {
        toast.error("Failed to invert the image");
      }
    };
    fileReader.readAsDataURL(inputFile); // Read the file as a data URL
  };
  return (
    <div className={cardStyle}>
      <h3 className=" border-b-2 border-slate-600 bg-[#23272f] py-3 mb-4 rounded-t-3xl">
        Invert Image
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
      <button
        onClick={handleInvert}
        className=" py-2 px-3 mt-7 bg-[#8247E5] hover:bg-[#664eae] transition ease-linear rounded-lg"
      >
        Invert Image
      </button>
    </div>
  );
};

export default Invert;
