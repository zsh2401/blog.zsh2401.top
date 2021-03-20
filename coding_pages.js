#!/usr/bin/env node
/*
 * Created on Sat Mar 20 2021
 *
 * Version 2
 * Copyright (c) 2021 Seymour Zhang
 */

const ghpages = require('gh-pages')
const path = require('path');
if (!process.env.FULL_REPO) {
    throw "FULL_REPO is not defined in ENV!!!!!. It's should be like this: https://username:password@xxx.xxx.git";
}

ghpages.publish(path.resolve(__dirname, "./public"), {
    repo: FULL_REPO
}, (err) => {
    if (err) {
        throw err;
    }
});