import React from "react";
// function ExerciseSelector(exeOptions: Array<{ value: string; label: string }>) {
//   return <select name="" id=""></select>;
// }
interface ExerciseOption {
  value: string;
  label: string;
}
const ExerciseSelector = (exeOptions: ExerciseOption[]) => {
  return (
    <>
      <div>
        {exeOptions.map((el: any) => {
          return <h1>{el.label}</h1>;
        })}
      </div>
    </>
  );
};

export default ExerciseSelector;
