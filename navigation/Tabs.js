import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/search";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "red",
    }}
  >
    <Tab.Screen
      name="Movies"
      component={Movies}
      options={{
        headerTitleStyle: { color: "tomato" },
        headerRight: () => (
          <View>
            <Text>Hello</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen name="Tv" component={Tv} options={{ tabBarBadge: 5 }} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);

export default Tabs;
