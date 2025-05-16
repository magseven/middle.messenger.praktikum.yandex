  // chat-messages-api.js
  import {HTTPTransport} from '../modules/httpRequest';
  import {BaseAPI} from './base-api';

  const chatMessagesAPIInstance = new HTTP('api/v1/messages');

  class ChatMessagesAPI extends BaseAPI {
      request({id}) {
          return chatMessagesAPIInstance.get(`/${id}`);
      }
  }
