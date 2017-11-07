/**
 * @file cli
 * @author ienix(guoaimin01@baidu.com)
 *
 * @since 2017/11/7
 */

/* global require, module */

const SPAWN = require('child_process').spawn;
const OS = require('os');

const PATH = require('path');
const FS = require('fs');

const PROGRAM = require('commander');
const CO = require('co');

const RUN = require('exec-cmd');

const LOG = require('../../util/log');
const PROGRESS = require('../../util/progress')();

const TARGET_DIR = PATH.join('./');

const CREATE_GIT_BOOK = require('./index');

module.exports = () => {
    CO(function *() {
        if (!FS.existsSync(TARGET_DIR)) {
            LOG('The `components` directory is not exist!');
        }

        let args = PROGRAM.args[0];
        let gitbook = args.gitbook;

        // create doc!

        PROGRESS.set('text', 'Start generating...')
            .start();

        if (gitbook) {
            // gitbook -h 用来检测是否安装了gitbook-cli
            RUN('gitbook', ['-h'])
                .catch(error => {
                    let message = 'The gitbook command is not exit! \n Please run `npm i gitbook-cli -g` !';

                    console.log(error);

                    LOG(message);
                });
            CREATE_GIT_BOOK();
        }

        let server = args.server;

        if (server) {
            let commmand = OS.platform() === 'win32'
                ? `${__dirname}/doc.cmd`
                : ['sh', [`${__dirname}/doc.sh`]];

            let gitbookServer = SPAWN(...commmand);

            gitbookServer.stdout.on('data', (data) => {
                console.log(data.toString());
            });

            gitbookServer.stderr.on('data', (data) => {
                console.log(data.toString());
            });
        }
    });
};
