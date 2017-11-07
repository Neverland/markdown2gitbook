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
const EXEC = require('child_process').exec;

const RUN = require('exec-cmd');

const PROGRESS = require('../../util/progress')();

const LOG = require('../../util/log');

const TARGET_DIR = PATH.join('./');                         // ./
const DOC_DIR = PATH.join(TARGET_DIR, '_doc');               // ./doc
const DOC_SOURCE = PATH.join(DOC_DIR, '/source');           // ./doc/source
const GITBOOK_DIR = PATH.join(DOC_SOURCE, '/gitbook');      // ./doc/source/gitbook

const DIR_FILTER_REG = /^(\.|_doc|\bnode_modules\b)/i;

const CREATE_SUMMARY = require('./summary');

let fileTree = [];
let createGitBookCopy = path => {
    path = path || TARGET_DIR;

    /**
     * 读取当前目录的目录结构和文件，并过滤隐藏文件
     *
     * e.g | a
     *     | b
     *     | c
     *     /.idea
     *     |README.md
     *
     * result: ['a', 'b', 'c', 'README.md']
     *
     */
    FS.readdirSync(path)
        .filter(item => !DIR_FILTER_REG.test(item))
        .sort()
        .forEach(item => {
            let target = PATH.join(path, item);
            let isDir = false;

            /**
             * 检查当前元素是不是文件夹，如果是文件夹后面要做递归处理
             */
            try {
                isDir = FS.statSync(target).isDirectory();
            }
            catch(e) {}

            /**
             * 筛选文件和文件夹
             *
             * 1.如果是md文件收集其路径
             * 2.如果是文件夹递归其中的.md文件
             */
            if (isDir) {

                createGitBookCopy(target);
            }
            else if (/.+\.md$/gi.test(target)) {

                /**
                 * 收集.md文件
                 * 1. 收集其路径
                 * 2.文件移动到新的doc文件夹中
                 */
                fileTree.push(target);
                moveFile(target);
            }
        });
};
let moveFile = (target) => {
    /**
     * @type {string} path - md文件路径 // doc/source/gitbook/c/cc/ccc/README.md
     */
    let path = PATH.join(GITBOOK_DIR, '/', target);
    /**
     * @type {string} text - md文件内容
     */
    let text = FS.readFileSync(target);
    /**
     * @type {string} dir - md文件路径 // doc/source/gitbook/c/cc/ccc
     */
    let dir = path.slice(0, path.lastIndexOf('/'));

    /**
     * 根据文件所在路径在doc中创建对应的路径
     *
     */
    RUN('mkdir', ['-p', dir])
        .then(() => {
            FS.writeFileSync(path, text);
        })
        .catch(error => {
            LOG(`${error}!`);
        });
};

module.exports = () => {
    if (FS.existsSync(DOC_DIR)) {
        RUN('rm', ['-rf', 'DOC_DIR']);
    }

    try {
        createGitBookCopy();
        CREATE_SUMMARY(fileTree);
    }
    catch (error) {
        LOG(`${error.message}`, 'red');
    }

    let command = [];

    command.push(`cd ${DOC_SOURCE}`);
    command.push('gitbook build');

    EXEC(command.join(' && '), (error, stdout, stderr) => {
        if (error) {
            LOG(`${error[0]}`);
        }

        PROGRESS.clear();
        LOG('Generation documentation completed!', 'success');
    });
};
