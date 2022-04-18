;((doc, WebSocket, storage, location) => {
  const oList = doc.querySelector('#list')
  const oMsg = doc.querySelector('#message')
  const oSendBtn = doc.querySelector('#send')
  // WebSocket的第一个参数为 url，这是的ws是协议，后面是域名和端口号
  const ws = new WebSocket('ws:localhost:8000')
  let username = ''

  const init = () => {
    bindEvent()
  }

  function bindEvent () {
    oSendBtn.addEventListener('click', handleSendBtnClick, false)
    // websocket的事件，也可以用句柄的方式，比如 ws.onopen = function () {}
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false)
  }

  function handleSendBtnClick () {
    const msg = oMsg.value

    if (!msg.trim().length) {
      return
    }

    // 除了send方法之外，还有一个close方法
    ws.send(JSON.stringify({
      user: username,
      dataTime: Date.now(),
      message: msg
    }))

    oMsg.value = ''
  }

  function handleOpen (e) {
    console.log('Websocket open', e)
    username = storage.getItem('username')

    if (!username) {
      location.href = 'entry.html'
    }
  }

  function handleClose (e) {
    console.log('Websocket close', e)
  }

  function handleError (e) {
    console.log('Websocket error', e)
  }

  function handleMessage (e) {
    console.log('Websocket message', e)
    const msgData = JSON.parse(e.data)

    oList.appendChild(createMsg(msgData))
  }

  function createMsg (data) {
    const { user, dataTime, message } = data
    const oItem = doc.createElement('li')

    oItem.innerHTML = `
      <p>
        <span>${ user }</span>
        <i>${ new Date(dataTime) }</i>
      </p>
      <p>消息：${ message }</p>
    `

    return oItem
  }

  init()
})(document, WebSocket, localStorage, location)