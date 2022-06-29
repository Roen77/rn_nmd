import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text, View } from "react-native";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, YELLOW_COLOR } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === "dark";

    return (
        //tab 전체에 옵션을 주고싶다면 Nacigator에 screenOptions 각각주고싶다면 각 screen에 Options 사용
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : "white",
                },
                tabBarLabelPosition: "beside-icon",
                tabBarActiveTintColor: isDark ? YELLOW_COLOR : "#1e272e",
                tabBarInactiveTintColor: isDark ? "#d2dae2" : "#808e9b",
                headerStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : "white",
                },
                headerTitleStyle: {
                    color: isDark ? "white" : BLACK_COLOR,
                },
            }}
        >
            <Tab.Screen name="Movies" component={Movies} />
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
};

export default Tabs;
