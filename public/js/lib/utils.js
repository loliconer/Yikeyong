utils = {
  fetch(option) {
    if (typeof option === 'string') {
      option = {
        type: 'get',
        url: option
      }
    } else {
      option.type = option.type || 'get'
    }

    let allOptions = {
      get: {},
      post: {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(option.data)
      },
      form: {
        method: 'post',
        body: option.data
      },
      put: {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(option.data)
      },
      putForm: {
        method: 'put',
        body: option.data
      },
      delete: {
        method: 'delete'
      }
    }

    let requestOption = allOptions[option.type]

    requestOption.credentials = 'same-origin'
    requestOption.headers = requestOption.headers || {}
    requestOption.headers['Accept'] = 'application/json'

    let url
    url = option.url.startsWith('/') ? option.url : `/api/${option.url}`

    let request = new Request(url, requestOption)

    return new Promise((resolve, reject) => {
      fetch(request).then(res => {
        if (res.ok) return res.json()
        throw res
      }).then(body => {
        if (body.code === 0) {
          resolve(body.data)
        } else {
          throw body
        }
      }).catch(err => {
        let msg
        if (err.status === 404) {
          msg = 'API不存在'
        } else if (err.status === 500) {
          msg = '内部服务器发生错误'
        } else {
          switch (err.code) {
            case 401:
              msg = 401
              break
            case 1001:
              msg = '创建对象失败'
              break
            case 1002:
              msg = '更新对象失败'
              break
            case 1003:
              msg = '删除对象失败'
              break
            case 1004:
              msg = '无权限'
              break
            case 1005:
              msg = '对象不存在'
              break
            case 1006:
              msg = '获取对象失败'
              break
            default:
              msg = err.error
              break
          }
        }
        reject(msg)
      })
    })
  },
  formatDate(date) {
    let year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds()

    hour = hour < 10 ? `0${hour}` : hour
    minute = minute < 10 ? `0${minute}` : minute
    second = second < 10 ? `0${second}` : second

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  },
  connectWS(option) {
    console.log(`Connecting to ${option.uri} ...`)

    const ws = new WebSocket(option.uri)

    ws.onopen = ev => {
      console.log('RTServer Connection Created!')

      option.type && ws.send(JSON.stringify({
        type: option.type,
        data: 'Set Request Type'
      }))

      option.host && ws.send(JSON.stringify({
        type: option.type,
        data: option.host
      }))
    }

    ws.onmessage = ev => {
      option.receive(ev.data)
    }

    ws.onclose = ev => {
      console.log('RTServer Connection Closed!')
    }

    ws.onerror = ev => {
      console.log('RTServer Connection Broken!')
      throw new Error(ev)
    }

    return ws
  },
  isEmptyObject(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }
}
