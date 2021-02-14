const fs = require('fs');

module.exports.getImage = async(name) => {
    const filePath = `img/${name}`;
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                reject(new Error('failed to read image'));
            }
            const base64Image = data.toString('base64');
            resolve(base64Image);
        })
    });
};
