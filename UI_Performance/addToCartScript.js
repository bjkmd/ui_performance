module.exports = async function(context, commands) {
	try {

		hostname = context.options.hostname;
		host = 'https://'+hostname;
		isPreprod = hostname == "URL_PREPROD";

		//get cookie
		if (isPreprod) {
			await commands.navigate('https://URL');
			await commands.cache.clearKeepCookies();
			await commands.js.run('document.body.innerHTML = ""; document.body.style.backgroundColor = "white";');
		}

		//home page
		await commands.measure.start('Open home page');
		await commands.navigate(host+'/PATH');
		await commands.measure.stop();

		// close Geolocation message
		exists = await commands.js.run('return (document.querySelector("button.geolocation-actions-button") != null) ');
		if (exists) {	
			await commands.click.bySelector('button.geolocation-actions-button');
		}

		await commands.measure.start('Category 1');
		href ="/PATH";
		await commands.click.byXpathAndWait("//a[contains(@href,'"+href+"')]");
		await commands.measure.stop();

		await commands.measure.start('Category 2');
		href ="/PATH";
		await commands.click.byXpathAndWait("//a[contains(@href,'"+href+"')]");
		await commands.measure.stop();

		await commands.measure.start('Product 1');
		href ="/PATH";
		await commands.click.byXpathAndWait("//a[@class='product-link' and contains(@href,'"+href+"')]");
		await commands.measure.stop();

		await addToCart();

		await commands.measure.start('Category 3');
		href ="/PATH";
		await commands.click.byXpathAndWait("//a[contains(@href,'"+href+"')]");
		await commands.measure.stop();

		await commands.measure.start('Product 2');
		href ="/PATH";
		await commands.click.byXpathAndWait("//a[@class='product-link' and contains(@href,'"+href+"')]");
		await commands.measure.stop();

		await addToCart();

		//open miniatures
		if (isPreprod) await commands.click.byXpath("//*[@data-end-to-end='checkout']");

		await commands.measure.start('Checkout page');
		await commands.click.byXpathAndWait("//*[@data-end-to-end='checkout']");
		await commands.measure.stop();
	

		async function addToCart(){
			await commands.wait.byXpath("//button[@data-end-to-end='addToCart']", 15000);
			await commands.click.byXpath("//button[@data-end-to-end='addToCart']");
			await commands.js.run("performance.mark('Click add to cart button')");
			await commands.wait.byXpath("//*[@data-end-to-end='checkout']", 15000);
			await commands.js.run("performance.mark('Added to cart')");
		}


} catch (e) {
    
    throw e;
  }

}