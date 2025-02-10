function log() {
		var line = Array.prototype.slice.call(arguments).map(function(argument) {
			return typeof argument === 'string' ? argument : JSON.stringify(argument);
		}).join(' ');
		console.log(line);
		document.querySelector('#log').textContent += line + '\n';
	}
