// /**
//  * @Description: websocket封装
//  * @Author: Mo Xu
//  * @Date: 25/6/2022
//  */
//
// // websocket对象
// const socket = {
//   websocket: null,
//   // 服务端的路径
//   url: 'ws://localhost:8888/api/websocket',
//   // 是否开启
//   ifOpen: false,
//   // 心跳timer
//   heartBeatTimer: null,
//   // 心跳频率
//   hearBeatInterval: 5000,
//   // 是否自动重连
//   ifReconnect: true,
//   // 重连次数
//   reconnectTimes: 2,
//   // 已发起重连次数
//   reconnectCurrent: 1,
//   // 重连Timer
//   reconnectTimer: null,
//   // 重连频率
//   reconnectInterval: 3000,
//
//   // 初始化方法，需要传入用户id
//   init: (id) => {
//     // 判断是否支持websocket
//     if (!("WebSocket" in window)) {
//       return null
//     }
//
//     // 已有连接则直接返回当前连接
//     if (socket.websocket) {
//       return socket.websocket
//     }
//
//     // 初始化websocket
//     socket.websocket = new WebSocket(socket.url + id)
//     socket.websocket.onmessage = (m) => {
//       socket.reveive(m)
//     }
//
//     // 关闭连接
//     socket.websocket.onclose = () => {
//       clearInterval(socket.hearBeatInterval)
//       socket.ifOpen = false
//
//       // 需要重新连接
//       if (socket.ifReconnect) {
//         socket.reconnectTimer = setTimeout(() => {
//           // 超出次数
//           if (socket.reconnectCurrent > socket.reconnectTimes) {
//             clearTimeout(socket.reconnectTimer)
//             return
//           }
//
//           // 添加次数
//           socket.reconnectCurrent += 1
//           socket.reconnect()
//         }, socket.reconnectInterval)
//       }
//     }
//
//     // 成功连接
//     socket.websocket.onopen = () => {
//       socket.ifOpen = true
//       socket.ifReconnect = true
//       // 开始发送心跳
//       socket.heartBeat()
//     }
//
//     // 无法连接
//     socket.websocket.onerror = () => {
//       console.log('websocket连接错误')
//     }
//   },
//
//   // 发送消息
//   send: (data) => {
//     // 处于开启状态，发送消息
//     if (socket.websocket.readyState === socket.websocket.OPEN) {
//       socket.websocket.send(JSON.stringify(data))
//     } else if (socket.websocket.readyState === socket.websocket.CONNECTING) {
//       // 正在连接，等待1秒后再次发送
//       setTimeout(() => {
//         socket.send(data)
//       }, 1000)
//     } else {
//       // 未开启，开启后等待1秒发送
//       socket.init(data.from)
//       setTimeout(() => {
//         socket.send(data)
//       }, 1000)
//     }
//   },
//
//   // 接收消息
//   receive: (message) => {
//     return JSON.parse(message.data)
//
//     // if (data.kind !== 0) {
//     //   return message.data
//     // }
//     //
//     // if (data === undefined) {
//     //   return false
//     // }
//   },
//
//   // 心跳
//   heartBeat: () => {
//     if (socket.heartBeatTimer) {
//       clearInterval(socket.heartBeatTimer)
//     }
//
//     socket.heartBeatTimer = setInterval(() => {
//       const token = ""
//       let data = {
//         'token': token
//       }
//       socket.send(data)
//     }, socket.hearBeatInterval)
//   },
//
//   // 主动关闭连接
//   close: () => {
//     clearInterval(socket.heartBeatTimer)
//     socket.ifReconnect = false
//     socket.websocket.close()
//   },
//
//   // 重新连接
//   reconnect: (id) => {
//     if (socket.websocket && socket.ifOpen) {
//       socket.websocket.close()
//     }
//     socket.init(id)
//   }
// }
//
// export default socket