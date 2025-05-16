// chat-api.js
  import {HTTPTransport} from '../modules/httpRequest';
  import {BaseAPI} from './base-api';

  const chatAPIInstance = new HTTPTransport(/*'api/v1/chats'*/);

  class ChatAPI extends BaseAPI {
      create() {
          // Здесь уже не нужно писать полный путь /api/v1/chats/
//          return chatAPIInstance.post('/', {title: 'string'});
          return chatAPIInstance.post('/', { headers: {title: 'string'}, data: {title: 'string'}});
      }

      request() {
          // Здесь уже не нужно писать полный путь /api/v1/chats/
          return chatAPIInstance.get('/full');
      }
  }

  