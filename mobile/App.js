import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon, Input, List, ListItem } from 'react-native-elements';
import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

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
    db.transaction(
      tx => {
        tx.executeSql("SELECT COUNT(*) FROM docs",[], (_, { rows }) =>
          console.log('count', JSON.stringify(rows))
        );
        tx.executeSql("SELECT docid, content FROM docs WHERE docs MATCH ?",[searchQuery], (_, { rows }) =>{
          console.log('fts query', JSON.stringify(rows));
          this.setState({results: rows._array});
        }
        );
      },);
  };
  render(){
    let results = this.state.results;
    console.log('results', results);
    return(
      <ScrollView>
      <View style={styles.container}>
          <Text> Details Screen</Text>
          <Button 
          title = "Go Back"
          onPress={()=> this.props.navigation.goBack()}
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
                key={l.docid}
                title={l.content}
              />
            ))
          }
      </List>
      </ScrollView>
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
  componentDidMount() {
    db.transaction(tx => {
      let queries = [
        "DROP TABLE IF EXISTS docs",
        "CREATE VIRTUAL TABLE docs USING fts4()",
        "INSERT INTO docs(docid, content) VALUES(1, 'a database is a software system')",
        "INSERT INTO docs(docid, content) VALUES(2, 'sqlite is a software system')",
        "INSERT INTO docs(docid, content) VALUES(3, 'sqlite is a database')"
      ]
      queries.forEach((q,i)=>{
        console.log('executing', q);
        tx.executeSql(q,[],(_, { res })=>{console.log('suc', _, res);},(_, { err })=>{console.log('error', _, err);});
      });
    });
  }

  render(){
      return <RootStack />
  }
}
