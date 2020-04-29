const download = require("download-git-repo");
const template = "qingye/react-umd-library-template#master";

module.exports = async (name) => {
    console.log("Downloading the template.....");
    const result = await getTemplate(name);
    if (!result) {
        console.log('下载模板失败...请重试!');
        process.exit();
    }
};

function getTemplate(name) {
    return new Promise((resolve, reject) => {
        download(template, `./${name}`, null, error => {
            if (error) {
                reject(0);
            }
            resolve(1);
        });
    });
}