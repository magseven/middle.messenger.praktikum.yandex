export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export type METHOD = typeof METHODS[keyof typeof METHODS];

export function queryStringify(data: Record<string|number, string | Blob | number | number[]> ) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

type transportOptions = {
  headers?: Record<string, string>;         
  method?: METHOD;          
  data?: Record<string|number, string | Blob | number | number[]> | FormData; 
  timeout?:number; 
 }

export const baseApiUrl: string = 'https://ya-praktikum.tech/api/v2';
export const baseResourceUrl: string = 'https://ya-praktikum.tech/api/v2/resources';

export class HTTPTransport { 
  get = (url: string, options: transportOptions) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };

  post = (url: string, options: transportOptions): Promise<XMLHttpRequest> => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };

  put = (url: string, options: transportOptions) =>  {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };

  delete = (url: string,options: transportOptions = { headers: {} }) => { 
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  request = (url: string, options: transportOptions = { headers: {}}, timeout = 5000): Promise<XMLHttpRequest> => {
    const {headers = {}, method, data} = options;

    return new Promise(function(resolve, reject) {
      if (!method) {
        reject('No method');
        console.log( 'no method');
        return;
      }

      const xhr = new XMLHttpRequest();
       xhr.withCredentials = true; 
      const isGet = method === METHODS.GET;

      xhr.open(
        method, 
        isGet && data && !(data instanceof FormData) 
        ? `${baseApiUrl}${url}${queryStringify(data)}`
        : `${baseApiUrl}${url}`,
      );

      if (!headers['Content-Type'] && method !== METHODS.GET && !(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
      }


      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
//        xhr.send(  JSON.stringify(data));
        xhr.send( typeof data === 'string' || data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };
}

