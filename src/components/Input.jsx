import { Box, Textarea } from '@chakra-ui/react'
import React from 'react'

function Input({setInput}) {
  return (
    <Box w='90%' h="20vh">
        <Textarea variant='filled' placeholder='Input' onChange={(e) => setInput(e.target.value)} resize={'none'} h='100%' ></Textarea>
    </Box>
  )
}

export default Input