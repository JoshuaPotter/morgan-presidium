import localtunnel from 'localtunnel';

(async () => {
	console.log('[Status]', 'Creating tunnel URL for http://localhost:3000');
	const tunnel = await localtunnel({
		port: 3000,
		subdomain: 'morgan-presidium',
	});

	// the assigned public url for your tunnel
	// i.e. https://abcdefgjhij.localtunnel.me
	console.log('[Status]', `Tunnel URL: ${tunnel.url}`);

	tunnel.on('close', () => {
		console.log('[Status]', `Tunnel closed URL: ${tunnel.url}`);
	});

	process.on('SIGINT', () => {
		console.log('[Status]', 'Closing tunnel...');
		tunnel.close();
		process.exit(0);
	});
})();