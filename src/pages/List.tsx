import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Text } from "@chakra-ui/react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import db from "../firebase";
export const List = (): JSX.Element => {
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "test"));
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  const setData = async () => {
    const citiesRef = collection(db, "test");
    await setDoc(doc(citiesRef,'dd'), {
      name: "San Francisco", state: "CA", country: "USA",
      capital: false, population: 860000,
      regions: ["west_coast", "norcal"] });
  }

  useEffect(() => {
    //setData()
  }, []);

  return (
    <Layout>
      <Text>復習できるページです</Text>
    </Layout>
  );
};
