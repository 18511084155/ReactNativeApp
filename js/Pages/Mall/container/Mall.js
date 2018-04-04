import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import DefaultTabBar from '../components/DefaultTabBar'
import Swiper from 'react-native-swiper'
import px2dp from '../../../Util/px2dp'
import theme from '../../../Constants/theme'
import { Heading, Paragraph } from '../../../Components/Text'
import GoodItem from '../components/GoodItem'

const goodList = [
  {
    id: 1,
    goodImg: require('../../../Assets/goodexample.png'),
    name: 'test',
    currentPrice: '100.00',
    price: '120.00',
    // label: '免息',
    // activity: '满99元减10元',
    labelColor: 'red'
  },
  {
    id: 2,
    goodImg: require('../../../Assets/goodexample.png'),
    name: 'test',
    currentPrice: '100.00',
    price: '120.00',
    // label: '免息',
    // activity: '满99元减10元',
    labelColor: 'red'
  },
  {
    id: 3,
    goodImg: require('../../../Assets/goodexample.png'),
    name: 'test',
    currentPrice: '100.00',
    price: '120.00',
    // label: '免息',
    // activity: '满99元减10元',
    labelColor: 'red'
  },
  {
    id: 4,
    goodImg: require('../../../Assets/goodexample.png'),
    name: 'test',
    currentPrice: '100.00',
    price: '120.00',
    // label: '免息',
    // activity: '满99元减10元',
    labelColor: 'red'
  }
]

const vgoodList = [
  {
    id: 1,
    goodImg: require('./baidi.png'),
    name: 'test',
    currentPrice: '100.00',
    price: '120.00',
    label: '免息',
    activity: '满99元减10元',
    labelColor: 'red'
  },
  {
    id: 2,
    goodImg: require('./baidi.png'),
    name: 'test',
    currentPrice: '100.00',
    price: '120.00',
    label: '免息',
    activity: '满99元减10元',
    labelColor: 'red'
  },
  {
    id: 3,
    goodImg: require('./baidi.png'),
    name: 'test',
    currentPrice: '100.00',
    price: '120.00',
    label: '免息',
    activity: '满99元减10元',
    labelColor: 'red'
  },
  {
    id: 4,
    goodImg: require('./baidi.png'),
    name: 'test',
    currentPrice: '100.00',
    price: '120.00',
    label: '免息',
    activity: '满99元减10元',
    labelColor: 'red'
  }
]

const MenuItem = [{id: 1, key: '生活服务'}, {id: 2, key: '兴趣馆'}, {id: 3, key: '手机数码'}, {id: 4, key: '生活服务1'}, {id: 5, key: '兴趣馆1'}, {id: 6, key: '手机数码1'}, {id: 7, key: '生活服务2'}, {id: 8, key: '兴趣馆2'}, {id: 9, key: '手机数码2'}, {id: 10, key: '生活服务3'}, {id: 11, key: '兴趣馆3'}, {id: 12, key: '手机数码3'}]

const catalogList = [{
  id: 0,
  photo: require('./catalogitem.png'),
  text: '爱游戏'
}, {
  id: 1,
  photo: require('./catalogitem.png'),
  text: '爱游戏'
}, {
  id: 2,
  photo: require('./catalogitem.png'),
  text: '爱游戏'
}, {
  id: 3,
  photo: require('./catalogitem.png'),
  text: '爱游戏'
}, {
  id: 4,
  photo: require('./catalogitem.png'),
  text: '爱游戏'
}, {
  id: 5,
  photo: require('./catalogitem.png'),
  text: '爱游戏'
}, {
  id: 6,
  photo: require('./catalogitem.png'),
  text: '爱游戏'
}, {
  id: 7,
  photo: require('./catalogitem.png'),
  text: '爱游戏'
}, {
  id: 8,
  photo: require('./catalogitem.png'),
  text: '爱游戏'
}, {
  id: 9,
  photo: require('./catalogitem.png'),
  text: '爱游戏'
}]

const renderTabBar = props => (<DefaultTabBar {...props} style={styles.tabBar} customUnderWidth={80} />)

