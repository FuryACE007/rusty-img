import { useState } from "react";
import { invoke } from '@tauri-apps/api'

function App() {
  const cardStyle = "bg-slate-50 mx-5 my-8 rounded-3xl min-h-[10rem] py-5 ";
  const cardGridCommonStyle = "flex-col text-slate-900 font-semibold  uppercase items-center min-h-full bg-[#1D232A]";
  
  const [inputFile, setInputFile] = useState('');
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
      console.log('No input file selected');
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const fileData = new Uint8Array(fileReader.result);
      const response = await invoke('blur', {
        infile: Array.from(fileData),
        blurAmt: blurAmount,
      });
    
      if (response && response.success) {
        console.log('Image blurred successfully');
      } else {
        console.log('Failed to blur image');
      }
    };
    fileReader.readAsArrayBuffer(inputFile);
  };

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
          <h3 className="text-lg text-slate-300 font-medium my-10 uppercase">
            Select from the below options:
          </h3>
        </div>
        <div className={cardGridCommonStyle}>
          <div className="grid grid-cols-2 gap-3">
            <div className={cardStyle}>
              <h3>Blur Image</h3>
              <div>
                <label htmlFor="inputFile">Input File:</label>
                <input
                  type="file"
                  id="inputFile"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="blurAmount">Blur Amount:</label>
                <input
                  type="number"
                  id="blurAmount"
                  value={blurAmount}
                  onChange={handleBlurAmountChange}
                />
              </div>
              <button onClick={handleBlur}>Blur Image</button>
            </div>
            <div className={cardStyle}>Brighten</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
