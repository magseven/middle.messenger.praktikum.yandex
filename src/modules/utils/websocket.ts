import Store, { storeMessage } from "../store"
const baseUrl = 'wss://ya-praktikum.tech/ws/chats/'

let socket: WebSocket;

function ensureSocket(user_id: string, chat_id: number, token: string, reset?: boolean) {
  if ( socket && socket.readyState == WebSocket.OPEN && reset)
    socket.close();

  return new Promise<void>((resolve, reject)=>{
    if ( socket && socket.readyState == WebSocket.OPEN && !reset) {
      resolve();
      return;
    }

    socket = new WebSocket(`${baseUrl}${user_id}/${chat_id}/${token}`);

    socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      const intervalId = setInterval( () => {
        if ( socket.readyState === WebSocket.CLOSED) {
          clearInterval( intervalId);
          return;
        }
        
        socket.send( JSON.stringify({type:"ping"}));
      }, 10000);

      resolve();
    });

    socket.addEventListener('message', (event: MessageEvent) => {
      const result = JSON.parse( event.data);
      
      if ( result.type === 'pong'){
        console.log('ping-pong');
        return;
      }

      if ( Array.isArray( result)) {
        Store.set( 'messages', JSON.parse(event.data).reverse());
        return;
      }

      if ( result.type === 'message') {
        const messages = Store.getState().messages;
        const message = JSON.parse(event.data) as storeMessage;
        Store.set( "messages", [...messages,{id: message.id, time: message.time, content: message.content, user_id: message.user_id, chat_id}]);
        return;
      }

      console.log('Получены данные', event.data);

    });

    socket.addEventListener('close', event => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      reject( event.reason);
    });

    socket.addEventListener('error', event => {
      console.log('Ошибка', event/*.message*/);
      reject( event);
    });

  })
}

export async function sendMessage( user_id: string, chat_id: number, token: string, message: string) {
  await ensureSocket( user_id, chat_id, token);
  socket.send(JSON.stringify({ content: message, type: 'message'}));
}

export async function getLastMessages( user_id: string, chat_id: number, token: string) {
  await ensureSocket( user_id, chat_id, token, true);
  socket.send(JSON.stringify({ content: '0', type: 'get old'}));
}
