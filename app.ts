#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";

let sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    })
}

async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow("let's start calculation...");
    await sleep()
    rainbowTitle.stop();
    console.log(`
    ${chalk.cyanBright(
        `
        _____________________
        |  _________________  |
        | | JO           0. | |
        | |_________________| |
        |  ___ ___ ___   ___  |
        | | 7 | 8 | 9 | | + | |
        | |___|___|___| |___| |
        | | 4 | 5 | 6 | | - | |
        | |___|___|___| |___| |
        | | 1 | 2 | 3 | | x | |
        | |___|___|___| |___| |
        | | . | 0 | = | | / | |
        | |___|___|___| |___| |
        |_____________________|
        
        `
    )
        }    
    `
    );

    console.log(
        chalk.cyanBright(
            gradient.pastel.multiline(figlet.textSync("CALCULATOR", { horizontalLayout: 'full' }))
        )
    );


}

await welcome()

async function askQuestion() {
    let answer = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'operator',
                message: 'Which operation you want to perfom? \n',
                choices: ['addition', 'subtraction', 'multiplication', 'division'],
            },
            {
                type: 'number',
                name: 'num1',
                message: 'enter number 1',
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return "Please enter a valid number";
                    }
                    return true;
                }
            },
            {
                type: 'number',
                name: 'num2',
                message: 'enter number 2',
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return "Please enter a valid number";
                    }
                    return true;
                }
            }
        ]);

    switch (answer.operator) {
        case "addition":
            console.log(`${answer.num1} + ${answer.num2} = ${answer.num1 + answer.num2} `);
            break;
        case "subtraction":
            console.log(`${answer.num1} - ${answer.num2} = ${answer.num1 - answer.num2} `);
            break;
        case "multiplication":
            console.log(`${answer.num1} * ${answer.num2} = ${answer.num1 * answer.num2} `);
            break;
        case "division":
            console.log(`${answer.num1} / ${answer.num2} = ${answer.num1 / answer.num2} `);
            break;
        default:
            return 0
    }
}

async function askAgain() {
    do {
        await askQuestion()
        var again = await inquirer.prompt({
            type: "input",
            name: "restart",
            message: "Do you want to continue? press y or n: "
        })
    } while (again.restart === "y" || again.restart === "Y" || again.restart === "yes" || again.restart === "YES");
}

askAgain()
