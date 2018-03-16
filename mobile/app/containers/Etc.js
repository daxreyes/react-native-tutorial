import React from 'react'
import { Button, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Icon, Input, List, ListItem } from 'react-native-elements';
import { appStyle } from '../styles'
import DB from '../lib/DB'

const db =  new DB()

class EtcScreen extends React.Component{
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  // }
  render(){
    return (
      <View style={appStyle.container}>
        <Text>Etc Screen</Text>
        <Button 
          title = "Go Details"
          onPress={()=> this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

const EtcStack = StackNavigator(
  {
    Etc: {
      screen: EtcScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Etc Screen',
        headerLeft: (
          <Icon
            name="bars"
            // size={30}
            type="font-awesome"
            // iconStyle={{ paddingLeft: 10 }}
            onPress={() => navigation.navigate('DrawerOpen')}
          />
        ),
        drawerLabel: 'Etc',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="cube"
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
    initialRouteName: 'Etc',
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

export default EtcStack