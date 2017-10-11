import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, Alert } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    //This is all replicated in restartGame() because javascript isn't it?
    targetNumberValue = Math.floor(Math.random() * 5) + 1;

    this.state = {guess: '', 
                  targetNumber: targetNumberValue,
                  clue: '',
                  gameOver: false,
                  level: 1,
                  rangeEnd: 5};

  }

  nextLevel() {
    newLevel = Number.parseInt(this.state.level)
    newLevel++
    this.setState({level: newLevel})
  }

  newRange() {
    newRangeEnd = Number.parseInt(this.state.rangeEnd)
    newRangeEnd = newRangeEnd * 2
    this.setState({rangeEnd: newRangeEnd})
  }

  showDialog() {
    Alert.alert(
      'YAY',
      "You got my number! Now you're on level " + this.state.level,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  winLevel() {
    this.nextLevel()
    this.newRange()
    this.restartGame()
    this.showDialog()
  }

  handleClick() {
    console.log(this.state.guess)
    console.log(this.state.targetNumber)
    if (Number.parseInt(this.state.guess) > Number.parseInt(this.state.targetNumber)) {
      this.setState({clue: "..."})
      setTimeout(() => { this.setState({clue: "TOO HIGH"})}, 200);
    } else if (Number.parseInt(this.state.guess) < Number.parseInt(this.state.targetNumber)) {
      this.setState({clue: "..."})
      setTimeout(() => { this.setState({clue: "TOO LOW"})}, 200);
    } else {
      this.setState({clue: "..."})
      setTimeout(() => { 
        this.setState({clue: "YAY"})
        this.winLevel()
        }, 
        200);
    }
  }

  restartGame() {
    targetNumberValue = Math.floor(Math.random() * this.state.rangeEnd) + 1;
    this.setState({guess: '', 
                   targetNumber: targetNumberValue,
                   clue: '',
                   gameOver: false})  
  }

  showPlayAgain() {
    if (this.state.gameOver) {
      return<Button onPress={() => { this.restartGame() }} title="Play Again" />
    }
  }

  render() {

    console.log('render called');
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <View style={{width: '100%', height: 25, backgroundColor: 'powderblue'}} />
        <View>
          <Text style={styles.title}>NUMBER GUESSER</Text>
        </View>

        <TextInput
          style={styles.guessBox}
          placeholder="Enter guess"
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={(guess) => this.setState({guess}) }
          onSubmitEditing={ () => this.handleClick() }
        />

        <Text style={styles.clue}>{this.state.clue}</Text>
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={styles.dataLabel}>LEVEL</Text>
            <Text style={styles.dataValue}>{this.state.level}</Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={styles.dataLabel}>RANGE</Text>
            <Text style={styles.dataValue}>1-{this.state.rangeEnd}</Text>
          </View>
        </View>
        <View>
          {this.showPlayAgain()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ded',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    color: 'steelblue',
    fontWeight: 'bold',
    fontSize: 30,
  },

  dataLabel: {
    color: 'steelblue',
    fontSize: 20,
    width: 100,
    height: 30
  },

  guessBox: {
    width: 100,
    height: 60,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,

  },

  dataValue: {
    color: '#14143D',
    fontSize: 40,
    fontWeight: 'bold',
    width: 100,
    height: 100
  },

  clue: {
    color: '#A04141',
    fontSize: 30,
    width: 150,
    height: 100
  }
});
