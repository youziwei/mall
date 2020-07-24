// 创建一个本地储存
const storage = window.localStorage

export default {
  // 存值
  set(key, val) {
    if (val === undefined) {
      return
    }
    storage.setItem(key, serialize(val))
  },

  // 获取
  get(key, def) {
    const val = deserialize(storage.getItem(key))
    return val === undefined ? def : val
  },

  // 删除
  remove(key) {
    storage.removeItem(key)
  },

  // 清空
  clear() {
    storage.clear()
  }
}

// 将值转换为JSON字符串
function serialize(val) {
  return JSON.stringify(val)
}

// 将JSON字符串转换为值
function deserialize(val) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}
