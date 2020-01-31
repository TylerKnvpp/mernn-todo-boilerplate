import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import CompletedScreen from "../screens/CompletedScreen";
import TaskFormScreen from "../screens/TaskFormScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Form: TaskFormScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Incomplete",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

HomeStack.path = "";

const CompletedStack = createStackNavigator(
  {
    Completed: CompletedScreen
  },
  config
);

CompletedStack.navigationOptions = {
  tabBarLabel: "Completed",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios" ? "ios-checkmark-circle-outline" : "md-options"
      }
    />
  )
};

CompletedStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  // LinksStack,
  CompletedStack
});

tabNavigator.path = "";

export default tabNavigator;
