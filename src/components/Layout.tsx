import { VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props{
    children: ReactNode
}
export const Layout = ({children}:Props): JSX.Element=> {
  return (
    <VStack as="main" minH="100vh" pt='50px' justify="center" bgColor='rgba(0,0,0,0.02)'>
        {children}
    </VStack>
  )
}
