const UserServer = require('./server');

new UserServer().start().catch(err => console.log(err));
