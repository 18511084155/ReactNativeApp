/**
 * Created by Joe on 2017/10/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import px2dp from '../../../../Util/px2dp'
import theme from '../../../../Constants/theme'
import {repayStatus} from '../../static'
import { Paragraph, Heading } from '../../../../Components/Text'
import { AlertModel } from '../../../../Components'

export default class Header extends React.Component {
  constructor () {
    super(...arguments)
    this._renderTag = this._renderTag.bind(this)
  }
  static propTypes = {
    data: PropTypes.object
  }
  _renderTag () {
    let { data } = this.props
    if (!data.hasOrder) {
      return <UnConsumed data={data} />
    }
    switch (data.repayStatus) {
      case repayStatus.unConsumed : {
        return <UnConsumed data={data} />
      }
      case repayStatus.NonRepayment : {
        return <NonRepayment data={data} />
      }
      case repayStatus.AlreadyRepaid : {
        return <AlreadyRepaid />
      }
      case repayStatus.MinimumRepayment : {
        return <MinimumRepayment data={data} />
      }
      case repayStatus.Overdue : {
        return <Overdue data={data} />
      }
      default : { return <View /> }
    }
  }
  render () {
    return (
      <View>
        {this._renderTag()}
      </View>
    )
  }
}

class UnConsumed extends React.Component {
  render () {
    return (
      <View>
        <View style={styles.ucLogoView}>
          <Image style={styles.ucLogo} source={require('./../../../../Assets/noBill.png')} />
        </View>
        <View style={styles.hintView}>
          <Paragraph style={styles.ucHint}>账单未出</Paragraph>
        </View>
      </View>
    )
  }
}

class NonRepayment extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }
  render () {
    let { data } = this.props
    return (
      <View>
        <View style={styles.dateView}>
          <Paragraph style={styles.date}>最后还款日 {data.dueDate}</Paragraph>
        </View>
        <View style={styles.titleView}>
          <Paragraph style={styles.title}>本月待还</Paragraph>
        </View>
        <View style={styles.feeView}>
          <Heading style={styles.fee}>{data.shouldRepay}</Heading>
        </View>
        <View style={styles.hintView}>
          <Paragraph style={styles.hint}>最低应还 {data.lowest}</Paragraph>
        </View>
      </View>
    )
  }
}

class AlreadyRepaid extends React.Component {
  render () {
    return (
      <View>
        <View style={styles.logoView}>
          <Image style={styles.logo} source={require('./../../../../Assets/paySccess.png')} />
        </View>
        <View style={styles.hintView}>
          <Paragraph style={styles.hint}>本月账单全部还清</Paragraph>
        </View>
      </View>
    )
  }
}

class MinimumRepayment extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }
  render () {
    let { data } = this.props
    return (
      <View>
        <View style={styles.dateView}>
          <Paragraph style={styles.date}>最后还款日 {data.dueDate}</Paragraph>
        </View>
        <View style={styles.titleView}>
          <Paragraph style={styles.title}>本月待还</Paragraph>
        </View>
        <View style={styles.feeView}>
          <Heading style={styles.fee}>{data.shouldRepay}</Heading>
        </View>
        <View style={styles.hintView}>
          <TouchableOpacity onPress={() => { this.refs.AlertModel.show() }} style={styles.hintView}>
            <Paragraph style={styles.hint}>已还最低</Paragraph>
            <Image style={styles.infoLogo} source={require('./../../../../Assets/hintNormal.png')} />
          </TouchableOpacity>
        </View>
        <AlertModel
          ref='AlertModel'
          title='以最低还款金额进行还款，不会影响个人信用。'
          btnInfo={{ok: '知道了'}}
        />
      </View>
    )
  }
}

class Overdue extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }
  render () {
    let { data } = this.props
    return (
      <View>
        <View style={styles.dateView}>
          <Paragraph style={styles.date}>最后还款日 {data.dueDate}</Paragraph>
        </View>
        <View style={styles.titleView}>
          <Paragraph style={styles.title}>本月待还</Paragraph>
        </View>
        <View style={styles.feeView}>
          <Heading style={styles.fee}>{data.shouldRepay}</Heading>
        </View>
        <View style={styles.hintView}>
          <Paragraph style={styles.hint}>最低应还 {data.lowest}</Paragraph>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dateView: {
    alignItems: 'flex-end'
  },
  date: {
    fontSize: px2dp(12),
    color: theme.textLightColor
  },
  titleView: {
    alignItems: 'center',
    marginTop: px2dp(18)
  },
  title: {
    fontSize: px2dp(14),
    color: theme.textColor
  },
  feeView: {
    alignItems: 'center'
  },
  fee: {
    fontSize: px2dp(48),
    color: theme.textColor
  },
  hintView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hint: {
    fontSize: px2dp(14),
    color: theme.textColor
  },
  ucHint: {
    fontSize: px2dp(16),
    color: theme.textColor
  },
  ucLogoView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: px2dp(50),
    paddingBottom: px2dp(17)
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: px2dp(40),
    paddingBottom: px2dp(45)
  },
  ucLogo: {
    width: px2dp(53),
    height: px2dp(65)
  },
  logo: {
    width: px2dp(45),
    height: px2dp(45)
  },
  infoLogo: {
    width: px2dp(13),
    height: px2dp(13),
    marginLeft: px2dp(5)
  }
})
