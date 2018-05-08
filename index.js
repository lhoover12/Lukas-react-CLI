#!/usr/bin/env node

var currentNodeVersion = process.versions.node;
var projectName;
var chalk = require('chalk');
var commander = require('commander');
var path = require('path');
var createFile = require('create-file');
var mkdirp = require('mkdirp');


function makeIndex(projectName) {
    const index = `import ${projectName} from \'./${projectName}\';
            \nexport default ${projectName};`
    return index;
}

function makeApp(projectName) {

    const react_app = `import React, { Component } from \'react\';
                \n class ${projectName} extends Component { 
                \n     render() { 
                \n         return ( 
                \n             <div>  
                \n             </div> 
                \n         ); 
                \n     } 
                \n } 
                \n export default  ${projectName};`
    return react_app
}


var program = commander
    .version(require('./package.json').version)
    .arguments('<project-directory>')
    .usage(chalk.green('<project-directory>') + ' [options]')
    .action(function (name) {
        projectName = name;
    })
    .option('--verbose', 'print additional logs')
    .option('--scripts-version <alternative-package>', 'use a non-standard version of react-scripts')
    .allowUnknownOption()
    .on('--help', function () {

    })
    .parse(process.argv);
if (typeof projectName === 'undefined') {
    console.error('Please specify File Name:');
    console.log('  ' + chalk.cyan(program.name()) + chalk.green(' <File-Name>'));
    console.log();
    console.log('For example:');
    console.log('  ' + chalk.cyan(program.name()) + chalk.green('Header'));
    process.exit(1);
} else {

    var root = path.resolve(projectName);
    createFile(`${root}/index.js`, makeIndex(projectName), function (err) {
        // file either already exists or is now created (including non existing directories)
    });
    createFile(`${root}/${projectName}.js`, makeApp(projectName), function (err) {
        // file either already exists or is now created (including non existing directories)
    });
    mkdirp(root, function (err) {
        if (err) {
            console.error(chalk.red("Somthing broke " + err))
        } else {
            console.log(chalk.green('Boom! Component made!'))
            console.log(chalk.cyan(`Check out ./${projectName}`))
        }
    });

}