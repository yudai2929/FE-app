import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Text, VStack } from "@chakra-ui/react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import db from "../firebase";
import quiz from "../types/quiz";
import { QuizDetail } from "./QuizDetail";
export const List = (): JSX.Element => {
  const [quizs, setQuizs] = useState<quiz[]>([]);

  const getData = async () => {
    const snapshot: any = await getDocs(collection(db, "test"));
    let quizData: quiz[] = [];
    snapshot.forEach((doc: any) => {
      quizData = [doc.data(), ...quizData];
    });
    setQuizs(quizData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <VStack w={{ base: "100%", md: "80%" }}>
        {quizs.map((quiz, index) => {
          return <QuizDetail key={index} quiz={quiz} />;
        })}
      </VStack>
    </Layout>
  );
};
