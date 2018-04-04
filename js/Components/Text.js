import React from 'react'
import { StyleSheet, Text } from 'react-native'
import theme from '../Constants/theme'
import px2dp from '../Util/px2dp'

export const HeadingBig = ({style, ...props}) => {
  return <Text style={[styles.h0, style]} {...props} />
}

export const Heading = ({style, ...props}) => {
  return <Text style={[styles.h1, style]} {...props} />
}

export const Paragraph = ({style, ...props}) => {
  return <Text style={[styles.p, style]} {...props} />
}

export const Label = ({style, ...props}) => {
  return <Text style={[styles.label, style]} {...props} />
}

HeadingBig.propTypes = {
  style: Text.propTypes.style
}

Heading.propTypes = {
  style: Text.propTypes.style
}

Paragraph.propTypes = {
  style: Text.propTypes.style
}

Label.propTypes = {
  style: Text.propTypes.style
}

const styles = StyleSheet.create({
  h0: {
    fontSize: px2dp(30),
    color: theme.textColor,
    fontWeight: theme.SemiFont,
    fontFamily: theme.fontFamily,
    backgroundColor: 'transparent'
  },
  h1: {
    fontSize: px2dp(24),
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    backgroundColor: 'transparent',
    fontWeight: theme.regularFont
  },
  p: {
    fontSize: px2dp(12),
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    backgroundColor: 'transparent',
    fontWeight: theme.lightFont
  },
  label: {
    fontSize: px2dp(13),
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    backgroundColor: 'transparent'
  }
})

