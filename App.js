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
                  rangeEnd: 5,
                  guesses: 0
                  };

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
    this.setState({guesses: this.state.guesses + 1})
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

      <View style={styles.container}>
        <View style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: 'steelblue',
          height: '70%'
        }}>
          <View style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
            <View style={{width: '100%', height: 50, backgroundColor: 'steelblue',
                          justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[styles.title, styles.thefont]}>NUMBER GUESSER</Text>
            </View>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: '40%', 
            alignItems: 'center'
          }}>
            <View style={{width: '33%', height: 50, 
                          justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[styles.rangeValue, styles.thefont]}>1</Text>   
            </View>       
            <TextInput
              style={styles.guessBox}
              keyboardType="numeric"
              returnKeyType="done"
              onChangeText={(guess) => this.setState({guess}) }
              onSubmitEditing={ () => this.handleClick() }
            />
            <View style={{width: '33%', height: 50,
                          justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[styles.rangeValue, styles.thefont]}>{this.state.rangeEnd}</Text>   
            </View> 
          </View>
        </View>


        <View style={{
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center'
        }}>
          <Text style={[styles.clue, styles.thefont]}>{this.state.clue}</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>    
          <View style={{width: '40%', height: 100}}>
            <Text style={[styles.dataValue, styles.thefont]}>{this.state.level}</Text>
            <Text style={[styles.dataLabel, styles.thefont]}>LEVEL</Text>
          </View>
          <View style={{width: '40%', height: 120}}>
            <Text style={[styles.dataValue, styles.thefont]}>{this.state.guesses}</Text>
            <Text style={[styles.dataLabel, styles.thefont]}>GUESSES</Text>
          </View>
        
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fafafd'
  },

  thefont: {
    fontFamily: 'Roboto' 
  },

  title: {
    color: 'white',
    fontSize: 30,
  },

  dataLabel: {
    color: '#aaa',
    fontSize: 16,
    width: 100,
    height: 20,
    fontWeight: 'bold'
  },

  rangeValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },

  guessBox: {
    width: 100,
    height: 60,
    fontSize: 40,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    color: 'white'
  },

  dataValue: {
    color: '#14143D',
    fontSize: 30,
    width: 100,
    height: 35
  },

  clue: {
    color: 'steelblue',
    fontSize: 30,
    fontWeight: 'bold',
    width: 150,
    height: 100
  }
});
