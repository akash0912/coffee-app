import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import CartScreen, { cartOptions } from "../screens/CartScreen";
import CoffeeDetailScreen, {
  coffeeDetailOptions,
} from "../screens/CoffeeDetailScreen";
import CoffeeOverviewScreen, {
  coffeeOverviewOptions,
} from "../screens/CoffeeOverviewScreen";
import OrderScreen, { orderOptions } from "../screens/OrderScreen";
import DashboardScreen, { dashboardOptions } from "../screens/DashBoardScreen";
import { Ionicons } from "@expo/vector-icons";
import Logout from "../components/Logout";
import AuthScreen,{authOptions} from "../screens/AuthScreen";
import {useSelector} from 'react-redux';
const MyStack = createNativeStackNavigator();
const MyDrawer = createDrawerNavigator();

const defaultOptions = {
  headerStyle: {
    backgroundColor: '#edc9af',
    
  },
  // header:{
  //   elevation: 0,
  //   shadowOpacity: 0,
  // },
  headerTintColor: Platform.OS === "android" ? "brown" : Colors.secondary,
  
};
const MainScreenNavigator = () => {
  return (
    <MyStack.Navigator screenOptions={defaultOptions}>
      <MyStack.Screen
        name="CoffeeOverview"
        component={CoffeeOverviewScreen}
        options={coffeeOverviewOptions}
      />
      <MyStack.Screen
        name="CoffeeDetail"
        component={CoffeeDetailScreen}
        options={coffeeDetailOptions}
      />
      <MyStack.Screen
        name="Cart"
        component={CartScreen}
        options={cartOptions}
      />
    </MyStack.Navigator>
  );
};

const OrderNavigator = () => {
  return (
    <MyStack.Navigator screenOptions={defaultOptions}>
      <MyStack.Screen
        name="Order"
        component={OrderScreen}
        options={orderOptions}
      />
    </MyStack.Navigator>
  );
};
const AdminNavigator = () => {
  return (
    <MyStack.Navigator screenOptions={defaultOptions}>
      <MyStack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={dashboardOptions}
      />
    </MyStack.Navigator>
  );
};
export const ShopNavigator = () => {
  const role = useSelector(state=>state.auth.role)
  return (
    <MyDrawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.secondary,
      }}
      drawerContent={(props) => {
        return <Logout {...props} />;
      }}
    >
      <MyDrawer.Screen
        name="Coffees"
        component={MainScreenNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={drawerConfig.drawerActiveTintColor}
            />
          ),
        }}
      />
      <MyDrawer.Screen
        name="Orders"
        component={OrderNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={drawerConfig.drawerActiveTintColor}
            />
          ),
        }}
      />
      {role==="admin" && <MyDrawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "bar-chart" : "ios-list"}
              size={23}
              color={drawerConfig.drawerActiveTintColor}
            />
          ),
        }}
      />}
    </MyDrawer.Navigator>
  );
};

export const AuthNavigator =()=>{
  return (
    <MyStack.Navigator screenOptions={defaultOptions}>
      <MyStack.Screen name='auth' component={AuthScreen} options={{headerShown: false}}/>
    </MyStack.Navigator>
  )
}

