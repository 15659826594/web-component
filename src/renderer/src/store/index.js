import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

export const useSocketIO = defineStore('socketIO', {
  state: () => ({
    host: '127.0.0.1',
    port: '9502',
    readyState: 'closed',
    socket: null
  }),
  getters: {},
  actions: {
    connect() {
      const manager = new io.Manager(`ws://${this.host}:${this.port}`, {
        transports: ['websocket', 'polling']
      })
      this.socket = manager.socket('/', {
        autoConnect: false
      })

      this.socket.on('connect_error', (error) => {
        switch (error.message) {
          case 'websocket error': {
            this.socket.close()
          }
        }
      })

      this.socket.on('connect', () => {
        const engine = this.socket.io.engine
        this.readyState = engine.readyState
        engine.once('upgrade', () => {
          // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
          console.log(engine.transport.name) // in most cases, prints "websocket"
        })
      })
      this.socket.on('disconnect', (reason) => {
        this.readyState = 'closed'
        // 断开连接是由服务器发起的，您需要手动重新连接
        if (reason === 'io server disconnect') {
          this.socket.connect()
        }
      })

      this.socket.connect()
    },
    emit() {
      if (this.socket?.connected) {
        this.socket.emit(...arguments)
      } else {
        this.socket.volatile.emit(...arguments)
      }
    }
  }
})

export const useEffect = defineStore('effect', {
  state: () => ({
    root: 'light',
    sidebar: '',
    collapse: null, //侧边栏是否折叠
    header: ''
  }),
  getters: {},
  actions: {}
})
