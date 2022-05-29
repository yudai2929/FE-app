import { VStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { QuizRegister } from "../components/QuizRegister";
import quiz from "../types/quiz";
import { Layout } from "../components/Layout";
const APP_KEY: string = "quizTmp";

export const Register = (): JSX.Element => {
  const quizsTmp: string | null = localStorage.getItem(APP_KEY);
  const worngQuizs: quiz[] = quizsTmp ? JSON.parse(quizsTmp) : null;

  return (
    <Layout>
      <VStack w={{ base: "100%", md: "80%" }}>
      <Text fontSize='3xl' align='center' colorScheme="blue" variant="outline" m='3' >
            正解率：{5 - worngQuizs.length} / {5}
          </Text>
        {!worngQuizs ? (
          <Navigate to={`/`} />
        ) : (
          <>
            {worngQuizs.length === 0 && <Text>間違えた問題はありません</Text>}
            {worngQuizs.map((worngQuiz, index) => {
              return <QuizRegister key={index} quiz={worngQuiz} />;
            })}
          </>
        )}
      </VStack>
    </Layout>
  );
};
