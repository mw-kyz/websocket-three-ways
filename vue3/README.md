# Websocket 原理

# 聊天室
  - 前端
    1. Login
       用户名输入 / 进入聊天室的按钮
       input username -> localstorage -> enter the chatting room
    2. Home
       列表 / 消息输入框 / 发送按钮

       localstorage -> username / message / id/ 消息时间 -> 后盾 websocket服务


  - 后端
    接收 -> 消息数据 -> 广播给所有连接到 websocket 服务的客户端

```sh
cd vue3
npm i
npm run serve
cd server
npm i
npm run dev
```
测试：
浏览器打开一个普通窗口，然后再使用浏览器打开一个无痕窗口，这样就可以使用不同的用户名进行聊天了