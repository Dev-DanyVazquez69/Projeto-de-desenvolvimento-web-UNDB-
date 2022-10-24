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
  //cria os estados dos campos, caso não seja uma edição, começará vazio
  const [Id, setId] = useState(dataEdit.Id || "");
  const [Nome, setNome] = useState(dataEdit.Nome || "");
  const [Quantidade, setQuantidade] = useState(dataEdit.Quantidade || "");

  //metodo chamado ao clicar no botão salvar do modal 
  const handleSave = () => {
    //verificar se há informações nos campos de input
    if (!Id || !Nome || !Quantidade) return;
    // chamar a função que verifica se o Id inserido já está em uso 
    if (idAlreadyExists()) {
      return alert("Id já cadastrado!");
    }
    //verifica se o campo dataEdit é maior que 0, siginifacando que foi solicitado uma edição.
    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { Id, Nome, Quantidade};
    }
    //caso não haja uma requisição de edição, os dados enviados pelo usuário criará um novo registro senão será apenas atualizado os dados no indice indicado 
    const newDataArray = !Object.keys(dataEdit).length
      ? [...(data ? data : []), { Id, Nome, Quantidade  }]
      : [...(data ? data : [])];
    // salva o novos dados 
    localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

    setData(newDataArray);
    // fecha o modal 
    onClose();
  };
  
  // verifica se o Id inserido já está em uso e se não está editando
  const idAlreadyExists = () => {
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
          <ModalHeader>Cadastro de produtos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="row" gap={4}>
              <Box>
                <FormLabel>ID</FormLabel>
                <Input
                  type="Number"
                  value={Id}
                  onChange={(e) => setId(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>PRODUTO</FormLabel>
                <Input
                  type="text"
                  value={Nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>QUANTIDADE</FormLabel>
                <Input
                  type="Number"
                  value={Quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="yellow" mr={3} onClick={handleSave}>
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
