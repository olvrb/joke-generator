import { item } from './interfaces/menuItem';
import { clear, get } from './utilities';
const menu = require('console-menu'); // module doesn't have declaration file
import chalk from 'chalk';
const Spinner = require('cli-spinner').Spinner;
const Confirm = require('prompt-confirm');
const prompt = new Confirm({
    name: 'keep',
    message: 'Keep going?'
});
const spinner = new Spinner('%s Please wait...');
spinner.setSpinnerString(13);
clear();

const f = () => {
    clear();
    menu(
        [
            { hotkey: '1', title: 'Dad joke' },
            { hotkey: '2', title: 'Normal joke' },
            { hotkey: '3', title: 'Yo momma joke' },
            { separator: true }
        ],
        {
            header:
                'Please select which kind of joke you would like to generate.',
            border: false
        }
    ).then(async (item: item) => {
        clear();
        if (item) {
            switch (item.title) {
                case 'Dad joke': {
                    spinner.start();
                    const body = JSON.parse(
                        await get('https://icanhazdadjoke.com/')
                    );
                    spinner.stop();
                    clear();
                    console.log(`${chalk.blueBright(body.joke)}`);
                    break;
                }
                case 'Normal joke': {
                    spinner.start();
                    const body = JSON.parse(
                        await get(
                            'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke'
                        )
                    );
                    spinner.stop();
                    clear();
                    console.log(
                        `${chalk.blueBright(body.setup)}\n\n${chalk.redBright(
                            body.punchline
                        )}\n`
                    );
                    break;
                }
                case 'Yo momma joke': {
                    spinner.start();
                    const body = JSON.parse(
                        await get('https://api.yomomma.info/')
                    );
                    spinner.stop();
                    clear();
                    console.log(`${chalk.blueBright(body.joke)}\n`);
                    break;
                }

                default: {
                    break;
                }
            }
            prompt.ask((answer: any) => {
                if (answer) return f();
                return;
            });
        } else {
            console.log('You cancelled the menu.');
        }
    });
};

f();
