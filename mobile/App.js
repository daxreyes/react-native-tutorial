import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        // color="#fff"
      />
    ),
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button 
          title = "Go Details"
          onPress={()=> this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component{
  static navigationOptions = {
    title: 'Details',
  };
  render(){
      return(
      <View style={styles.container}>
          <Text> Details Screen</Text>
          <Button 
          title = "Go Back"
          onPress={()=> this.props.navigation.goBack()}
          />
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'App Home',
        headerLeft: (
          <Icon
            name="bars"
            // size={30}
            type="font-awesome"
            // iconStyle={{ paddingLeft: 10 }}
            onPress={() => navigation.navigate('DrawerOpen')}
          />
        ),
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="home"
            // size={30}
            // iconStyle={{
            //   width: 30,
            //   height: 30
            // }}
            type="font-awesome"
            color={tintColor}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);

const DetailsStack = StackNavigator(
  {
    Details: {
      screen: DetailsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'App Details',
        headerLeft: (
          <Icon
            name="bars"
            // size={30}
            type="font-awesome"
            // iconStyle={{ paddingLeft: 10 }}
            onPress={() => navigation.navigate('DrawerOpen')}
          />
        ),
        drawerLabel: 'Details',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="users"
            // size={30}
            // iconStyle={{
            //   width: 30,
            //   height: 30
            // }}
            type="font-awesome"
            color={tintColor}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'Details',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);


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
  render(){
      return <RootStack />
  }
}
