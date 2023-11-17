const ExpressJS = require('express');
const Chalk = require('chalk');
const Config = require('./config.json');
const Path = require('path');

const Website = ExpressJS();
Website.use(ExpressJS.static('Pages'));

Website.get('/', async (Request, Response) => {
    await Response.status(200).sendFile('./Pages/index.html', { root: __dirname });
});

Website.get('/contact', async (Request, Response) => {
    await Response.status(200).sendFile('./Pages/contact.html', { root: __dirname });
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

Website.get('/projects', async (Request, Response) => {
    await Response.status(200).sendFile('./Pages/projects.html', { root: __dirname });
});

//Serving static Website Assets.
Website.use('/Assets', ExpressJS.static('Assets'));

Website.listen(Config.Port, async () => {
    console.log(`${Chalk.gray('[Website] | ')}${Chalk.greenBright('Website is online at: ')}${Chalk.redBright(`localhost:${Config.Port}`)}`);
});