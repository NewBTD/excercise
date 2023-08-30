import "./App.css";
import ExerciseSelector from "./components/ExerciseSelector";
import ResultTable from "./components/ResultTable";
import Shake from "./components/Shake";
import { useState } from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";

function App() {
  const [type, setType] = useState("");
  return (
    <ChakraProvider>
      <Container maxW="550px">
        <ExerciseSelector type={setType} />
        <Shake type={type} />
        <ResultTable />
      </Container>
    </ChakraProvider>
  );
}
export default App;
