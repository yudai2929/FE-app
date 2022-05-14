import { Box, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { QuizCard } from "../components/QuizCard";
import { readQuiz } from "../logic/readQuiz";
import { randomQuiz } from "../logic/randomQuiz";
import quiz from "../types/quiz";

export const Quiz = (): JSX.Element => {
  const quizDatas: quiz[] = readQuiz("01_aki");
  const NumOfQuests: number = 3;
  const quizs: quiz[] = randomQuiz(quizDatas, NumOfQuests);
  const initialQuiz: quiz = quizs[0];
  const [quiz, setQuiz] = useState<quiz>(initialQuiz);
  const [worngQuizs, setWorngQuizs] = useState<quiz[]>([])
  const [quizNumber, setQuizNumber] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleClick = () => {
    if (quizNumber === NumOfQuests-1) {
      setFinished(true);
      return;
    }
    
    const newQuizNumber: number = quizNumber + 1;
    setQuizNumber(newQuizNumber);
    setQuiz(quizs[newQuizNumber]);
    setIsAnswered(false);
    
  };
  
  return (
    <Layout>
      {finished ? (
        <Box w={{ base: "100%", md: "80%" }}>finished !</Box>
      ) : (
        <Box w={{ base: "100%", md: "80%" }}>
          <QuizCard
            quiz={quiz}
            isAnswered={isAnswered}
            setIsAnswered={setIsAnswered}
            worngQuizs={worngQuizs}
            setWorngQuizs={setWorngQuizs}
          />
          <Box w="100%" textAlign="end">
            <Button bg="blue.500" color="white" onClick={handleClick}>
              次の問題へ
            </Button>
          </Box>
        </Box>
      )}
    </Layout>
  );
};
