import { useEffect } from "react";
import { Select, Heading } from "@chakra-ui/react";

function ExerciseSelector({ type, setShakeCount }: any) {
  let exerciseType: string[] = ["ซิทอัพ", "วิดพื้น", "วิ่ง"];
  const handleType = (e: any) => {
    type(e.target.value);
    setShakeCount(0);
  };
  useEffect(() => {
    type(exerciseType[0]);
  }, []);
  return (
    <div id="header" className="">
      <Heading as="h2" size="md" my={10}>
        วันนี้คุณอยากออกกำลังกายแบบไหน?
      </Heading>
      <Select name="" id="" onChange={handleType}>
        {exerciseType.map((type) => {
          return (
            <>
              <option value={type}>{type}</option>
            </>
          );
        })}
      </Select>
    </div>
  );
}

export default ExerciseSelector;
