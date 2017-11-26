import React, { Component } from 'react';
import {store} from './redux/store.js';
import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    Button,
    ActivityIndicator,
    TextInput
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";

import GuestList from './tabs/GuestList/GuestList';
import Dashboard from './tabs/Dashboard/Dashboard';
import Info from './dummy/BoilerPlate/TemporaryTab';
import GuestListNew from './tabs/GuestList/GuestListNew';
import GuestListProfile from './tabs/GuestList/GuestListProfile';
import TodoList from './tabs/TodoList/TodoList';

import Icon from 'react-native-vector-icons/Ionicons';

const Icons = require('react-native-vector-icons/Ionicons');

var homeIcon // ios-home-outline
var todolistIcon // ios-paper-outline
var checkinIcon // ios-list-outline
var guestsIcon // ios-people-outline
var rescourcesIcon // ios-help-circle-outline
var addIcon // ios-add-circle-outline

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: ''};
    }

    openApp () {
        console.log("open");
        this._populateIcons().then(() => {
        // Start app only if all icons are loaded
            this.startApp();
        }).catch((error) => {
            console.error(error);
        });
    };

    authenticate = () => {
        //console.log(this.state.username + " " + this.state.password);
        this.openApp();
    };

    forgotPassword = () => {

    };

    _populateIcons = function () {
        return new Promise(function (resolve, reject) {
          Promise.all(
            [
                Icons.getImageSource('ios-home-outline', 30),
                Icons.getImageSource('ios-list-outline', 30),
                Icons.getImageSource('ios-paper-outline', 30),
                Icons.getImageSource('ios-people-outline', 30),
                Icons.getImageSource('ios-help-circle-outline', 30),
                Icons.getImageSource('ios-add-circle-outline', 30),
            ]
          ).then((values) => {
            homeIcon = values[0];
            todolistIcon = values[1];
            checkinIcon = values[2];
            guestsIcon = values[3];
            rescourcesIcon = values[4];
            addIcon = values[5];
            resolve(true);
          }).catch((error) => {
            console.log(error);
            reject(error);
          }).done();
        });
    };

    startApp() {
        // this will start our app
        Navigation.registerComponent('Dashboard', () => Dashboard, store, Provider);
        Navigation.registerComponent('GuestList', () => GuestList, store, Provider);
        Navigation.registerComponent('GuestListProfile', () => GuestListProfile, store, Provider);
        Navigation.registerComponent('Info', () => Info, store, Provider);
        Navigation.registerComponent('CRUDnote', () => CRUDnote, store, Provider);
        Navigation.registerComponent('GuestListNew', () => GuestListNew, store, Provider);
        Navigation.registerComponent('TodoList', () => TodoList, store, Provider);

        // TODO: make the tabs link to real pages
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label:'dashboard',
                    screen: 'Dashboard',
                    title: 'Dashboard',
                    icon: homeIcon

                },
                {
                    label: 'todo_list',
                    screen: 'TodoList',
                    title: 'Action Items',
                    icon: todolistIcon
                },
                {
                    label: 'check_in',
                    screen: 'Info',
                    title: 'Check In',
                    icon: checkinIcon
                },
                {
                    label: 'guests',
                    screen: 'GuestList',
                    title: 'Guests',
                    icon: guestsIcon,
                },
                {
                    label: 'rescources',
                    screen: 'Info',
                    title: 'Rescources',
                    icon: rescourcesIcon
                }
            ]
        })
    }    

    render() {
        //console.log(this.props.data);
        return (
            <View style = {styles.container}>
            <Text style = {styles.title}> Harvard Square </Text>
            <Text style = {styles.title}> Homeless Shelter </Text>
            <Text style = {styles.title}> Volunteer App </Text>
            <View style = {styles.space}></View>
            <View style = {styles.space}></View>
            <View style = {styles.row} >
                <Icon style = {styles.icon} 
                      name="ios-mail-outline" 
                      size={25} 
                      color="#FFFFFF" 
                />
                <TextInput 
                    style={styles.textInput} 
                    placeholder='Username' 
                    placeholderTextColor = "#FFFFFF"
                    onChangeText= {(text) => this.state.username = text}
                />
            </View>
            <View style = {styles.row} >
                <Icon style = {styles.icon}
                    name="ios-lock-outline"
                    size={25} color="#FFFFFF" />
                <TextInput style={styles.textInput} 
                    placeholder='Password'
                    secureTextEntry = {true} 
                    placeholderTextColor = "#FFFFFF"
                    onChangeText= {(text) => this.state.password = text}
                />
            </View>
            <View style = {styles.space}></View>
            <View style = {styles.space}></View>
            <View style = {styles.login}>
                 <Button
                  onPress={this.authenticate}
                  title="Log in"
                  color="#FFFFFF"
                  accessibilityLabel="Learn more about this purple button"
                />
            </View>
            <View style = {styles.space}></View>
            <Text onPress={this.forgotPassword} style = {styles.forgotPassword}> 
                  Forgot your password?
            </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#770B16',
    },
    row: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 7
    },
    login : {
        //flex: 1,
        width: 260,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#556A5B',
    },
    title : {
        paddingTop: 2,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        color: "#FFFFFF",
    },
    forgotPassword : {
        fontSize: 12,
        color: "#FFFFFF",
    },
    textInput: {
        justifyContent: 'center',
        alignItems: 'center',
        color: "#FFFFFF",
        height: 30,
        width: 275,
        fontSize: 15,
        backgroundColor: '#770B16',
    },
    icon: {
        paddingRight: 10,
        paddingLeft: 7
    },
    space: {
        height: 15
    }
});