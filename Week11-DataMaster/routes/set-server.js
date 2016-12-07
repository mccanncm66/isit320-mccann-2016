var servers = ['http://127.0.0.1:5984',
    'http://192.168.2.19:5984',
    'http://168.156.47.121:5984',
    'http://192.168.0.6:5984',
    'http://168.156.47.122:5984/',
    '168.156.47.122',
    '127.0.0.1'

];
var serverIndex = 0;
var serverUrls = {
    dataServer: servers[serverIndex],
    sessionServer: servers[6]
};
console.log('Middleware attaching to database on: ', serverUrls.dataServer);

module.exports.serverUrls = serverUrls;
