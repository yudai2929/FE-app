/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Header } from "./components/common/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";
import { List } from "./pages/List";
import { Login } from "./pages/Login";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Register } from "./pages/Register";
import { Footer } from "./components/common/Footer";
import QuizMode from "./types/quizMode";


export const loginContext = React.createContext(
  {} as {
    isLogined: boolean;
    setIsLogined: (value: boolean) => void;
  }
);

export const App = () => {
  const [numOfQuests, setNumOfQuests] = useState(5);
  const [quizPath, setQuizPath] = useState("01_aki");
  const [isLogined, setIsLogined] = useState(false);
  const [quizMode, setQuizMode] = useState<QuizMode>('FE');

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogined(true);
      }
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <loginContext.Provider value={{ isLogined, setIsLogined }}>
          <Header isLogined={isLogined} setIsLogined={setIsLogined} />
          <Routes>
            <Route
              index
              element={
                <Home
                  setNumOfQuests={setNumOfQuests}
                  setQuizPath={setQuizPath}
                  quizMode={quizMode}
                  setQuizMode={setQuizMode}
                />
              }
            />
            <Route
              path="quiz"
              element={<Quiz numOfQuests={numOfQuests} quizPath={quizPath} quizMode={quizMode}/>}
            />
            <Route path="list" element={<List />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
          
        </loginContext.Provider>
        <Footer/>
      </BrowserRouter>
    </ChakraProvider>
  );
};
