import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Alert,
    TextInput,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import { Icon, List, ListItem, SearchBar, CheckBox } from "react-native-elements";
import {connect} from 'react-redux';
import ChooseLocationPopup from '../../modules/popups/ChooseLocationPopup';

import TagGuestPopup from "../../modules/popups/TagGuestPopup"
import renderSeperator from '../../modules/UI/renderSeperator'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addNewActionItem, getActionItems, editActionItem} from "../../redux/actions";

function mapStateToProps(state, ownProps) {
    var guests = guestObjectToArray(state.guests, state.interactions);
    return {
        guests: guests,
        item: null, //state.actionItems[ownProps.id],
        loading: state.loading,
    };
}

function mapDispatchToProps(dispath, ownProps) {
    return {
        addNewActionItem: addNewActionItem,
        editActionItem: editActionItem,
        getActionItems: getActionItems
    };
}

function guestObjectToArray(IdsToGuests, IdsToInteractions) {
    var guestList = [];
    for (var Id in IdsToGuests) {
        guestList.push({
            "Id" : Id,
            "name" : IdsToGuests[Id].name,
        });
    }
    console.log(guestList);
    return guestList;
}

class ActionItem_edit extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state = {
            id: this.props.id ? this.props.id : null,
            title: this.props.title ? this.props.title : '',
            taggedGuests: this.props.taggedGuests ? this.props.taggedGuests : [],

            // TODO: geeze why is this longitude latitude and other places lat lng? cause google maps api sucks. please let's fix this later.
            locationCoords: this.props.locationCoords ? this.props.locationCoords : {
            	longitude: 0,
            	latitude: 0,
            },
            selectedLocation: this.props.selectedLocation ? this.props.selectedLocation : null,
            locationName: this.props.locationName ? this.props.locationName : "No Location Selected",
            selectedDate: this.props.selectedDate ? this.props.selectedDate : "",
            dateName: this.props.dateName ? this.props.dateName : "No Date Selected",
            description: this.props.description ? this.props.description : "",
        };
    };

    componentDidMount() {
        this.props.navigator.setButtons({
            rightButtons: [
                {
                    title: 'Save', // for a textual button, provide the button title (label)
                    id: 'save_actionItem', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                    disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
                    disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
                    showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
                    buttonColor: 'white', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                    buttonFontSize: 18, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                    buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
                }
            ]
        });
    };

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'save_actionItem') { // this is the same id field from the static navigatorButtons definition

            	// Don't allow empty fields
            	if (this.state.title == "") {
            		alert("Title cannot be empty");
            		return;
            	}

              // It's new if there is no ID
              if (!this.state.id) {
                addNewActionItem(false, this.state.title, "creationTimestamp", this.state.locationCoords, this.state.locationName, "shiftDate", this.state.description, this.state.taggedGuests.map(guest => guest.Id), "volunteerId");
              } else {
                editActionItem(this.state.id, false, this.state.title, "creationTimestamp", this.state.locationCoords, this.state.locationName, "shiftDate", this.state.description, this.state.taggedGuests.map(guest => guest.Id), "volunteerId");
              }

              getActionItems();
              this.props.navigator.pop({
                  animated: true, // does the pop have transition animation or does it happen immediately (optional)
                  animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
                });
            }
        }
    };

    setSelectedGuests = (guests) => {
      this.setState({
        taggedGuests: guests
      });
    }

    setChosenLocation = (locationName, locationCoords) => {
        this.setState({
            locationName: locationName,
            locationCoords: locationCoords,
        });
    };

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.back}>
                    <TextInput
                        value = {this.state.title}
                        editable = {true}
                        placeholder = "Title"
                        style = {styles.title}
                        placeholderTextColor = '#d3d3d3'
                        onChangeText={(title) => {this.setState({'title': title});}}
                    />
                    <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        <View style = {styles.icon}>
                            <Icon
                                raised
                                color='#770B16'
                                name='person'
                                size={16}
                                onPress={() => {
                                    this.tagGuestDialog.show();
                                }}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={1} style={{textAlign: 'right', margin: 10}}>{this.state.taggedGuests.length +  " Guests Selected"}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        <View style = {styles.icon}>
                            <Icon
                                raised
                                color='#770B16'
                                name='location-on'
                                size={16}
                                onPress={() => {
                                    this.ChooseLocationPopup.show()
                                }}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={1}
                                  style={{textAlign: 'right', margin: 10}}>{this.state.locationName}</Text>

                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        <View style = {styles.icon}>
                            <Icon
                                raised
                                color='#770B16'
                                name='timer'
                                size={16}
                                onPress={() => {
                                    alert("Make this connect to the calendar picker!")
                                }}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={1}
                                  style={{textAlign: 'right', margin: 10}}>{this.state.dateName}</Text>

                        </View>
                    </View>
                    <TextInput
                        editable = {true}
                        placeholder = "Description"
                        style = {styles.description}
                        multiline = {true}
                        onChangeText={(description) => this.state.description = description}
                    />
                </View>
                <TagGuestPopup
                    ref={(dialog) => {
                        this.tagGuestDialog = dialog;
                    }}
                    guests={this.props.guests}
                    loading={this.props.loading}
                    onConfirm={this.setSelectedGuests}
                />
                <ChooseLocationPopup
                  ref={(map) => {
                      this.ChooseLocationPopup = map;
                  }}
                  onConfirm={this.setChosenLocation}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#E9E9E9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    back: {
        backgroundColor: '#FFFFFF',
        alignSelf: "stretch",
    },
    title: {
        paddingTop: 20,
        paddingLeft: 20,
        color: "#000000",
        fontSize: 30,
        paddingBottom: 5
    },
    icon: {
        //paddingRight: 10,
        paddingLeft: 15
    },
    row: {
        flexDirection: "row",
        paddingTop: 5,
        paddingLeft: 20
    },
    daterow: {
        flexDirection: "row",
        paddingTop: 5,
        paddingLeft: 18
    },
    add: {
        paddingLeft: 2,
        color: '#0645AD',
        textDecorationLine: 'underline'
    },
    dateadd: {
        color: '#0645AD',
        textDecorationLine: 'underline'
    },
    description: {
        borderWidth: 0.5,
        marginTop: 15,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        height: 100,
        padding: 5,
        fontSize: 15,
        marginBottom: 30
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionItem_edit );