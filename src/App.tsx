import { useEffect, useRef } from "react";
import './App.css';
import gradientImage from './assets/gradient.avif';

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    const moveGradient = (event) => {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      const mouseX = Math.round((event.pageX / winWidth) * 100);
      const mouseY = Math.round((event.pageY / winHeight) * 100);

      if (appRef) {
        appRef.current.style.setProperty('--mouse-x', mouseX.toString() + '%');
        appRef.current.style.setProperty('--mouse-y', mouseY.toString() + '%');
      }
    };

    document.addEventListener('mousemove', moveGradient);
    return function cleanup() {
      document.removeEventListener('mousemove', moveGradient);
    };
  }, [appRef]);

  return (
    // <div className="app flex justify-center items-center min-h-screen" id="app" ref={appRef} data-scroll-container>
       <div
      className="app flex justify-center items-center min-h-screen ref={appRef} data-scroll-container"
      style={{
        backgroundImage: `url(${gradientImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      >
      
      {/* Main container centered */}
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="font-lato font-bold text-center mb-10">
          <h1 className="text-7xl text-white">
            Course to Calendar
          </h1>
        </div>

        {/* Body */}
        <div>
          {/* inputs */}
          <div className="p-10">
            <div className="flex flex-col mb-10 font-lato font-bold text-black">
              <p className="mb-4 text-2xl">Course Name:</p>
              <input
                type="text"
                className="border-2 border-black rounded-lg p-4 text-lg focus:outline-none w-full"
                placeholder="Enter your course name here"
              />
            </div>

            <div className="flex flex-col font-lato font-bold">
              <p className="mb-4 text-2xl text-black">Course Outline/Syllabus:</p>
              <p className="mb-2 text-black">Copy the whole page by pressing ctrl+A and then ctrl+C</p>
              <textarea
                rows="5"
                className="border-2 border-black rounded-lg p-4 text-lg focus:outline-none text-black w-full"
                placeholder="Enter text here"
              />
            </div>
          </div>

          <div className="flex justify-center p-10">
            <button className="shadow-[0_0_0_3px_#000000_inset] px-10 py-4 bg-transparent font-lato text-2xl border border-white dark:text-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 hover:bg-white hover:text-black">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default App;
