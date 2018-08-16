import React from 'react';
import { Animated, Text, View } from 'react-native';

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing (                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1.0,                // Animate to opacity: 1 (opaque)
        duration: 3000,              // Make it take a while
      }
    ).start();                       // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,        // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

const arr = []
for (var i = 0; i < 500; i++) {
  arr.push(i)
}


// You can then use your `FadeInView` in place of a `View` in your components:
export default class App extends React.Component {
  constructor () {
    super()
    this.animatedValue = []
    arr.forEach((value) => {
      this.animatedValue[value] = new Animated.Value(0)
    })
  }

  componentDidMount () {
    this.animate()
  }

  animate () {
    const animations = arr.map((item) => {
      return Animated.timing(
        this.animatedValue[item],
        {
          toValue: 1,
          duration: 50
        }
      )
    })
    Animated.sequence(animations).start()
  }

  render () {
    const animations = arr.map((a, i) => {
      return <Animated.View key={i} style={{opacity: this.animatedValue[a], height: 20, width: 20, backgroundColor: 'cyan', marginLeft: 3, marginTop: 3}} />
    })
    return (
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        {animations}
      </View>
    )
  }
}
