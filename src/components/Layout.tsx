import { VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props{
    children: ReactNode
}
export const Layout = ({children}:Props): JSX.Element=> {
  return (
    <VStack as="main" h="100vh" justify="center" bgColor='rgba(0,0,0,0.02)'>
        {children}
    </VStack>
  )
}
