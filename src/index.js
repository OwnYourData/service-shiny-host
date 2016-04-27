var port = process.env.PORT || 8081;
var shiny = process.env.DOCKER_HOST;

var path = require('path');
var Docker = require('dockerode');
var fs = require('fs');
var docker = new Docker();
var connect = require('connect');
var app = connect();

var absolutModulesPath = path.resolve('./modules');

docker.run('fabianekc/oyd_shiny', [], process.stdout, {
  'Volumes': {
       '/srv/shiny-server/':{}
  },
  'ExposedPorts': {
    '3838/tcp': {}
  },
}, {
  'Binds': [absolutModulesPath+':/srv/shiny-server/'],
  'PortBindings': { '3838/tcp': [{ 'HostPort': '8070' }] }
}, function(err, data, container) {
	console.log(err);
  	console.log(data);
  	console.log(container);
});

app.use(function(req,res) {
   var host = req.headers.host.split(':')[0];
   res.writeHead(301, {Location: shiny+'/'+req.url});
   res.end();
});

app.listen(port,function() {
  console.log('eu.ownyourdata.shiny is listening on port '+port);
});