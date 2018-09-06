let Server = require('mongodb').Server,
    MongoClient = require('mongodb').MongoClient,
    config = require(__base + 'config.json'),
    labyrinthDBInstance = null, 
    mongodbUrl = 'mongodb://'+ config.mongodb.host + ':'+ config.mongodb.port + '/' + config.mongodb.db;

exports.connectMongo = callback => {
    MongoClient.connect( mongodbUrl, (err, dbInstance) => {
        if (err) {
            console.log('error while getting connection...');
            callback(err);
        } else {
            labyrinthDBInstance = dbInstance;
            console.log('Mongo DB connection established at ' + 'mongodb://'+ config.mongodb.host + ':'+ config.mongodb.port + ' with dbName ' + config.mongodb.db);
            callback(null);
        }
    });
};

exports.getCollection = (collectionName, callback) => {
    labyrinthDBInstance.collection(collectionName, (err, col) => {
        if (err) {
            callback(err)
        } else {
            callback(null, col);
        }
    });
};