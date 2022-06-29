import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function Movies({ navigation: { navigate } }) {
    return (
        <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={() => navigate("Stack", { screen: "Three" })}
        >
            <Text>movi</Text>
        </TouchableOpacity>
    );
}

export default Movies;
