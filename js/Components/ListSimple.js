/**
 * Created by Joe on 2017/10/11.
 * 简单版本的listView, 没有上拉刷新和下拉加载
 */

import React from 'react'
import PropTypes from 'prop-types'
import {ListView, ViewPropTypes} from 'react-native'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
})

const ListSimple = (
  {
    style = null,
    contentContainerStyle = null,
    dataSource,
    renderRow,
    renderSectionHeader = e => null,
    refreshControl = null,
    renderHeader = e => null,
    scrollEnabled = true,
    showsVerticalScrollIndicator = true
  }
) => {
  let getDataSource = () => {
    if (Object.prototype.toString.call(dataSource) === '[object Array]') {
      return ds.cloneWithRows(dataSource)
    } else if (typeof dataSource === 'object') {
      return ds.cloneWithRowsAndSections(dataSource)
    }
  }
  return (
    <ListView
      style={style}
      contentContainerStyle={contentContainerStyle}
      enableEmptySections
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      scrollEnabled={scrollEnabled}
      dataSource={getDataSource()}
      renderSectionHeader={renderSectionHeader}
      stickyHeaderIndices={[0]}
      stickySectionHeadersEnabled
      renderRow={renderRow}
      refreshControl={refreshControl}
      renderHeader={renderHeader}
    />
  )
}

ListSimple.propTypes = {
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  dataSource: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
  renderRow: PropTypes.func.isRequired,
  renderSectionHeader: PropTypes.func,
  refreshControl: PropTypes.object,
  renderHeader: PropTypes.func,
  scrollEnabled: PropTypes.bool,
  showsVerticalScrollIndicator: PropTypes.bool
}

module.exports = ListSimple
