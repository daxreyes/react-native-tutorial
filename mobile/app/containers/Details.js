import React from 'react'
import { Button, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Icon, Input, List, ListItem } from 'react-native-elements';
import { appStyle } from '../styles'
import DB from '../lib/DB'

const db =  new DB()

class DetailsScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      results: []
    };
  }
  
  static navigationOptions = {
    title: 'Details',
  };
  
  // experimental class fields syntax in order not to have to call bind
  // https://reactjs.org/docs/handling-events.html
  pressItem = (searchQuery) => {
    console.log('press item query', searchQuery);
    // db.query("SELECT COUNT(*) FROM search",[], 
    //   (_, { rows }) =>{
    //     console.log('count', JSON.stringify(rows))
    //   }
    // );
    db.query("SELECT name, text FROM search WHERE search MATCH ?",[searchQuery], (_, { rows }) =>{
          // console.log('fts query', JSON.stringify(rows));
          this.setState({results: rows._array});
        });
  }

  render(){
    let results = this.state.results;
    console.log('results', results);
    return(
      <ScrollView>
      <View style={appStyle.container}>
          <Text> Details Screen</Text>
          <Button 
          title = "Go Back"
          onPress={()=> this.props.navigation.goBack()}
          />
          <Button 
          title = "Populate"
          onPress={()=> db.populate()}
          />
          <Button 
          title = "Reset"
          onPress={()=> db.reset()}
          />
          <Input
            // style={{
            //   flex: 1,
            //   padding: 5,
            //   height: 40,
            //   borderColor: 'gray',
            //   borderWidth: 1,
            // }}
            maxLength = {40}
            placeholder="what do you need to do?"
            value={this.state.query}
            onChangeText={(text) => {
              console.log('text change', text);
              this.setState({query: text})
              if(text.length>=3){
                this.pressItem(text);
              }
            }}
            onSubmitEditing={() => {
              this.pressItem(this.state.query);
              // this.setState({ text: null });
            }}
          />
          <Button 
          title = "Query"
          onPress={()=> this.pressItem(this.state.query)}
          />
      </View>
      <List containerStyle={{marginBottom: 20}}>
          {
            results.map((l, i) => (
              <ListItem
                // roundAvatar
                // avatar={{uri:l.avatar_url}}
                key={l.name}
                title={`(${l.name}) ${l.text}`}
              />
            ))
          }
      </List>
      </ScrollView>
      );
  }
}

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

export default DetailsStack