import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Text, Animated, ViewPropTypes, Easing} from 'react-native'
import px2dp from './../Util/px2dp'
import theme from './../Constants/theme'

export default class Toast extends PureComponent {
  constructor (props) {
    super(props)
    this.show = this.show.bind(this)
    this.offset = new Animated.Value(0)
    this.opacity = new Animated.Value(0)
    this.state = {
      show: false,
      text: ''
    }
  }
  static propTypes = {
    top: PropTypes.number,
    duration: PropTypes.number,
    toastStyle: ViewPropTypes.style
  }
  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
  }
  show (text = '', timeout = 2000, cb = () => { }) {
    const {duration = 200} = this.props
    this.setState(
      {show: true, text: text},
      () => {
        Animated.parallel([
          Animated.timing(
            this.opacity,
            {
              easing: Easing.linear,
              duration: 300,
              toValue: 0.8
            }
          ),
          Animated.timing(
            this.offset,
            {
              easing: Easing.linear,
              duration: 300,
              toValue: 0
            }
          )
        ]).start()
        this.timer = setTimeout(() => {
          Animated.parallel([
            Animated.timing(
              this.opacity,
              {
                easing: Easing.linear,
                duration: 300,
                toValue: 0
              }
            ),
            Animated.timing(
              this.offset,
              {
                easing: Easing.linear,
                duration: 300,
                toValue: 1
              }
            )
          ]).start(() => this.setState({show: false, text: ''}, cb))
        }, timeout - duration)
      }
    )
  }
  render () {
    if (!this.state.show) return null
    return (
      <Animated.View
        style={[
          styles.container,
          {top: this.props.top || 0},
          this.props.toastStyle,
          {
            // opacity: this.opacity,
            transform: [
              {
                translateY: this.offset.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -40 - (this.props.top || 0)]
                })
              }
            ]
          }
        ]}
      >
        <Text style={styles.text} numberOfLines={1}>
          {this.state.text}
        </Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'rgba(90,90,90,0.8)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: theme.screenWidth,
    left: 0,
    top: 0,
    padding: px2dp(10)
  },
  text: {
    flex: 1,
    color: '#fff',
    fontSize: px2dp(14),
    textAlign: 'center'
  }
})
