import React from 'react'
import { View, Image, StyleSheet, Text, ViewPropTypes, TouchableOpacity } from 'react-native'
import { Paragraph } from '../../../Components/Text'
import PropTypes from 'prop-types'
import px2dp from '../../../Util/px2dp'
import theme from '../../../Constants/theme'

const GoodItem = ({goodImg, name, currentPrice, price, label, labelColor, activity, style, vertical}) => {
  return (<TouchableOpacity activeOpacity={0.7} style={[styles.itemContainer, style]}>
    {label ? (<View style={styles.label}>
      <Text style={styles.labelText}>{label}</Text>
    </View>) : null}
    <Image style={vertical ? styles.verticalGoodImage : styles.goodImage} source={goodImg} />
    {activity ? (<View style={styles.activity}>
      <Text style={styles.activityText}>{activity}</Text>
    </View>) : null}
    <Paragraph style={{marginTop: activity ? null : px2dp(15), fontSize: vertical ? 14 : 12, fontWeight: vertical ? theme.regularFont : theme.lightFont, textAlign: 'center'}}>{name}</Paragraph>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Paragraph style={{color: '#BD081C', fontSize: 14}}>{currentPrice}</Paragraph>
      <Paragraph style={{marginLeft: 2, color: '#999999', fontSize: 10, textDecorationLine: 'line-through'}}>{price}元</Paragraph>
    </View>
  </TouchableOpacity>)
}

GoodItem.propTypes = {
  style: ViewPropTypes.style,
  goodImg: Image.propTypes.source,
  name: PropTypes.string,
  currentPrice: PropTypes.string,
  price: PropTypes.string,
  label: PropTypes.string,
  activity: PropTypes.string,
  labelColor: PropTypes.string,
  vertical: PropTypes.bool
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  goodImage: {
    width: px2dp(114),
    height: px2dp(90),
    resizeMode: 'center'
  },
  verticalGoodImage: {
    width: (theme.screenWidth - 2) / 2,
    height: px2dp(145),
    resizeMode: 'center'
  },
  label: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#417505',
    width: px2dp(40),
    height: px2dp(16),
    top: 10,
    right: 10,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelText: {
    color: '#417505',
    fontSize: px2dp(10)
  },
  activity: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#417505',
    height: px2dp(16),
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activityText: {
    color: '#417505',
    fontSize: px2dp(12)
  }
})

export default GoodItem
