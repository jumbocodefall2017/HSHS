/* GuestProfile */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native';
import { List, ListItem } from "react-native-elements";
import nodeEmoji from 'node-emoji';
import {connect} from 'react-redux';

const Timestamp = require('react-timestamp');

function mapStateToProps(state, ownProps) {
    return {
        guest: state.guests[ownProps.Id],
        loading: state.loading,
        testing: state
    };
}


class GuestProfile extends Component {
    constructor(props) {
        super(props);
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        console.log(this.props.testing);
    };

    // matching receptivity to emojis {0-4} where 4 is the best and 0 is the worst
    id_to_emoji = [":smirk:", ":slightly_smiling_face:", ":grinning:", ":smiley:", ":smile:"];

    /********************** Helper functions section **********************/

    // gets emoji from receptive value
    get_receptive = () => {
        return(nodeEmoji.get(this.id_to_emoji[this.profile_data.receptive]));
    };

    /********************** Render functions section **********************/

    // renders name on profile page
    render_name = () => {
        return (
            <Text style={styles.name}>
                {this.props.guest.name}
            </Text>
        );
    };

    // renders age on profile page
    render_age = () => {
        return (
            <Text style={styles.age}>
                {this.props.guest.age}
            </Text>
        );
    };

    // renders gender on profile page
    render_gender = () => {
        return (
            <Text>
                {this.props.guest.gender}
            </Text>
        );
    };

    render_age_gender = () => {
        return (
            <View style={styles.age_gender}>
                {this.render_gender()}
                {this.render_age()}
            </View>
        );
    };

    // renders gender on profile page
    render_hairColor = () => {
        return (
            <Text style={styles.note}>
                {this.props.guest.hairColor}
            </Text>
        );
    };

    // renders gender on profile page
    render_tattoo = () => {
        return (
            <Text>
                {this.props.guest.tattoo}
            </Text>
        );
    };

    // renders receptive value (emoji?)
    render_receptive = () => {
        return (
            <Text>
                Receptive: {this.props.guest.get_receptive()}
            </Text>
        );
    };

    // renders last interacted
    render_interacted = () => {
        return (
            <Text style={styles.last_interacted}>
                Last Interacted: <Timestamp time={this.props.guest.last_interacted} component={Text}/>
            </Text>
        );
    };

    // renders description
    render_description = () => {
        return (
            <Text style={styles.description}>
                {this.props.guest.description}
            </Text>
        );
    };

    // render notes
    render_notes = () => {
        let note_list = this.profile_data.notes;
        if(note_list) {
            return (
                <View style={styles.note_section}>
                    <Text style={styles.notes}>
                        Notes:
                    </Text>
                    <FlatList
                        data={note_list}
                        renderItem={({ item }) => (
                            <ListItem
                                title={item.note}
                            />
                        )}
                        style={styles.note}
                        keyExtractor={item => item.note}
                    />
                </View>
            );
        }
    };

    /********************** Setup screen **********************/

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.profile_info}>
                        {this.render_name()}
                        {this.render_age_gender()}
                        {this.render_interacted()}
                        {this.render_description()}
                        {/*{this.render_receptive()}*/}
                    </View>
                </View>
                <View>
                    <Text>
                        THIS IS WHERE OTHER STUFF GOES
                    </Text>
                </View>
                {/*{this.render_notes()}*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    top: {
        flex: 0.33,
        flexDirection: "column",
        flexWrap: "nowrap",
        padding: 10,
        alignItems: "stretch",
        justifyContent: "flex-end",
        backgroundColor: "#E5DEDE",
    },
    note_section: {
        flex: 5,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        margin: 10,
        padding: 10,
    },
    note: {
        flexDirection: 'row',
    },
    notes: {
        fontSize: 15,
    },
    name: {
        fontSize: 35,
        textDecorationColor:'#686868',
        fontFamily: 'Times New Roman',
        marginBottom: 10,
    },
    profile_image: {
        flex: 0.55,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
    },
    profile_info: {
        flex: 0.8,
        flexDirection: 'column',
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
        borderRadius: 12,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        margin: 10,
    },
    last_interacted: {
        fontWeight: "100",
        fontStyle: 'italic',
        color: "#7E7E7E",
    },
    age_gender: {
        flexDirection: "row",
    },
    age: {
        paddingLeft: 20,
    },
    description: {
        paddingTop: 10,
    },
});

export default connect(mapStateToProps)(GuestProfile);
