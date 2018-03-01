/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity
} from 'react-native';
import Popup from "../../modules/popups/popup";
import Counter from "../../modules/Counter";
import Icon from 'react-native-vector-icons/Ionicons';


const instructions = Platform.select({
    ios: 'please make me an ios screen!',
    android: 'please make me an android screen!'
});

export default class Info extends Component {
    constructor(props) {
      super(props);
      this.counters = {"Example Counter": 666};
    }

    // Sample function to render the item counters. To add new counters,
    // add elements to this.counters (item list could also come from redux)
    // Counter spacing issues are probably in Counter.js
    renderCounters() {
      let items = Object.keys(this.counters);
      return (
        <View style={styles.counterContainer}>
            {
              items.map((name) =>
                      <Counter
                        key={name}
                        itemName={name}
                        count={this.counters[name]}
                        onValueChange={(val) =>
                            {
                              this.counters[name] = val;
                            }}
                      />)
              }
        </View>
      );
    }

    render() {
        return (
          <View>
            <Text
            onPress= {()=>{this.Popup.show()}}
            >
            {"Click me to open"}
            </Text>
            <View style={styles.container}>
                <Popup
                  ref={(popup) => {
                      this.addCounterDialog = popup;
                  }}
                  title={"Add a New Item"}
                  onConfirm={()=>{}}
                  >
                  <Text>Test</Text>
                  <Text>Test</Text>
                </Popup>
            </View>
            {this.renderCounters()}
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    instructions: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    popupDialogButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    textInput: {
      marginTop: 3,
      height: 40,
      width: "80%",
      borderColor: 'gray',
      borderWidth: 1
    },
});
