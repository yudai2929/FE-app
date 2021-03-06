/* eslint-disable react-hooks/exhaustive-deps */
import { Box,  Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/common/Layout";
import { QuizCard } from "../components/quiz/QuizCard";
import { readQuiz } from "../logic/readQuiz";
import { randomQuiz } from "../logic/randomQuiz";
import quiz from "../types/quiz";
import { QuizRegister } from "../components/quiz/QuizRegister";
import { getAuth } from "firebase/auth";
import QuizMode from "../types/quizMode.d";

interface Props {
  numOfQuests: number;
  quizPath: string;
  quizMode: QuizMode;
}
const initializeQuiz: quiz = {
  title: "",
  question: "",
  choices: [],
  answer: 0,
  url: "",
  filed: "",
};

const APP_KEY:string = 'quizTmp'

export const Quiz = ({ numOfQuests, quizPath, quizMode }: Props): JSX.Element => {
  const [currentQuiz, setCurrentQuiz] = useState<quiz>(initializeQuiz);
  const [quizs, setQuizs] = useState<quiz[]>([]);
  const [worngQuizs, setWorngQuizs] = useState<quiz[]>([]);
  const [quizNumber, setQuizNumber] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  
  const auth = getAuth();
  const user = auth.currentUser;


  useEffect(() => {
    const getQuiz = async () => {
      const quizsDatas: quiz[] = await readQuiz(quizPath,quizMode);
      const quizs: quiz[] = randomQuiz(quizsDatas, numOfQuests);
      setCurrentQuiz(quizs[0]);
      setQuizs(quizs);
    };
    getQuiz();
  }, []);



  const handleClick = (): void => {
    if (!isAnswered) {
      alert("問題を選択しください");
      return;
    }
    if (quizNumber === numOfQuests - 1) {
      setFinished(true);
      user ||  localStorage.setItem(APP_KEY,JSON.stringify(worngQuizs));
      return;
    }

    const newQuizNumber: number = quizNumber + 1;
    setQuizNumber(newQuizNumber);
    setCurrentQuiz(quizs[newQuizNumber]);
    setIsAnswered(false);
  };
  
  return (
    <Layout>
      {finished ? (
        <VStack w={{ base: "100%", md: "80%" }}>
          <Text fontSize='3xl' align='center' colorScheme="blue" variant="outline" m='3' >
            正解率：{quizs.length - worngQuizs.length} / {quizs.length}
          </Text>
          {worngQuizs.length === 0 && <Text>間違えた問題はありません</Text>}
          {worngQuizs.map((worngQuiz, index) => {
            return <QuizRegister key={index} quiz={worngQuiz} />;
          })}
        </VStack>
      ) : (
        <Box w={{ base: "100%", md: "80%" }}>
          <QuizCard
            quiz={currentQuiz}
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
