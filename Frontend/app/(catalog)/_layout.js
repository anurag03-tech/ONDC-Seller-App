import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";

// Common header component to reduce duplication
const Header = ({ navigation, iconName = "inventory", headerText }) => (
  <View
    className="flex-row items-center bg-blue-500 px-4"
    style={{ height: 54 }}
  >
    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-2">
      <Icon name="keyboard-backspace" size={24} color="white" />
    </TouchableOpacity>
    <View className="flex-1 flex-row items-center justify-center">
      <Icon name={iconName} size={24} color="white" className="mr-2" />
      <Text className="font-bold text-2xl text-white">{headerText}</Text>
    </View>
    <View className="w-10" />
  </View>
);

const CatalogLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: ({ navigation }) => (
            <Header
              navigation={navigation}
              iconName="inventory"
              headerText="Add Product"
            />
          ),
          headerStyle: {
            height: 60,
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="product"
        options={{
          header: ({ navigation }) => (
            <Header
              navigation={navigation}
              iconName="shopping-cart"
              headerText="Add Product"
            />
          ),
          headerStyle: {
            height: 60,
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="productEdit"
        options={{
          header: ({ navigation }) => (
            <Header
              navigation={navigation}
              iconName="edit"
              headerText="Edit Product"
            />
          ),
          headerStyle: {
            height: 60,
          },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
};

export default CatalogLayout;
