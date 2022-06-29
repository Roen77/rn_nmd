import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Title = styled.Text`
    color: blue;
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
