import Store, { storeMessage } from "../store"
const baseUrl = 'wss://ya-praktikum.tech/ws/chats/'
export function sendMessage( user_id: string, chat_id: number, token: string, message: string) {

  const socket = new WebSocket(`${baseUrl}${user_id}/${chat_id}/${token}`);

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');

    socket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  });
  
  socket.addEventListener('close', event => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', event => {
    console.log('Получены данные', event.data);
    const messages = Store.getState().messages;

    const message = JSON.parse(event.data) as storeMessage;

    Store.set( "messages", [...messages,{id: message.id, time: message.time, content: message.content, user_id: message.user_id, chat_id}]);
  });

  socket.addEventListener('error', event => {
    console.log('Ошибка', event/*.message*/);
  });
}

export function getLastMessages( user_id: string, chat_id: number, token: string) {
  const socket = new WebSocket(`${baseUrl}${user_id}/${chat_id}/${token}`);

  socket.addEventListener('open', () => {
    console.log('Соединение установлено');

    socket.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }));
   });
  
  socket.addEventListener('close', event => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', event => {
    console.log('Получены данные', event.data);
    Store.set( 'messages', JSON.parse(event.data).reverse());
  });

  socket.addEventListener('error', event => {
    console.log('Ошибка', event/*.message*/);
  });
}
