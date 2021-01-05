import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/loginScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import equipmentsScreen from '../screens/equipmentsScreen';
import employeesScreen from '../screens/employeesScreen';
import historyScreen from '../screens/historyScreen';
import departmentScreen from '../screens/departmentsScreen';
import addNewEmployeeScreen from '../screens/addNewEmployeeScreen';
import addNewEquipmentScreen from '../screens/addNewEquipmentScreen';
import employeesDetailScreen from '../screens/employeesDetailScreen';
import equipmentsDetailScreen from '../screens/equipmentsDetailScreen';
import React from 'react';
import {Icon} from 'react-native-elements';
import editEquipmentScreen from '../screens/editEquipmentScreen';
import addNewDepartmentScreen from '../screens/addNewDepartmentScreen';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MainScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Thiết bị"
      tabBarOptions={{labelStyle:{fontFamily:'SegoeUI-Regular', fontSize:10, color:'#93c22f'}}}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === 'Thiết bị') {
            iconName = focused ? 'desktop' : 'desktop-outline';
          } else if (route.name === 'Nhân viên') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Phòng ban') {
            iconName = focused ? 'tv' : 'tv-outline';
          } else if (route.name === 'Lịch sử') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          }
          return (
            <Icon
              name={iconName}
              size={25}
              type="ionicon"
              color={focused ? '#93c22f' : '#C6C1BB'}
              style={{marginBottom: 4}}
            />
          );
        },
      })}
      barStyle={{backgroundColor: 'F4F4F4'}}
      activeColor={'#93c22f'}>
      <Tab.Screen name="Thiết bị" component={equipmentsScreen} />
      <Tab.Screen name="Nhân viên" component={employeesScreen} />
      <Tab.Screen name="Phòng ban" component={departmentScreen} />
      <Tab.Screen name="Lịch sử" component={historyScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="loginScreen"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="loginScreen" component={LoginScreen} />
        <RootStack.Screen name="mainScreen" component={MainScreen} />
        <RootStack.Screen
          name="addNewEmployeeScreen"
          component={addNewEmployeeScreen}
        />
        <RootStack.Screen
          name="addNewDepartmentScreen"
          component={addNewDepartmentScreen}
        />
        <RootStack.Screen
          name="addNewEquipmentScreen"
          component={addNewEquipmentScreen}
        />
        <RootStack.Screen
          name="employeesDetailScreen"
          component={employeesDetailScreen}
        />
        <RootStack.Screen
          name="equipmentsDetailScreen"
          component={equipmentsDetailScreen}
        />
        <RootStack.Screen
          name="editEquipmentScreen"
          component={editEquipmentScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
