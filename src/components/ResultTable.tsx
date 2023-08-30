import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
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

function ResultTable({ setLocalData }: any) {
  const clearLocal = () => {
    if (confirm("ลบรายการออกกำลังกาย")) {
      localStorage.clear();
      setLocalData([{}]);
    }
  };
  return (
    <>
      <Flex mt={6} justifyContent="end">
        <Button colorScheme="red" onClick={clearLocal}>
          Clear
        </Button>
      </Flex>
      <TableContainer>
        <Table>
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
    </>
  );
}

export default ResultTable;
