<template>
  <div>
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
import { reactive, toRefs, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useWebSocket } from '../hooks'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const ws = useWebSocket(handleMessage)

    const state = reactive({
      msg: '',
      msgList: []
    })

    let username = ''

    onMounted (() => {
      username = localStorage.getItem('username')

      if (!username) {
        router.push('/login')
        return
      }
    })

    const handleSendBtnClick = () => {
      const _msg = state.msg

      if (!_msg.trim().length) {
        alert('消息不能为空')
        return
      }

      // 除了send方法之外，还有一个close方法
      ws.send(JSON.stringify({
        id: Date.now(),
        user: username,
        dataTime: Date.now(),
        message: state.msg
      }))

      state.msg = ''
    }

    function handleMessage (e) {
      const _msgData = JSON.parse(e.data)

      state.msgList.push(_msgData)
    }

    return {
      ...toRefs(state),
      handleSendBtnClick
    }
  }
}
</script>

<style>

</style>