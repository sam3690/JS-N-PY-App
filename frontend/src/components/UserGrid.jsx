import { Grid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import UserCard from './UserCard'

const UserGrid = ({users, setUsers}) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUsers = async ()=>{
        try {
          const res = await fetch("http://127.0.0.1:5000/api/friends")
          const data = await res.json()
          if(!res.ok){
            throw new Error(data.Error)
          }
          setUsers(data)
          
        } catch (error) {
          console.log(error);
          
        } finally{
          setIsLoading(false)
        }
    }
    getUsers()
  },[setUsers])
  
  
  return <Grid templateColumns={{
        base:"1fr",
        md:"repeat(2, 1fr)",
        lg:"repeat(3, 1fr)",
  }}
  gap={4}
  >
    {users.map((user) => (
        <UserCard key={user.id} user={user}/>
    ))}

  </Grid>
}

export default UserGrid