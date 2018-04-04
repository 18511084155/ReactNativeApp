import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native'
import { Paragraph } from './../../../Components/Text'
import px2dp from './../../../Util/px2dp'
import theme from './../../../Constants/theme'
import {navi} from './../static'

export default class TabBar extends React.Component {
  constructor () {
    super(...arguments)
    this._renderItem = this._renderItem.bind(this)
  }
  static propTypes = {
    order: PropTypes.number,
    goPage: PropTypes.func
  }
  _renderItem () {
    let {order, goPage} = this.props
    return navi.map((item, i) => {
      let selected = order === item.order
      return (
        <TouchableHighlight
          key={'item_' + i}
          underlayColor={'rgba(225, 225, 225, 0.75)'}
          style={styles.around}
          onPress={e => selected ? null : goPage(item.order)}
        >
          <View style={styles.around}>
            <Image style={styles.img} source={selected ? item.selectedImg : item.unSelectedImg} />
            <Paragraph
              style={[
                styles.name,
                {color: selected ? theme.themeColor : theme.displayColor}
              ]}
            >
              {item.name}
            </Paragraph>
          </View>
        </TouchableHighlight>
      )
    })
  }
  render () {
    return (
      <View style={styles.container}>
        {this._renderItem()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: px2dp(50),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: theme.borderWidth,
    borderColor: theme.borderColor
  },
  around: {
    flex: 1,
    height: px2dp(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  img: {
    width: px2dp(20),
    height: px2dp(20)
  },
  name: {
    fontSize: px2dp(10),
    marginTop: px2dp(2)
  }
})
