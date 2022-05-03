const ExpressJS = require('express');
const Configuration = require('./config.json');
const Chalk = require('chalk');
const fs = require('fs');

const PersonalApp = ExpressJS();

PersonalApp.use(ExpressJS.static('.'));

PersonalApp.get('/', function(req, res){
    res.sendFile('./Pages/index.html', {root: "."});
});

PersonalApp.listen(Configuration.Port, () => {
    console.log(Chalk.gray('--------------------------------------------------------------------------------------------------------------------------'));
    console.log(`${Chalk.blueBright(`[Personal Site]`)} Online at ${Chalk.greenBright(Configuration.Website)}.`);
    console.log(Chalk.gray('--------------------------------------------------------------------------------------------------------------------------'));
    console.log(`${Chalk.blueBright(`[Personal Site]`)} Created By: ${Chalk.blueBright(`@DEV_DIBSTER`)}.`);
	console.log(`${Chalk.blueBright(`[Personal Site]`)} Used For: ${Chalk.redBright(`Personal Website created by DIBSTER.`)}`);
	console.log(`${Chalk.blueBright(`[Personal Site]`)} Contact Email: ${Chalk.redBright(`contact@dibster.is-a.dev`)}`);
    console.log(Chalk.gray('--------------------------------------------------------------------------------------------------------------------------'));
});