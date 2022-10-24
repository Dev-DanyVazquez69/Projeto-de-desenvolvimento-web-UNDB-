import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  //verifica atráves de recursos(hooks) se o dispositivo é mobile
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });
  //carrega os dados do localestorage, caso não haja dados é retornado um array vazio
  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];
    //salva array
    setData(db_costumer);
  }, [setData]);
  //metodo para remover um item
  const handleRemove = (Id) => {
    const newArray = data.filter((item) => item.Id !== Id);
    //salva array
    setData(newArray);
    //manda para o localstorage
    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };
  
  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
  
      <Box maxW={800} w="100%" h="70vh" py={10} px={2}>
        <Button colorScheme="yellow" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CADASTRO
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6" bg="#ecc94b" color="black">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize={isMobile ? 13 : 20} color="black">
                  Id
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize={isMobile ? 13 : 20} color="black">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize={isMobile ? 13 : 20} color="black">
                  Quantidade
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ Id, Nome, Quantidade }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{Id}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{Nome}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{Quantidade}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ Id, Nome, Quantidade , index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(Id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;