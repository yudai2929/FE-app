import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import {Header} from "./components/Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Home} from "./pages/Home"
import {Quiz} from "./pages/Quiz"
import {List} from "./pages/List"
import { Login } from "./pages/Login";
import { Log } from "./pages/Log";
export const App = () => (
  <ChakraProvider theme={theme}>
    
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="list" element={<List />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="login" element={<Login />} />
        <Route path="log" element={<Log />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)
