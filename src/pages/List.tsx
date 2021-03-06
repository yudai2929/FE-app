/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Layout } from "../components/common/Layout";
import { VStack, Text } from "@chakra-ui/react";
import { collection, onSnapshot,query, where } from "firebase/firestore";
import db from "../firebase";
import quiz from "../types/quiz";
import { QuizDetailCard} from "../components/quiz/QuizDetailCard"
import { getAuth } from "firebase/auth";

export const List = (): JSX.Element => {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid:string= user ? user.uid : '';
  const [quizs, setQuizs] = useState<quiz[]>([]);
  const getData = async () => {
    onSnapshot(query(collection(db, "test"),where("uid", "==", uid)), (snapshot) => {
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
        {!user&&<Text>ログインしてください</Text>}
        {quizs.length === 0 && <Text>復習する問題がありません</Text>}
        {quizs.map((quiz, index) => {
          return <QuizDetailCard key={index} quiz={quiz} />;
        })}
      </VStack>
    </Layout>
  );
};
