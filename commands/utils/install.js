const fs = require('fs-extra');
const spawn = require("cross-spawn");
const option = {cwd: '', stdio: 'pipe'};

module.exports = async (name) => {
    const dir = `./${name}`;
    option.cwd = dir;

    // 加载模板中的package.json
    const config = await fs.readJson(`${dir}/package.json`);

    // 重写项目名
    config.name = name;

    // 获取要安装的npm包的名称
    const pkgs = Object.keys(config.dependencies);

    // 更新模板中的依赖包到最新版本
    config.dependencies = await getNewestVersion(pkgs);

    // 重写模板中的package.json
    await fs.writeJson(`${dir}/package.json`, config);

    // yarn install
    await installAll();
};

/************************************************************************************
 * 查看所有npm包的最新版本
 ************************************************************************************/
async function getNewestVersion(pkgs) {
    console.log('Check the newest version of npm package.....');
    const dep = {};
    for (let i = 0; i < pkgs.length; i++) {
        pkgs[i] = {pkg: pkgs[i], value: verByPkg(pkgs[i])};
        await pkgs[i].value;
    }
    for (let i = 0; i < pkgs.length; i++) {
        pkgs[i].value.then(version => {
            dep[pkgs[i].pkg] = version;
        });
    }
    return dep;
}

/************************************************************************************
 * 查看某个npm包的最新版本
 ************************************************************************************/
async function verByPkg(pkg) {
    return new Promise(resolve => {
        const child = spawn('npm', ['info', pkg, 'version'], option);
        child.stdout.on('data', version => {
            resolve(version.toString().replace(/[\r|\n]/g, ''));
        });
    });
}

/************************************************************************************
 * install that specified in dependencies
 ************************************************************************************/
async function installAll() {
    console.log('install node_modules');
    return new Promise(resolve => {
        const child = spawn('yarn', ['install'], option);
        child.once('close', () => {
            resolve();
        });
    })
}