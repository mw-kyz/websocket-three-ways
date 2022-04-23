<template>
  <div class="home">
    <input type="text" placeholder="请输入消息" v-model="msg"/>
    <button @click="handleSendBtnClick">发送</button>
    <ul>
      <li
        v-for="item of msgList"
        :key="item.id"
      >
        <p>
          <span>{{ item.user }}</span>
          <span>{{ new Date(item.dataTime) }}</span>
        </p>
        <p>消息： {{ item.message }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
// WebSocket的第一个参数为 url，这是的ws是协议，后面是域名和端口号
const ws = new WebSocket('ws:localhost:8000')

export default {
  name: 'Home',
   data() {
    return {
      msg: '',
      username: '',
      msgList: []
    }
  },
  mounted() {
    this.username = localStorage.getItem('username')

    if (!this.username) {
      this.$router.push('/login')
      return
    }

     // websocket的事件，也可以用句柄的方式，比如 ws.onopen = function () {}
    ws.addEventListener('open', this.handleOpen.bind(this), false)
    ws.addEventListener('close', this.handleClose.bind(this), false)
    ws.addEventListener('error', this.handleError.bind(this), false)
    ws.addEventListener('message', this.handleMessage.bind(this), false)
  },
  methods: {
    handleSendBtnClick () {
      const msg = this.msg

      if (!msg.trim().length) {
        alert('消息不能为空')
        return
      }

      // 除了send方法之外，还有一个close方法
      ws.send(JSON.stringify({
        id: Date.now(),
        user: this.username,
        dataTime: Date.now(),
        message: msg
      }))

      this.msg = ''
    },
    handleOpen (e) {
      console.log('Websocket open', e)
    },
    handleClose (e) {
      console.log('Websocket close', e)
    },
    handleError (e) {
      console.log('Websocket error', e)
    },
    handleMessage (e) {
      console.log('Websocket message', e)
      const msgData = JSON.parse(e.data)

      this.msgList.push(msgData)
    }
  }
}
</script>
