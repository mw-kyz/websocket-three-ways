import { WS_ADRESS } from '../config'

function useWebSocket (handleMessage) {
  console.log(WS_ADRESS)
  const ws = new WebSocket(WS_ADRESS)

  const init = () => {
    bindEvent()
  }

  function bindEvent () {
    // websocket的事件，也可以用句柄的方式，比如 ws.onopen = function () {}
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false)
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

  init()

  return ws
}

export default useWebSocket