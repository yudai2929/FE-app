import { Box, Button, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { QuizCard } from "../components/QuizCard";
import { readQuiz } from "../logic/readQuiz";
import { randomQuiz } from "../logic/randomQuiz";
import quiz from "../types/quiz";
import { QuizRegister } from "../components/QuizRegister";

export const Quiz = (): JSX.Element => {
  const quizDatas: quiz[] = readQuiz("01_aki");
  const NumOfQuests: number = 6;
  const quizs: quiz[] = randomQuiz(quizDatas, NumOfQuests);
  const initialQuiz: quiz = quizs[0];
  const [quiz, setQuiz] = useState<quiz>(initialQuiz);
  const [worngQuizs, setWorngQuizs] = useState<quiz[]>([]);
  const [quizNumber, setQuizNumber] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleClick = () => {
    if (quizNumber === NumOfQuests - 1) {
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
        <VStack w={{ base: "100%", md: "80%" }}>
          {worngQuizs.map((worngQuiz, index )=> {return <QuizRegister key={index} quiz={worngQuiz}/>})}
        </VStack>
      ) : (
        <Box w={{ base: "100%", md: "80%" }}>
          <QuizCard
            quiz={quiz}
            isAnswered={isAnswered}
            setIsAnswered={setIsAnswered}
            worngQuizs={worngQuizs}
            setWorngQuizs={setWorngQuizs}
            nextQuiz={handleClick}
          />
        </Box>
      )}
    </Layout>
  );
};
