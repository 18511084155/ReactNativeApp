import { Dimensions, PixelRatio } from 'react-native'
export const deviceWidth = Dimensions.get('window').width // 设备的宽度
export const deviceHeight = Dimensions.get('window').height   // 设备的高度

const defaultPixel = 2                           // iphone6的像素密度
// px转换成dp
const w2 = 375 / defaultPixel
const h2 = 667 / defaultPixel
const scale = Math.min(deviceHeight / h2, deviceWidth / w2)   // 获取缩放比例

export function scaleSize (size: number) {
  size = Math.round(size * scale)
  return Math.floor(size / defaultPixel)
}

export default {
  screenWidth: deviceWidth,
  screenHeight: deviceHeight,
  onePixel: 1 / PixelRatio.get(),
  cardColor: '#F2E5C9',
  themeColor: '#C9AE5A',
  hintColor: '#B44B4B',
  redColor: '#EF0000',
  green: '#2ABC09',
  textColor: '#333',
  textLightColor: '#666',
  displayColor: '#999',
  placeholderColor: '#c5c5c5',
  borderColor: '#DCDCDC',
  bgColor: '#f9f9f9',
  lightFont: '300',
  regularFont: '400',
  mediumFont: '500',
  SemiFont: '500',
  fontFamily: 'Helvetica',
  borderWidth: 1,
  scaleSize: scaleSize,
  isScroll: (Dimensions.get('window').height / Dimensions.get('window').width) < 1.7
}
