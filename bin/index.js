#!/usr/bin/env node

const program = require("commander");
const version = require("../package.json").version;

program.version(version, "-v, --version");

program
    .arguments("<library-name>")
    .description("使用 create-react-umd-library 创建umd库项目")
    .action(name => {
        require("../commands/index.js")(name);
    })
    .parse(process.argv);

if (!program.args.length) {
    program.help()
}