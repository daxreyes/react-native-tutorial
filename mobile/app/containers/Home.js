import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Button, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { appStyle } from '../styles'

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
      <View style={appStyle.container}>
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

const HomeStack = StackNavigator({
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
});

export default HomeStack;