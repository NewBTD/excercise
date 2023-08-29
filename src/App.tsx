import { useState } from "react";
import { getMobileOperatingSystem } from "../utils/getMobileOperatingSystem";
import "./App.css";

function App() {
  const [motion1, setMotion1] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const handleRequestMotion = async () => {
    window.navigator.vibrate(200);
    const mobile = getMobileOperatingSystem();
    if (mobile === "iOS") {
      if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
        (DeviceMotionEvent as any)
          .requestPermission()
          .then((permissionState: any) => {
            if (permissionState === "granted") {
              window.addEventListener("devicemotion", (e: any) => {
                setMotion1({
                  x: e.accelerationIncludingGravity.x,
                  y: e.accelerationIncludingGravity.y,
                  z: e.accelerationIncludingGravity.z,
                });
              });
            }
          })
          .catch(console.error);
      } else {
        // handle regular non iOS 13+ devices
        console.log("Not Supported");
      }
    } else {
      window.addEventListener("devicemotion", (e: any) => {
        setMotion1({
          x: e.accelerationIncludingGravity.x,
          y: e.accelerationIncludingGravity.y,
          z: e.accelerationIncludingGravity.z,
        });
      });
    }
  };
  return (
    <>
      <button onClick={handleRequestMotion}>Enable motion</button>
      <h1>{motion1.x}</h1>
      <h1>{motion1.y}</h1>
      <h1>{motion1.z}</h1>
    </>
  );
}

export default App;
