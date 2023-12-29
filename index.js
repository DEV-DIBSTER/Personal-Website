const ExpressJS = require('express');
const Chalk = require('chalk');
const Config = require('./config.json');
const Path = require('path');

const Website = ExpressJS();
Website.use(ExpressJS.static('Pages'));

//Serves the root file.
Website.get('/', async (Request, Response) => {
    await Response.status(200).sendFile('./Pages/index.html', { root: __dirname });
});

//Dynamically serve my pages.
Website.get('/pages/:page', async (Request, Response) => {
    const FileName = Request.params.page;
    const FilePath = Path.join(__dirname, 'Pages', `${FileName}.html`);

    await Response.status(200).sendFile(FilePath);
});

//Dynamically serve website content.
Website.get('/components/:filename', async (Request, Response) => {
    const FileName = Request.params.filename;
    const FilePath = Path.join(__dirname, 'Components', FileName);

    await Response.status(200).sendFile(FilePath);
});

//Dynamically serve scripts.
Website.get('/scripts/:filename', async (Request, Response) => {
    const FileName = Request.params.filename;
    const FilePath = Path.join(__dirname, 'Scripts', FileName);

    await Response.status(200).sendFile(FilePath);
});

//Serving static Website Assets.
Website.use('/Assets', ExpressJS.static('Assets'));

Website.listen(Config.Port, async () => {
    console.log(`${Chalk.gray('[Website] | ')}${Chalk.greenBright('Website is online at: ')}${Chalk.redBright(`localhost:${Config.Port}`)}`);
});