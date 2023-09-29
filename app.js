const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
            // The validate method recieves an argument. This argument is the user's input, nameInput.
            // also notice that the conditional statement in the fucntion block of the validate method. 
            // if condition evaluates to true, the validation has passed. 
            // if false, the user receives a message and is prompted with the same question until answer is received
        },
        {
            type: 'input',
            name: 'username',
            message: 'Enter your GitHub Username',
            validate: usernameInput => {
                if (usernameInput) {
                    return true;
                } else {
                    console.log('You need to enter your GitHub Username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            // -when- property is like the validate method, but instead of passing the value entered for that specific question in as the parameter, it passes an object of all of the answers given so far as an object
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        },
    ]);
};

const promptProject = portfolioData => {
    console.log(`
    =================
    Add a New Project
    =================
    `);

    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('You need to enter a project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('You need to enter a project description!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input', 
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('You need to enter a project GitHub link!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    // We will add a .then() to the end of the inquirer.prompt() that's returned by promptProject().
    .then(projectData => {
        // We need to use the push() method to place the projectData from inquirer into the new -projects- array we just created.
        portfolioData.projects.push(projectData);
        // we need to evaluate the user reponse whether they wish to add more projects. 
        // this response was captured in the answer object, projectData, in the property confirmAddProject.
        // If the user wishes to add more projects, then this condition will evaluate to true and call the promptProject(portfolioData) function.
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
            // If the user decides not to add more projects, then the condition will evaluate to false and trigger the following statement
        } else {
            return portfolioData;
        }
    });
};

promptUser()
.then(promptProject)
.then(portfolioData => {
    console.log(portfolioData);
});

// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', generatePage(name, github), err => {
//     if (err) throw new Error(err);

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });