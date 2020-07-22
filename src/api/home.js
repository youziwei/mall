import axios from 'axios'
import jsonp from 'assets/js/jsonp'
import { SUCC_CODE, TIMEOUT, HOME_RECOMMEND_PAGE_SIZE, jsonpOptions } from './config'

// 打乱数组顺序
const shuffle = (arr) => {
  const arrLength = arr.length
  let i = arrLength
  let ranNum

  while (i--) {
    // 当前索引不等于随机索引时，交换数组中位置
    if (i !== (ranNum = Math.floor(Math.random() * arrLength))) {
      [arr[i], arr[ranNum]] = [arr[ranNum], arr[i]]
    }
  }
  return arr
}

// 获取幻灯片数据
export const getHomeSlider = () => {
  // timeout设置请求时间，超过该时间会报超时错误
  return axios.get('http://www.imooc.com/api/home/slider', { timeout: TIMEOUT }).then(
    res => {
      if (res.data.code === SUCC_CODE) {
        let sliders = res.data.slider
        const slider = [sliders[Math.floor(Math.random() * sliders.length)]]
        sliders = shuffle(sliders.filter(() => Math.random() >= 0.5))
        if (sliders.length === 0) {
          sliders = slider
        }
        return sliders
        // return res.data.slider
      }

      throw new Error('没有成功获取到数据!')
    }).catch(err => {
    if (err) {
      console.log(err)
    }

    // 错误处理
    return [
      {
        linkUrl: 'https://www.baidu.com',
        picUrl: require('assets/img/404.png')
      }
    ]
  })
  // 延迟一秒
  // .then(data => {
  //   // 等一秒后再把数据返回出去
  //   // 因为是异步操作，再在外层包一层Promise
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(data)
  //     }, 1000)
  //   })
  // })
}

// 获取热门推荐数据
export const getHomeRecommend = (page = 1, psize = HOME_RECOMMEND_PAGE_SIZE) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json'
  const params = {
    page,
    psize,
    type: 0,
    frontCatId: ''
  }

  // timeout控制超时
  return jsonp(url, params, jsonpOptions).then(res => {
    if (res.code === '200') {
      return res
    }

    throw new Error('没有成功获取到数据')
  }).catch(err => {
    if (err) {
      console.log(err)
    }
  })
  // .then(data => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(data)
  //     }, 1000)
  //   })
  // })
}
