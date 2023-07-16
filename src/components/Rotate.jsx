import { invoke } from "@tauri-apps/api"
import { useState } from "react"

const Rotate = () => {
    const cardStyle =
    "bg-[#16181d] shadow-2xl border-[#664eae] hover:border-[#8247E5] transition duration-500 border-2 md:mx-20 mx-5 my-8 rounded-3xl min-h-[10rem] pb-5 ";

  const [inputFile, setInputFile] = useState("");
  const [rotationValue, setrRotationValue] = useState(90);

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setInputFile(file);
  };

  const handleRotationValueChange = (event) => {
    setrRotationValue(parseFloat(event.target.value));
  };

  const handleRotate = async () => {
    if (!inputFile) {
      console.log("No input file selected");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const base64Data = fileReader.result.split(",")[1]; // Extract the base64-encoded data
      const response = await invoke("rotate", {
        infile: base64Data,
        rotationValue: rotationValue,
      });

      if (response && response.success) {
        console.log("Image rotated successfully");
      } else {
        console.log("Failed to rotate the image");
      }
    };
    fileReader.readAsDataURL(inputFile); // Read the file as a data URL
  };
  return (
    <div className={cardStyle}>
      <h3 className=" border-b-2 border-slate-600 bg-[#23272f] py-3 mb-4 rounded-t-3xl">
        Rotate Image
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
        <label htmlFor="rotationValue" className="mx-3">
          Roatation Value: <br/>
          <span className="text-sm text-slate-300">90, 180, 270</span>
        </label>
        <input
          type="number"
          id="rotationValue"
          value={rotationValue}
          onChange={handleRotationValueChange}
          className=" text-slate-800 rounded-lg px-4 my-2 text-center"
        />
      </div>
      <button
        onClick={handleRotate}
        className=" py-2 px-3 mt-7 bg-[#8247E5] hover:bg-[#664eae] transition ease-linear rounded-lg"
      >
        Rotate Image
      </button>
    </div>
  )
}

export default Rotate