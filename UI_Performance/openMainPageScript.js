module.exports = async function(context, commands) {
	try {

		var hostname = context.options.hostname;
		host = 'https://'+hostname;
		isPreprod = hostname == "URL_PREPROD";


		//get cookie
		if (hostname == isPreprod) {
			await commands.navigate('https://URL');
			await commands.cache.clearKeepCookies();
			await commands.js.run('document.body.innerHTML = ""; document.body.style.backgroundColor = "white";');
		}

		//home page
		await commands.measure.start('Open home page');
		await commands.navigate(host+'/PATH');
		await commands.measure.stop();

		// close Geolocation message
		const exists = await commands.js.run('return (document.querySelector("button.geolocation-actions-button") != null) ');
		if (exists) {	
			await commands.click.bySelector('button.geolocation-actions-button');
		}


} catch (e) {
    
    throw e;
  }

}