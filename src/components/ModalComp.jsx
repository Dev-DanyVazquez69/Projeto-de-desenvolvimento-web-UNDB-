import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [Id, setId] = useState(dataEdit.Id || "");
  const [Nome, setNome] = useState(dataEdit.Nome || "");
  const [Quantidade, setQuantidade] = useState(dataEdit.Quantidade || "");

  const handleSave = () => {
    if (!Id || !Nome || !Quantidade) return;

    if (emailAlreadyExists()) {
      return alert("Id já cadastrado!");
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { Id, Nome, Quantidade};
    }

    const newDataArray = !Object.keys(dataEdit).length
      ? [...(data ? data : []), { Id, Nome, Quantidade  }]
      : [...(data ? data : [])];

    localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

    setData(newDataArray);

    onClose();
  };

  const emailAlreadyExists = () => {
    if (dataEdit.Id !== Id && data?.length) {
      return data.find((item) => item.Id === Id);
    }

    return false;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Clientes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Id</FormLabel>
                <Input
                  type="Number"
                  value={Id}
                  onChange={(e) => setId(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={Nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Quantidade</FormLabel>
                <Input
                  type="Number"
                  value={Quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
