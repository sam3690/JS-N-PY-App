import { 
    Button, 
    Flex, 
    FormControl, 
    FormLabel, 
    IconButton, 
    Input, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Textarea, 
    useDisclosure, 
    useToast} from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiAddToQueue, BiEditAlt } from 'react-icons/bi'
import { API_URL } from '../App'

const EditModal = ({ setUsers, user }) => {
    const {isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
        name: user.name,
        role: user.role,
        description: user.description,
    })
    const toast = useToast()

    const handleEditUser = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(API_URL + "/friends/" + user.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.message)
            }

            setUsers((prev) => prev.map((u) => u.id === user.id ? data : u))

            toast ({
                title: 'Friend Updated',
                status: 'success',
                description: "Friend updated successfully",
                duration: 2000,
                isClosable: true,
                position: 'top-center',
            })
            onClose()
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-center',
            })
        }finally{
            setIsLoading(false)
        }

    }

    return <>
            <IconButton 
                onClick={onOpen}
                variant='ghost'
                colorScheme='blue'
                size={'sm'}
                aria-label='See menu'
                icon={<BiEditAlt size={20}/>}
            />
  
      <Modal 
          isOpen={isOpen}
          onClose={onClose}
      >
          <ModalOverlay/>
          <form onSubmit={handleEditUser}>
          <ModalContent>
              <ModalHeader> My New Friend 😍 </ModalHeader>
              <ModalCloseButton/>
                  <ModalBody pb={6}>
                      <Flex alignItems={"center"} gap={4}>
                          {/* Left */}
                          <FormControl>
                              <FormLabel>Full Name</FormLabel>
                              <Input placeholder='John Doe'
                               value={inputs.name} 
                               onChange={(e) => setInputs((prev) => ({...prev, name: e.target.value}))}
                               />
  
                          </FormControl>
                          {/* Right */}
                          <FormControl>
                              <FormLabel>Job</FormLabel>
                              <Input placeholder='Software Engineer'
                                value={inputs.role}
                               onChange={(e) => setInputs((prev) => ({...prev, role: e.target.value}))}

                              />
  
                          </FormControl>
                      </Flex>
  
                      <FormControl mt={4}>
                              <FormLabel>Description</FormLabel>
                              <Textarea
                                  resize={"none"}
                                  overflow={"hidden"}
                                  placeholder="He's a Software Developer who loves to code and build things."
                                  value={inputs.description}
                                  onChange={(e) => setInputs((prev) => ({...prev, description: e.target.value}))}

                              />
  
                          </FormControl>
                  </ModalBody>
                  <ModalFooter>
                      <Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>Update</Button>
                      <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
          </ModalContent>
          </form>
      </Modal>
  </>  
}

export default EditModal