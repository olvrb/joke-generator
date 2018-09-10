// Thanks for having a declaration file, chalk.
import chalk from 'chalk';

// These modules don't have a declaration file so we use the regular NodeJS js way of importing them.
const menu = require('console-menu');
const Spinner = require('cli-spinner').Spinner;
const Confirm = require('prompt-confirm');

import { clear, get } from './index';
import { MenuItem } from '../interfaces/menuItem';

// Initializations
const prompt = new Confirm({
    name: 'keep',
    message: 'Keep going?'
});
const spinner = new Spinner('%s Please wait...');

// Configuration
spinner.setSpinnerString(13);

export const makeJoke = () => {
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
    ).then(async (item: MenuItem) => {
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
                if (answer) return makeJoke(); // r e c u r s i o n
                return;
            });
        } else {
            console.log('You cancelled the menu.');
        }
    });
};
