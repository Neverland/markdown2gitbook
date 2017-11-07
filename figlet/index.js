/**
 * @file FIGlet
 * @author ienix(enix@foxmail.com)
 *
 * @since 2016/12/13
 */

/* global require */

const CHALK = require('chalk');

const figlet = [
    "      _               _                           _   _   __                       __          ",
    "     / \             / |_                        (_) / |_[  |                     [  |  _      ",
    "    / _ \    __   _ `| |-' .--.   ______  .--./) __ `| |-'| |.--.    .--.    .--.  | | / ]     ",
    "   / ___ \  [  | | | | | / .'`\ \|______|/ /'`\;[  | | |  | '/'`\ \/ .'`\ \/ .'`\ \| '' <      ",
    " _/ /   \ \_ | \_/ |,| |,| \__. |        \ \._// | | | |, |  \__/ || \__. || \__. || |`\ \     ",
    "|____| |____|'.__.'_/\__/ '.__.'         .',__` [___]\__/[__;.__.'  '.__.'  '.__.'[__|  \_]    "
];


console.log(CHALK.yellow(`\n Version: ${process.env.npm_package_version}`));

console.log(CHALK.gray(`\n ${figlet.join('\n')} \n`));

console.log(CHALK.yellow(`\n ${process.env.npm_package_name} installed \n`));
