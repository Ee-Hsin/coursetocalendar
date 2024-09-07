import { useEffect, useRef } from "react";
import './App.css';

function App() {
  const appRef = useRef(null);
  const toRef = useRef(null);

  useEffect( () => {
    const moveGradient = (event) => {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      const mouseX = Math.round((event.pageX / winWidth) * 100)
      const mouseY = Math.round((event.pageY / winHeight) * 100)

      if (appRef) {
        appRef.current.style.setProperty('--mouse-x',mouseX.toString() + '%');
        appRef.current.style.setProperty('--mouse-y',mouseY.toString() + '%');
      }
    }

    document.addEventListener('mousemove', moveGradient);
    return function cleanup() {
      document.removeEventListener('mousemove', moveGradient);
    };
  }, [appRef])

  return (
    <div className="app" id='app' ref={appRef} data-scroll-container>
      {/* Header */}
      <div className='pt-20 font-lato font-bold'>
        <h1 className='text-7xl text-white text-center'>
          Course to Calendar
        </h1>
      </div>

      {/* Body */}
      <div>
        {/* inputs */}
        <div className="p-10">
  <div className="flex flex-col mb-10">
    <p className="mb-2">Course Name:</p>
    <input
      type="text"
      className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none"
      placeholder="Enter your course name here"
    />
  </div>

  <div className="flex flex-col">
    <p className="mb-2">Course Outline/Syllabus:</p>
    <p className="mb-2">Copy the whole page by pressing ctrl+A and then ctrl+C</p>
    <input
      type="text"
      className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none"
      placeholder="Enter text here"
    />
  </div>
</div>
        
        <div className='flex justify-center p-10'>
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
            Submit
          </button>
        </div>
        
        
      </div>

    </div>
  )
}

export default App
