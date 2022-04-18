const ws = require('ws')

;(ws => {
  // ws:localhost:8000 与前端的端口保持一致
  const server = new ws.Server({ port: 8000 })

  const init = () => {
    bindEvent()
  }

  function bindEvent () {
    // 事件监听
    server.on('open', handleOpen)
    server.on('close', handleClose)
    server.on('error', handleError)
    server.on('connection', handleConnection)
  }

  function handleOpen (e) {
    console.log('Websocket open', e)
  }

  function handleClose (e) {
    console.log('Websocket close', e)
  }

  function handleError (e) {
    console.log('Websocket error', e)
  }

  function handleConnection (ws) {
    console.log('Websocket connection')

    ws.on('message', handleMessage)
  }

  function handleMessage (msg) {
    msg = JSON.parse(msg.toString('utf-8'))
    msg.target = 'server'
    
    // 给每个客户端广播消息
    server.clients.forEach(c => {
      c.send(JSON.stringify((msg)))
    })
  }

  init()
})(ws)