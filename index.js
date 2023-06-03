const ExpressJS = require('express');
const Chalk = require('chalk');
const Config = require('./config.json');

const Website = ExpressJS();
Website.use(ExpressJS.static('Pages'));

Website.get('/', async (Request, Response) => {
    await Response.status(200).sendFile('./Pages/index.html', { root: __dirname });
});

Website.get('/contact', async (Request, Response) => {
    await Response.status(200).sendFile('./Pages/contact.html', { root: __dirname });
});

//Serving static Website Assets.
Website.use('/Assets', ExpressJS.static('Assets'));

Website.listen(Config.Port, async () => {
    console.log(`${Chalk.gray('[Website] | ')}${Chalk.greenBright('Website is online at: ')}${Chalk.redBright(`localhost:${Config.Port}`)}`);
});