const catchAsync = require("./../utils/catchAsync");
const runCommand = require("../utils/shellCommand")
const util = require('util');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


async function createBackupFn(db, destination) {
    const command = `mongodump --archive=${destination}.gz --gzip --db=${db}`
    await runCommand(command);
}

exports.createBackup = catchAsync(async (req, res, next) => {
    const time = new Date().getTime();
    const db = req.query.db;
    const name = req.query.name || db;
    const destination = req.query.destination + "\\" + name + "" + time;
    
    await createBackupFn(db,destination);
    res.json({
        status: 'sucess',
        message: `sucessfully backed up in ${destination}`,
        // result: result,
    })

});

exports.restore = catchAsync(async (req, res, next) => {
    const destination = req.query.destination;
    // --nsFrom='schoolAPI*' --nsTo='schoolAPI*'
    const command = `mongorestore --archive=${destination}`
    const result = await runCommand(command);
    res.json({
        status: 'sucess',
        message: `restored from ${destination}`
    })
})




