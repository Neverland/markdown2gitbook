#!/usr/bin/env node --harmony
/**
 * @file index.js
 * @author ienix(enix@foxmail.com)
 *
 * @since 2016/9/29
 */

/* global require, process */

'use strict';

process.env.NODE_PATH = __dirname + '/node_modules/';


const PROGRAM = require('commander');

PROGRAM
    .version(require('./package').version );

PROGRAM
    .usage('[option] [...value]');

PROGRAM
    .command('documentation')
    .description('Generate fin documentation')
    .option('-c, --create [boolean]', 'create gitbook doc')
    .option('-s, --server [boolean]', 'server start')
    .alias('d')
    .action(() => {
        require('./command/doc/cli')();
    });

PROGRAM.parse(process.argv);

if (!PROGRAM.args.length) {
    PROGRAM.help();
}
