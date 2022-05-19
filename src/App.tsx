import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";
import { List } from "./pages/List";
import { Login } from "./pages/Login";
import { Log } from "./pages/Log";
import { useState } from "react";


export const App = () => {
  const [numOfQuests,setNumOfQuests] = useState(5)
  const [quizPath, setQuizPath] = useState('01_aki')

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home setNumOfQuests={setNumOfQuests} setQuizPath={setQuizPath}/>} />
          <Route path="quiz" element={<Quiz numOfQuests={numOfQuests} quizPath={quizPath}/>} />
          <Route path="list" element={<List />} />
          <Route path="login" element={<Login />} />
          <Route path="log" element={<Log />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
