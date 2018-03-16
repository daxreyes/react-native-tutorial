import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon, Input, List, ListItem } from 'react-native-elements';

import DB from './app/lib/DB'
import HomeStack from './app/containers/Home'
import DetailsStack from './app/containers/Details'
import EtcStack from './app/containers/Etc'
// import Expo, { SQLite } from 'expo';

const db = new DB()

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, 
    // backgroundColor: '#43484d' 
    backgroundColor: '#007AFF' 
  }}>
    <View
      // style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
    >
      <Icon
        name="user-md"
        // style={{ width: SCREEN_WIDTH * 0.57 }}
        type="font-awesome"
      />
    </View>
    <View 
    // style={{marginLeft: 10}}
    >
      <DrawerItems {...props} />
    </View>
  </View>
);

const RootStack = DrawerNavigator(
  {
    Home: {
      path: '/home',
      screen: HomeStack,
    },
    Details: {
      path: '/details',
      screen: DetailsStack,
    },
    Etc: {
      path: '/etc',
      screen: EtcStack
    }
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#548ff7',
      // activeTintColor: '#007AFF',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      // labelStyle: {
      //   fontSize: 15,
      //   marginLeft: 0,
      // },
    },
    // drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);

export default class App extends React.Component{
  // componentDidMount() {
  //   db.populate()
  // }

  render(){
      return <RootStack />
  }
}
