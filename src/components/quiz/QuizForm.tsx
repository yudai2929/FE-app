import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  VStack,
  HStack,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import yearDatas from "../../groupObject/year";
import QuizMode from "../../types/quizMode";

interface Props {
  setQuizPath: (value: string) => void;
  setNumOfQuests: (value: number) => void;
  quizMode: QuizMode
  setQuizMode: (value: QuizMode) => void
}
export const QuizForm = ({
  setQuizPath,
  setNumOfQuests,
  quizMode,setQuizMode
  
}: Props): JSX.Element => {
  const [MenuMsg, setMenuMsg] = useState("年度を選択");
  const handleClick = (path: string, year: string) => {
    setQuizPath(path);
    setMenuMsg(year);

  };

  const modeChange = (nextValue: QuizMode): void => {
    setQuizMode(nextValue);
  }
  useEffect(()=>{
    setMenuMsg("年度を選択");
  },[quizMode,setQuizMode])
  
  return (
    <VStack spacing="20px">
      <HStack spacing="10px">
        <Menu>
          <MenuButton as={Button} bgColor="blue.500" color="white" w="150px">
            {MenuMsg}
            <Box as="span" ms="1">
              <FontAwesomeIcon icon={faAngleDown} />
            </Box>
          </MenuButton>
          <MenuList>
            {yearDatas[quizMode].map((data, index) => {
              const [path, year] = data;
              return (
                <MenuItem key={index} onClick={() => handleClick(path, year)}>
                  {year}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>

        <Button colorScheme="blue" variant="outline" w="150px">
          <Link to="/quiz">問題を解く</Link>
        </Button>

      </HStack>
      <RadioGroup onChange={modeChange} value={quizMode}>
          <Stack direction="row">
            <Radio value="FE">基本情報</Radio>
            <Radio value="AP">応用情報</Radio>
            <Radio value="IP">ITパスポート</Radio>
          </Stack>
        </RadioGroup>
    </VStack>
  );
};
