import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
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

const RootStack = StackNavigator({
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component{
  render(){
      return <RootStack />
  }
}
