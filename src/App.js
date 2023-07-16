import { useState } from "react";
import { invoke } from "@tauri-apps/api";

function App() {
  const cardStyle =
    "bg-[#16181d] shadow-2xl border-[#664eae] hover:border-[#8247E5] transition duration-500 border-2 md:mx-20 mx-5 my-8 rounded-3xl min-h-[10rem] pb-5 ";
  const cardGridCommonStyle =
    "flex-col text-slate-100 font-semibold  uppercase items-center min-h-full bg-[#1D232A]";

  const [inputFile, setInputFile] = useState("");
  const [blurAmount, setBlurAmount] = useState(2.0);

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setInputFile(file);
  };

  const handleBlurAmountChange = (event) => {
    setBlurAmount(parseFloat(event.target.value));
  };

  const handleBlur = async () => {
    if (!inputFile) {
      console.log("No input file selected");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const fileData = new Uint8Array(fileReader.result);
      const response = await invoke("blur", {
        infile: Array.from(fileData),
        blurAmt: blurAmount,
      });

      if (response && response.success) {
        console.log("Image blurred successfully");
      } else {
        console.log("Failed to blur image");
      }
    };
    fileReader.readAsArrayBuffer(inputFile);
  };

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
            <div className={cardStyle}>
              <h3 className=" border-b-2 border-slate-600 bg-[#23272f] py-3 mb-4 rounded-t-3xl">
                Blur Image
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
                  <label htmlFor="blurAmount" className="mx-3">
                    Blur Amount:
                  </label>
                  <input
                    type="number"
                    id="blurAmount"
                    value={blurAmount}
                    onChange={handleBlurAmountChange}
                    className=" text-slate-800 rounded-lg px-4 my-2 text-center"
                  />
                </div>
                <button onClick={handleBlur} className=" py-2 px-3 mt-7 bg-[#8247E5] hover:bg-[#664eae] transition ease-linear rounded-lg">Blur Image</button>
            </div>
            <div className={cardStyle}>Brighten</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
