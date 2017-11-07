/**
 * @file index.js
 * @author ienix(enix@foxmail.com)
 *
 * @since 2016/11/21
 */

/* global require, module */

'use strict';

const PATH = require('path');
const FS = require('fs');
const RUN = require('exec-cmd');

const LOG = require('../../util/log');

const ETPL = require('etpl');

const DOC_DIR = PATH.join('./', '_doc');
const DOC_SOURCE = PATH.join(DOC_DIR, '/source');

let summary = {};
module.exports = fileTree => {
    fileTree.map(item => {
        /**
         * @type {string} path - 文件路径处理为数组
         */
        let path = item.split('/')
                .slice(0, -1);
        /**
         * @type {string} key - cwd目录中的文件夹做key产出summary, 没有对应的目录说明是根目录的md文件（.／）为key
         */
        let key = path[0];

        if (!summary[key] && key) {
            summary[key] = [];
        }
        let value = path.slice(1);

        value.length && summary[key].push(value);

        return path;
    });

    let path = PATH.join(__dirname, '../../template/doc/gitbook.html');
    let template = FS.readFileSync(path, 'utf8');
    let render = ETPL.compile(template);
    let text = render({data: summary, url: 'gitbook/'});

    text = text.replace(/^[\s\t]*(\r\n|\n|\r)/gm,'');

    RUN('cp', ['./README.md', `${DOC_SOURCE}/README.md`])
        .catch(response => {
            LOG(`${response[0]}`);
        });

    FS.writeFileSync(`${DOC_SOURCE}/SUMMARY.md`, text);

    LOG('√ Generation summary completed!', 'green');
    LOG('Wait for a moment! Doc generating...', 'gray');
};
