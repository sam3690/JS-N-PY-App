import { 
    Button, 
    Flex, 
    FormControl, 
    FormLabel, 
    Input, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Radio, 
    RadioGroup, 
    Textarea, 
    useDisclosure, 
    useToast} from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiAddToQueue } from 'react-icons/bi'
import { API_URL } from '../App'

const CreateUserModal = ({ setUsers }) => {
    const {isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
        name: '',
        role: '',
        description: '',
        gender: ''
    })
    const toast = useToast()

    const handleCreateUser = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(API_URL + "/friends", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.message)                
            }
            toast({
                title: 'Friend Created',
                description: "Friend added successfully! 🎉",
                status: 'success',
                duration: 2000,
                position: 'top-center',
                isClosable: true,
            })
            onClose()
            setUsers(prev => [...prev, data])
        } catch (error) {
            console.log(error);
            
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 3000,
                position: 'top-center',
                isClosable: true,
            })
            
            
        } finally {
            setIsLoading(false)
            setInputs({
                name: '',
                role: '',
                description: '',
                gender: '',
            })
        
        }
        
    }
  return( 
    <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20}/>
        </Button>    

        <Modal 
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <form onSubmit={handleCreateUser}>
                
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
                                 onChange={(e) => setInputs({...inputs, name: e.target.value})}/>

                            </FormControl>
                            {/* Right */}
                            <FormControl>
                                <FormLabel>Job</FormLabel>
                                <Input placeholder='Software Engineer' 
                                value={inputs.role} 
                                onChange={(e) => setInputs({...inputs, role: e.target.value})}
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
                                    onChange={(e) => setInputs({...inputs, description: e.target.value})}
                                />

                            </FormControl>

                            <RadioGroup defaultValue='' mt={4}>
                                <Flex gap={5}>
                                    <Radio 
                                    value='male'
                                    onChange={(e) => setInputs({...inputs, gender: e.target.value})}
                                    >
                                        Male
                                    </Radio>
                                    <Radio 
                                    value='female'
                                    onChange={(e) => setInputs({...inputs, gender: e.target.value})}
                                    >
                                        Female
                                    </Radio>
                                </Flex>

                            </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>Add</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
            </ModalContent>
            </form>
        </Modal>
    </>     
    )
}

export default CreateUserModal