class Mall extends Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      itemIndex: MenuItem[0].id,
      contentWidth: 0,
      key: Math.random()
    }
  }

  componentDidMount () {
    setTimeout(() => this.setState({key: Math.random()}), 1)
  }

  _renderLifeItem () {
    let item = []
    for (let i = 0; i < 5; i++) {
      item.push(<View key={i} style={styles.lifeItem}>
        <Image style={{height: px2dp(50), width: px2dp(50), marginBottom: px2dp(10)}} source={require('./shoujichongzhi.png')} />
        <Paragraph style={{ textAlign: 'center' }}>文案</Paragraph>
      </View>)
    }
    return item
  }
  _renderRecommend () {
    return (<View style={styles.lifeHouse}>
      <View>
        <Heading style={{ fontSize: 15, fontWeight: theme.mediumFont }}>生活馆</Heading>
      </View>
      <Swiper key={this.state.key} removeClippedSubviews={false} style={styles.wrapper} loop={false} activeDotColor={'#999999'} dotStyle={{ height: px2dp(5), width: px2dp(5) }} activeDotStyle={{ height: px2dp(5), width: px2dp(5) }}>
        <View style={styles.slide}>
          {this._renderLifeItem()}
        </View>
        <View style={styles.slide}>
          {this._renderLifeItem()}
        </View>
      </Swiper>
    </View>)
  }

  _renderButtonList () {
    return (<View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => { }}>
        <View style={styles.textContainer}>
          <Heading style={{fontSize: 14}}>新品首发</Heading>
          <Paragraph style={{fontSize: 12, color: '#999999'}}>新品特价尝鲜</Paragraph>
        </View>
        <Image
          style={styles.imageButton}
          source={require('../../../Assets/recommend-left.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { }}>
        <View style={styles.textContainer}>
          <Heading style={{fontSize: 14}}>热销榜单</Heading>
          <Paragraph style={{fontSize: 12, color: '#999999'}}>跟大数据剁手</Paragraph>
        </View>
        <Image
          style={styles.imageButton}
          source={require('../../../Assets/recommend-right.png')} />
      </TouchableOpacity>
    </View>)
  }

  _renderSeckill () {
    return (<View style={styles.seckillContainer}>
      <View style={styles.seckillHeader}>
        <Heading style={{ fontSize: px2dp(15) }}>今日秒杀</Heading>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Paragraph>距结束</Paragraph>
            <Paragraph style={styles.timeText}>07</Paragraph>
            <Paragraph>:</Paragraph>
            <Paragraph style={styles.timeText}>07</Paragraph>
            <Paragraph>:</Paragraph>
            <Paragraph style={styles.timeText}>07</Paragraph>
          </View>
          <TouchableOpacity>
            <Paragraph style={styles.labelButton}>好货限时限量秒 ></Paragraph>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal bounces={false} style={styles.goodList}>
        {this._renderGoodList()}
      </ScrollView>
    </View>)
  }

  _renderGoodList () {
    return goodList.map((item, index) => <GoodItem key={item.id} style={index !== (goodList.length - 1) ? {marginRight: px2dp(20)} : null} {...item} />)
  }

  _renderMenuItem () {
    return <FlatList
      showsVerticalScrollIndicator={false}
      bounces={false}
      data={MenuItem}
      extraData={this.state.itemIndex}
      keyExtractor={(item, index) => item.id}
      renderItem={({item}) => <TouchableWithoutFeedback onPress={() => this._onPressItem(item)}>
        <View style={[styles.menuItem, item.id === this.state.itemIndex ? styles.selectedItem : null]}>
          <Paragraph style={[{ fontSize: px2dp(14) }, item.id === this.state.itemIndex ? {color: '#C9AE5A'} : {color: '#333333'}]}>{item.key}</Paragraph>
        </View>
      </TouchableWithoutFeedback>} />
  }

  _onPressItem (item) {
    this.setState({ itemIndex: item.id })
  }

  _renderCatalog () {
    return (<ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <View style={styles.catalogHeader}>
        <Heading style={{fontSize: px2dp(14)}}>兴趣馆</Heading>
        <TouchableOpacity>
          <Paragraph style={{fontSize: px2dp(12), color: '#999999'}}>查看全部 ></Paragraph>
        </TouchableOpacity>
      </View>
      <View onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => this.setState({ contentWidth: width - 1 })} style={styles.catalogContent}>
        {this._renderCatalogItem()}
      </View>
      <View style={styles.catalogHeader}>
        <Heading style={{fontSize: px2dp(14)}}>兴趣馆</Heading>
        <TouchableOpacity>
          <Paragraph style={{fontSize: px2dp(12), color: '#999999'}}>查看全部 ></Paragraph>
        </TouchableOpacity>
      </View>
      <View onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => this.setState({ contentWidth: width - 1 })} style={styles.catalogContent}>
        {this._renderCatalogItem()}
      </View>
    </ScrollView>)
  }

  _renderCatalogItem () {
    return this.state.contentWidth ? catalogList.map(item => <TouchableOpacity key={item.id} style={{width: (this.state.contentWidth / 3), paddingTop: px2dp(15), justifyContent: 'center', alignItems: 'center'}}>
      <Image style={{ width: px2dp(50), height: px2dp(50) }} source={item.photo} />
      <Paragraph>{item.text}</Paragraph>
    </TouchableOpacity>) : null
  }

  _renderRecommendList () {
    return <View style={styles.recommendListContainer}>
      <Heading style={{fontSize: px2dp(18), margin: px2dp(20)}}>为你推荐</Heading>
      <View style={{borderTopWidth: 1, borderColor: '#DCDCDC', flexDirection: 'row', flexWrap: 'wrap'}}>
        {vgoodList.map((item, index) => <GoodItem vertical style={[styles.verticalGoodItem, index % 2 === 0 ? null : {borderLeftWidth: 1}]} {...item} key={item.id} />)}
      </View>
      <Paragraph style={{fontSize: px2dp(12), textAlign: 'center', color: '#999999', height: px2dp(25), lineHeight: px2dp(25)}}>已经到底了</Paragraph>
    </View>
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.pageHeader}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F1F1', borderRadius: 2, width: px2dp(300), height: px2dp(30)}}>
            <Image style={{marginLeft: px2dp(10)}} source={require('../../../Assets/Group.png')} />
            <Paragraph style={{marginLeft: px2dp(10)}}>搜索感兴趣的商品</Paragraph>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../../Assets/Group.png')} />
          </TouchableOpacity>
        </View>
        <ScrollableTabView
          contentProps={{bounces: false}}
          renderTabBar={renderTabBar}
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          tabBarBackgroundColor='#FFFFFF'
          tabBarActiveTextColor='#B44B4D'
          tabBarInactiveTextColor='#333333'
          tabBarTextStyle={{ fontSize: 15, fontWeight: theme.lightFont }} >
          <ScrollView showsVerticalScrollIndicator={false} bounces={false} tabLabel='推荐' style={styles.recommendContainer}>
            {this._renderRecommend()}
            {this._renderButtonList()}
            {this._renderSeckill()}
            {this._renderRecommendList()}
          </ScrollView>
          <View tabLabel='全部类目' style={styles.allContainer}>
            <View style={styles.leftMenu}>
              {this._renderMenuItem()}
            </View>
            <View style={styles.rightCag}>
              {this._renderCatalog()}
            </View>
          </View>
        </ScrollableTabView>
      </View>
    )
  }
}

