import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  VStack,
} from "@chakra-ui/react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import yearDatas from "../groupObject/year";

interface Props {
  setQuizPath: (value: string) => void;
  setNumOfQuests: (value: number) => void;
}
export const QuizForm = ({
  setQuizPath,
  setNumOfQuests,
}: Props): JSX.Element => {
  const [MenuMsg, setMenuMsg] = useState("年度を選択");
  const handleClick = (path: string, year: string) => {
    setQuizPath(path);
    setMenuMsg(year);
  };

  return (
    <VStack>
      <Menu>
        <MenuButton as={Button} bgColor='blue.500' color='white' w='150px'>
          {MenuMsg}
          <Box as="span" ms="1" >
            <FontAwesomeIcon icon={faAngleDown} />
          </Box>
        </MenuButton>
        <MenuList>
          {yearDatas.map((data, index) => {
            const [path, year] = data;
            return (
              <MenuItem key={index} onClick={() => handleClick(path, year)}>
                {year}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      
      <Button colorScheme="blue" variant="outline" w='150px'>
        <Link to="/quiz">問題を解く</Link>
      </Button>
    </VStack>
  );
};
