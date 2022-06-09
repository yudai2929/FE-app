import { VStack, Text, Box } from "@chakra-ui/react";
import React from "react";

export const Footer = () => {
  return (
    <Box as="footer" bg="white" py="2" px="5">
      <Text align="end" color="blue.500">
        copyright all received
      </Text>
    </Box>
  );
};
