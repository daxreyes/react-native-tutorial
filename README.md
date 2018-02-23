React Native Quick Start
========================

### Prerequisites:

1. [nodejs/npm](https://nodejs.org/en/)
2. expo mobile app [ios](https://itunes.apple.com/app/apple-store/id982107779) / [android](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Steps

#### Default App

1. Install create-react-native-app
    - `npm i -g create-react-native-app`
2. Create initial mobile app
    - `create-react-native-app [app name]`
3. Run the app via yarn
    - `cd [app name]`
    - `yarn start`
4. Run the app via npm
    - `cd [app name]`
    - `npm start`
5. Open expo mobile app and scan QR code

#### React Navigation

1. Add react-navigation via yarn or npm
    - `yarn add react-navigation`
    - `npm i react-navigation`

2. Use a StackNavigator as [Home](https://reactnavigation.org/docs/hello-react-navigation.html) Screen
    - import StackNavigator
        ```
        import { StackNavigator } from 'react-navigation';
        ```

    - create HomeScreen React.Component replacing the `default class App`
        ```
        class HomeScreen extends React.Component {
            render() {
                return (
                <View style={styles.container}>
                    <Text>Home Screen</Text>
                    <Text>Changes you make will automatically reload.</Text>
                    <Text>Shake your phone to open the developer menu.</Text>
                </View>
                );
            }
        }
        ```
    - export as default the StackNavigator
        ```
        export default StackNavigator({
            Home: {
                screen: HomeScreen,
            },
        });
        ```
3. Utilize multiple screens and [navigate](https://reactnavigation.org/docs/navigating.html) them
    - import a button `import { Button, StyleSheet, Text, View } from 'react-native';`
    - add a Details Button
        ```
        class HomeScreen extends React.Component{
            render(){
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
        ```
    - create Details screen with Go back Button
        ```
        class DetailsScreen extends React.Component{
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
        ```