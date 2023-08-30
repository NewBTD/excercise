import "./App.css";
import ExerciseSelector from "./components/ExerciseSelector";
import ResultTable from "./components/ResultTable";
import Shake from "./components/Shake";
import { useState } from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";

function App() {
  const [type, setType] = useState("");
  const [shakeCount, setShakeCount] = useState(0);
  const [localData, setLocalData] = useState([{}]);

  const handleExeCount = () => {
    if (localStorage.getItem("exeData") != null) {
      let oldData = JSON.parse(localStorage.getItem("exeData") || "");
      let data = [
        ...oldData,
        {
          date: Date(),
          type: type,
          value: shakeCount,
        },
      ];
      localStorage.setItem("exeData", JSON.stringify(data));
      setLocalData(data);
      console.log(localData);
    } else {
      let data = [
        {
          date: Date(),
          type: type,
          value: shakeCount,
        },
      ];
      localStorage.setItem("exeData", JSON.stringify(data));
      setLocalData(data);
      console.log(localData);
    }
    setShakeCount(0);
  };
  return (
    <ChakraProvider>
      <Container maxW="550px">
        <ExerciseSelector type={setType} setShakeCount={setShakeCount} />
        <Shake
          setShakeCount={setShakeCount}
          shakeCount={shakeCount}
          handleExeCount={handleExeCount}
        />
        <ResultTable setLocalData={setLocalData} />
      </Container>
    </ChakraProvider>
  );
}
export default App;
