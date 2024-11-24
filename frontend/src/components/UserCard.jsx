import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { BiTrash } from 'react-icons/bi'
import EditModal from './EditModal'
import { API_URL } from '../App'

const UserCard = ({user, setUsers}) => {
    const toast = useToast()
    const handleDeleteUser = async () => {
        try {
            const res = await fetch(API_URL + "/friends/" + user.id, {
                method: 'DELETE',
            })
            const data = await res.json()
            if(!res.ok){
                throw new Error(data.message)
            }
            setUsers((prev) => prev.filter((u) => u.id !== user.id))
            toast({
                title: 'Friend Deleted',
                status: 'success',
                description: data.message,
                duration: 2000,
                isClosable: true,
                position: 'top-center',
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-center',
            })
        }
    }
  return(   
    <Card>
        <CardHeader>
                <Flex gap={4}>
                    <Flex flex={'1'} gap={'4'} alignItems={'center'}>
                        <Avatar src={user.imgUrl}/>

                        <Box>
                            <Heading size='sm'>{user.name}</Heading>
                            <Text>{user.role}</Text>
                        </Box>
                    </Flex>
                    <Flex>
                        <EditModal setUsers={setUsers} user={user}/>
                        <IconButton 
                            variant='ghost'
                            colorScheme='red'
                            size={'sm'}
                            aria-label='See menu'
                            icon={<BiTrash size={20}/>}
                            onClick={handleDeleteUser}
                        />
                    </Flex>
                </Flex>
        </CardHeader>

        <CardBody>
            <Text>
                {user.description}
            </Text>
        </CardBody>
    </Card>
  )
}

export default UserCard