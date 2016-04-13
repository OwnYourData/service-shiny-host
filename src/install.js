var Docker = require('dockerode');
var docker = new Docker();


docker.pull('fabianekc/oyd_shiny', function(err, stream) {
  docker.modem.followProgress(stream, onFinished, onProgress);
  function onFinished(err, output) {
  	if (err) {
  		console.log('error while pulling docker image: ',err);
  	} else {
  		console.log('succesfully pulled image');
  	}
  }
  function onProgress(event) {
  	if (event.progress) {
  		console.log(event.progress);
  	}
  }
});