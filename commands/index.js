const path = require("path");
const fs = require('fs-extra');
const download = require("./utils/download");
const install = require("./utils/install");

module.exports = async (name) => {
    const dir = path.join(process.cwd(), name);
    await fs.ensureDir(dir);
    await download(name);
    await install(name);

    console.log(
        '...finished!\n\n' +
        'Usage:\n\t' +
        'yarn dist\n'
    );
};