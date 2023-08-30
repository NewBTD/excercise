import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";

const RenderJSX = () => {
  if (localStorage.getItem("exeData") != null) {
    let dataFromLocal = JSON.parse(localStorage.getItem("exeData") || "");
    const listItems = dataFromLocal.map((el: any) => {
      let dateFormat = new Date(el.date);
      let newDate = dateFormat.toLocaleDateString();
      return (
        <Tbody>
          <Tr>
            <Td>{newDate}</Td>
            <Td>{el.type}</Td>
            <Td>{el.value}</Td>
          </Tr>
        </Tbody>
      );
    });
    return <>{listItems}</>;
  }
};

function ResultTable() {
  const [data, setData] = useState([]);
  const handleTable = () => {
    let dataFromLocal = JSON.parse(localStorage.getItem("exeData") || "");
    setData(dataFromLocal);
  };
  return (
    <div
      style={{
        display: data ? "block" : "none",
      }}
    >
      <div className="display_btn">
        <Button className="display_table" onClick={handleTable}>
          แสดงตาราง
        </Button>
      </div>
      <TableContainer>
        <Table id="result_table">
          <Thead>
            <Tr>
              <Th>วันที่</Th>
              <Th>ประเภท</Th>
              <Th>จำนวนครั้ง</Th>
            </Tr>
          </Thead>
          <RenderJSX />
        </Table>
      </TableContainer>
    </div>
  );
}

export default ResultTable;
