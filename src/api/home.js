import axios from 'axios'
import { SUCC_CODE, TIMEOUT } from './config'

// 获取幻灯片数据
export const getHomeSlider = () => {
  // timeout设置请求时间，超过该时间会报超时错误
  return axios.get('http://www.imooc.com/api/home/slider', { timeout: TIMEOUT }).then(
    res => {
      if (res.data.code === SUCC_CODE) {
        return res.data.slider
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
  }).then(data => {
    // 等一秒后再把数据返回出去
    // 因为是异步操作，再在外层包一层Promise
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data)
      }, 1000)
    })
  })
}
