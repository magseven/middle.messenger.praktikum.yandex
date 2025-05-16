const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

type METHOD = typeof METHODS[keyof typeof METHODS];

function queryStringify(data: Record<string, undefined>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

type transportOptions = {
  headers: Record<string, string>;         
  method?: METHOD;          
  data?: unknown; 
  timeout?:number; 
 }

 interface RequestOptions {
  headers?: Record<string, string>;
  data?: any;
  timeout?: number;
}

export class HTTPTransport { 
  get = (url: string, options: transportOptions = { headers: {} }) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };

  post = (url: string, options: transportOptions = { headers: {} }) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };

  put = (url: string, options: transportOptions = { headers: {} }) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };

  delete = (url: string,options: transportOptions = { headers: {} }) => { 
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  request = (url: string, options: transportOptions = { headers: {}}, timeout = 5000) => {
    const {headers = {}, method, data} = options;

    return new Promise(function(resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
       xhr.withCredentials = true; 
      const isGet = method === METHODS.GET;

      xhr.open(
        method, 
        isGet && !!data
        ? `${url}${queryStringify(data)}`
        : url,
      );

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Accept', 'application/json');

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
        xhr.send(data);
      }
    });
  };
}
