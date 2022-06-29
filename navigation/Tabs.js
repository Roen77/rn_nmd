import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => (
    //tab 전체에 옵션을 주고싶다면 Nacigator에 screenOptions 각각주고싶다면 각 screen에 Options 사용
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: { backgroundColor: "tomato" },
            tabBarLabelStyle: {
                backgroundColor: "lightblue",
            },
            tabBarLabelPosition: "beside-icon",
            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "purple",
        }}
    >
        <Tab.Screen
            name="Movies"
            component={Movies}
            options={{
                headerTitleStyle: { color: "blue" },
                headerRight: () => (
                    <View>
                        <Text>hrll</Text>
                    </View>
                ),
            }}
        />
        <Tab.Screen
            name="TV"
            component={Tv}
            options={{
                tabBarLabelStyle: {
                    backgroundColor: "pink",
                },
                tabBarBadge: 5,
            }}
        />
        <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
);

export default Tabs;