Mall.propTypes = {

}

const styles = StyleSheet.create({
  container: {
    paddingTop: px2dp(20),
    backgroundColor: '#f4f4f4',
    flex: 1
  },
  pageHeader: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: px2dp(20),
    paddingRight: px2dp(15),
    height: px2dp(44),
    borderBottomWidth: 1,
    borderColor: '#f4f4f4'
  },
  tabBar: {
    height: px2dp(40),
    borderColor: '#F0F0F0'
  },
  tabBarUnderlineStyle: {
    height: 2,
    marginBottom: px2dp(2),
    alignSelf: 'center',
    backgroundColor: '#B44B4D'
  },
  recommendContainer: {
  },
  lifeHouse: {
    backgroundColor: '#fff',
    height: px2dp(180),
    paddingHorizontal: px2dp(20),
    paddingTop: px2dp(23)
  },
  wrapper: {
    marginTop: px2dp(16)
  },
  slide: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  lifeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: px2dp(60)
  },
  buttonContainer: {
    marginTop: px2dp(10),
    backgroundColor: '#fff',
    width: theme.screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: px2dp(20)
  },
  textContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1000
  },
  imageButton: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 3
  },
  seckillContainer: {
    backgroundColor: '#fff',
    padding: px2dp(20),
    marginTop: px2dp(10)
  },
  seckillHeader: {
    height: px2dp(46),
    marginBottom: px2dp(15)
  },
  timeText: {
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 2,
    borderColor: '#333333',
    margin: 5
  },
  labelButton: {
    fontSize: 12,
    color: '#9F8759'
  },
  goodList: {
    flexDirection: 'row'
  },

  allContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1
  },
  leftMenu: {
    backgroundColor: '#F1F1F1',
    flex: 3
  },
  rightCag: {
    flex: 8,
    padding: px2dp(20)
  },
  menuItem: {
    backgroundColor: '#F1F1F1',
    height: px2dp(55),
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedItem: {
    backgroundColor: '#fff'
  },
  catalogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
    paddingBottom: px2dp(5)
  },
  catalogContent: {
    marginBottom: px2dp(20),
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  recommendListContainer: {
    backgroundColor: '#fff',
    marginTop: px2dp(10)
  },
  verticalGoodItem: {
    paddingBottom: px2dp(25),
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
    width: (theme.screenWidth / 2)
  }
})

export default Mall
