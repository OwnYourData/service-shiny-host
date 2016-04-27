var port = process.env.PORT || 8081;
var dockerHost = process.env.DOCKER_HOST;

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
  'PortBindings': { '3838/tcp': [{ 'HostPort': port }] }
}, function(err, data, container) {
	console.log(err);
  	console.log(data);
  	console.log(container);
});

if(dockerHost.startsWith('socket')) {
  console.log('docker is running directly on this machine.');
}
if(dockerHost.startsWith('tcp')) {
  console.log('docker is running on a virtual machine, creating redirect');

  var shiny = dockerHost.substring(6);

  app.use(function(req,res) {
   var location = req.url ? shiny + '/' + req.url : shiny;
   console.log('redirecting to '+location);
   res.writeHead(301, {Location: location});
   res.end();
  });

  app.listen(port,function() {
    console.log('eu.ownyourdata.shiny is listening on port '+port);
  });
}

