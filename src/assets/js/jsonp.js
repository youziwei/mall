import jsonp from 'jsonp'

const parseParam = param => {
  // 将对象转换为二维数组，再用join进行两次连接
  const params = []
  for (const key in param) {
    params.push([key, param[key]])
  }

  return params.map(val => val.join('=')).join('&')
}

export default (url, data, options) => {
  url += (url.indexOf('?') < 0 ? '?' : '&') + parseParam(data)
  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
