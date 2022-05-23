import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { VStack, Text } from "@chakra-ui/react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase";
import quiz from "../types/quiz";
import { QuizDetailCard } from "./QuizDetailCard";
import { getAuth } from "firebase/auth";

export const List = (): JSX.Element => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user)
  const [quizs, setQuizs] = useState<quiz[]>([]);
  const getData = async () => {
    onSnapshot(collection(db, "test"), (snapshot) => {
      setQuizs(snapshot.docs.map((doc) => doc.data()) as quiz[]);
    });
  };

  useEffect(() => {
    getData();
    return;
  }, []);

  return (
    <Layout>
      <VStack w={{ base: "100%", md: "80%" }}>
        {quizs.length === 0 && <Text>復習する問題がありません</Text>}
        {quizs.map((quiz, index) => {
          return <QuizDetailCard key={index} quiz={quiz} />;
        })}
      </VStack>
    </Layout>
  );
};
