import React from 'react'
import { Box, Container, Flex } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <Container maxW={"900px"}>
        <Box
            px={4}
            my={4}
            borderRadius={5}
        >
            <Flex
                h={16}
                alighItems={"center"}
                justifyContent={"space-between"}
            >
                {/* Left side */}
                <Flex
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >

                </Flex>
                {/* Right side */}
                <Flex></Flex>
            </Flex>            
        </Box>

    </Container>
  )
}

export default Navbar