import { invoke } from "@tauri-apps/api";
import { useState } from "react";

const Ascii = () => {
  const cardStyle =
    "bg-[#16181d] shadow-2xl border-[#664eae] hover:border-[#8247E5] transition duration-500 border-2 md:mx-20 mx-5 my-8 rounded-3xl min-h-[10rem] pb-5 ";

  const [inputFile, setInputFile] = useState(null);
  const [scale, setScale] = useState(2);

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setInputFile(file);
  };

  const handleScaleChange = (event) => {
    setScale(parseInt(event.target.value));
  };

  const handleAscii = async () => {
    if (!inputFile) {
      console.log("No input file selected");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const base64Data = fileReader.result.split(",")[1]; // Extract the base64-encoded data
      const response = await invoke("ascii_art", {
        dir: base64Data,
        scale: scale, // Set the desired scale value
      });
  
      if (response && response.success) {
        console.log("Image ASCII art created successfully");
        const asciiArt = response.data; // Assuming the response includes the ASCII art as a string
        // Perform any desired action with the ASCII art, such as saving it to a file
        // Here, you can add the code to save the ASCII art to a file, e.g., using the File API
      } else {
        console.log("Failed to create ASCII art from the image");
      }
    };
    fileReader.readAsDataURL(inputFile); // Read the file as a data URL
  };
  

  return (
    <div className={cardStyle}>
      <h3 className=" border-b-2 border-slate-600 bg-[#23272f] py-3 mb-4 rounded-t-3xl">
        Ascii Image
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
        <label htmlFor="scale" className="mx-3">
          Scale:
        </label>
        <input
          type="number"
          id="scale"
          value={scale}
          onChange={handleScaleChange}
          className=" text-slate-800 rounded-lg px-4 my-2 text-center"
        />
      </div>
      <button
        onClick={handleAscii}
        className="py-2 px-3 mt-7 bg-[#8247E5] hover:bg-[#664eae] transition ease-linear rounded-lg"
      >
        Ascii Image
      </button>
    </div>
  );
};

export default Ascii;
