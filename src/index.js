var path = require('path');
var Docker = require('dockerode');
var fs = require('fs');
var docker = new Docker();

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
