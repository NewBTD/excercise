import { useState } from "react";
import "./App.css";

function App() {
  const [motion1, setMotion1] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const handleMotion = () => {
    window.addEventListener("devicemotion", (e: any) => {
      setMotion1({
        x: e.accelerationIncludingGravity.x,
        y: e.accelerationIncludingGravity.y,
        z: e.accelerationIncludingGravity.z,
      });
    });
  };
  return (
    <>
      <button onClick={handleMotion}>Enable motion</button>
      <h1>{motion1.x}</h1>
      <h1>{motion1.y}</h1>
      <h1>{motion1.z}</h1>
    </>
  );
}

export default App;
