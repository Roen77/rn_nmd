import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => navigate("Two")}>
                <Text>one</Text>
            </TouchableOpacity>
        </View>
    );
};
const ScreenSec = ({ navigation: { navigate } }) => (
    <View>
        <TouchableOpacity onPress={() => navigate("Three")}>
            <Text>tttttt</Text>
        </TouchableOpacity>
    </View>
);
const ScreenTh = ({ navigation: { setOptions } }) => (
    <View>
        <TouchableOpacity onPress={() => setOptions({ title: "hello" })}>
            <Text>change title</Text>
        </TouchableOpacity>
    </View>
);
const NativeStack = createNativeStackNavigator();

const Stack = () => (
    <NativeStack.Navigator>
        <NativeStack.Screen name="One" component={ScreenOne} />
        <NativeStack.Screen name="Two" component={ScreenSec} />
        <NativeStack.Screen name="Three" component={ScreenTh} />
    </NativeStack.Navigator>
);

export default Stack;
