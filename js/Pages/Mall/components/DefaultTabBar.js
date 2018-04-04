const React = require('react')
const { StyleSheet, Text, View, Animated, TouchableNativeFeedback, Platform, TouchableOpacity, ViewPropTypes } = require('react-native')
const PropTypes = require('prop-types')
const createReactClass = require('create-react-class')
const Button = Platform.OS === 'android' ? (props) => {
  return <TouchableNativeFeedback
    delayPressIn={0}
    background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
    {...props}
    >
    {props.children}
  </TouchableNativeFeedback>
} : (props) => {
  return <TouchableOpacity {...props}>
    {props.children}
  </TouchableOpacity>
}

const DefaultTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style
  },

  getDefaultProps () {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null
    }
  },

  renderTabOption (name, page) {
  },

  renderTab (name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle } = this.props
    const textColor = isTabActive ? activeTextColor : inactiveTextColor
    const fontWeight = isTabActive ? 'bold' : 'normal'

    return <Button
      style={{flex: 1}}
      key={name}
      accessible
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle]}>
        <Text style={[{color: textColor, fontWeight}, textStyle]}>
          {name}
        </Text>
      </View>
    </Button>
  },

  render () {
    const containerWidth = this.props.containerWidth
    const customUnderWidth = this.props.customUnderWidth
    const numberOfTabs = this.props.tabs.length
    const r = containerWidth / numberOfTabs
    let oWidth = r
    let oLeft = 0
    if (customUnderWidth < r) {
      oWidth = customUnderWidth
      oLeft = (r - customUnderWidth) / 2
    }
    const tabUnderlineStyle = {
      position: 'absolute',
      width: oWidth,
      left: oLeft,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0
    }

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs]
    })
    return (
      <View style={[ styles.tabs, { backgroundColor: this.props.backgroundColor }, this.props.style ]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page
          const renderTab = this.props.renderTab || this.renderTab
          return renderTab(name, page, isTabActive, this.props.goToPage)
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [
                { translateX }
              ]
            },
            this.props.underlineStyle
          ]}
        />
      </View>
    )
  }
})

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc'
  }
})

module.exports = DefaultTabBar
