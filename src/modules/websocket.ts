const socket = new WebSocket('wss://example.com/ws')

socket.addEventListener('open', onOpen)       // соединение установлено
socket.addEventListener('message', onMessage) // пришло новое сообщение
socket.addEventListener('error', onError)     // ошибка
socket.addEventListener('close', onClose)     // сокет закрылся 

// 0 – CONNECTING — соединение ещё не установлено
// 1 – OPEN — соединение установлено, обмен данными
// 2 – CLOSING — соединение закрывается
// 3 – CLOSED — соединение закрыто
if (socket.readyState === 1) {
    socket.send('Hello, Server!')
}   

const _socket = new WebSocket('wss://ws.postman-echo.com/raw')

socket.addEventListener('open', function(event) {
  console.log('Соединение установлено')
}) 

socket.addEventListener('message', function(event) {
    console.log('Сообщение от сервера:', event.data)
  })
  
  // Дождитесь появления в консоли сообщения об установке соединения
  if (socket.readyState === 1) {
      socket.send('Привет, сервер!')
  } 

  //Отправка данных
  // текстовые данные
const str = 'Hello, Server!'
socket.send(str)

const obj = { message: 'Hello, Server!' }
socket.send(JSON.stringify(obj))

// бинарные данные
const buffer = new ArrayBuffer(128)
socket.send(buffer)

const intview = new Uint32Array(buffer)
socket.send(intview)

const blob = new Blob([buffer])
socket.send(blob) 

//Обработка входящих сообщений
socket.addEventListener('message', function(event) {
  console.log(event.data)
}); 

socket.binaryType = 'arraybuffer' // blob | arraybuffer 
socket.addEventListener('close', listener) 

//Возможная обертка
const wsClient = new WebSocketClient('wss://example.com/ws')

const chatRooms = []
const messages = []

wsClient.subscribe('chatMessage', (payload) => {
    messages.push(payload.message)
})

wsClient.send('chatMessage', { chatId: 'id', message: 'Anyway...', author: 'Johnny' })