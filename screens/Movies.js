import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;
//   color: ${(props) => (props.selected ? "blue" : "red")};
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

function Movies({ navigation: { navigate } }) {
  return (
    <Btn
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onPress={() => navigate("Stack", { screen: "Three" })}
    >
      <Title>movi</Title>
    </Btn>
  );
}

export default Movies;
