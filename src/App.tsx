import { useState, useRef, useEffect } from "react";
import { getMobileOperatingSystem } from "../utils/getMobileOperatingSystem";
import "./App.css";
let shaking: { x: number; y: number; z: number } | undefined;

function normalize(x: number, y: number, z: number) {
  const len = Math.hypot(x, y, z);
  return [x / len, y / len, z / len];
}
function App() {
  const [motion1, setMotion1] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const motion2 = useRef({
    x: 0,
    y: 0,
    z: 0,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    const hypot = Math.hypot(motion1.x, motion1.y, motion1.z);

    if (hypot > 30) {
      if (shaking) {
        const [a, b, c] = normalize(motion1.x, motion1.y, motion1.z);
        const [d, e, f] = normalize(shaking.x, shaking.y, shaking.z);
        // check if [a,b,c] and [d,e,f] are pointing to the same direction by using dot product
        if (Math.abs(a * d + b * e + c * f) < 0.3) {
          shaking = undefined;
        }
      }
      if (!shaking) {
        shaking = {
          x: motion1.x,
          y: motion1.y,
          z: motion1.z,
        };
        setCount(count + 1);
      }
    } else if (hypot < 20) {
      shaking = undefined;
    }
    // Update new position
    motion2.current = {
      x: motion1.x,
      y: motion1.y,
      z: motion1.z,
    };
  }, [motion1, motion2.current]);

  const handleRequestMotion = async () => {
    // window.navigator.vibrate(200);
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
      {/* <Select options={exerciseOptions} onChange={handleSetExercise} /> */}
      <button onClick={handleRequestMotion}>Enable motion</button>
      {count}
    </>
  );
}

export default App;
