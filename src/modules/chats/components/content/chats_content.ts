// blocks/user-profile.js
export default class UserProfile {
    constructor () {
      window.bus.on('user:logged-in', function (user) {
        // do stuff
          
        this.render();
      }.bind(this))
    }
  }
