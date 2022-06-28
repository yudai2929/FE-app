import React, { useEffect } from "react";
import { Text } from "@chakra-ui/react";

import { Layout } from "../components/common/Layout";
import { QuizForm } from "../components/quiz/QuizForm";
import QuizMode from "../types/quizMode";
import quizModeObj from "../groupObject/quizMode";
interface Props{
  setNumOfQuests: (value: number) => void
  setQuizPath: (value: string) => void
  quizMode: QuizMode
  setQuizMode: (value: QuizMode) => void
}

export const Home = ({setNumOfQuests,setQuizPath,quizMode,setQuizMode}: Props): JSX.Element=> {
  useEffect(()=>{
    localStorage.clear()
  },[])
  return (
    <Layout>
      <Text as="h1" fontSize={{md:'4xl',base:'3xl'}} mb={'30px'}>
        {quizModeObj[quizMode]}
      </Text>
      <QuizForm setQuizPath={setQuizPath} setNumOfQuests={setNumOfQuests} quizMode={quizMode} setQuizMode={setQuizMode}/>
    </Layout>
  );
};
