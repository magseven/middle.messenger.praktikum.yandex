// services/user-service.js
export default class UserService {
    login () {
      HTTP.post({ ... })
    .then(function (user) {
      // do stuff
          
      window.bus.emit('user:logged-in', user);
    })
  }
}
