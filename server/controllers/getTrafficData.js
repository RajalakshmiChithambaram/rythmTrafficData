const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://test:test@cluster0.5payhxw.mongodb.net/?retryWrites=true&w=majority";

//A module to retrieve the data from db for processing
const getTrafficData = function(callback){   
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("rythm_traffic");
        dbo.collection("movements").findOne({}, function(err, result) {
          if (err) throw err;
          const dbData = JSON.parse(result.data);
          db.close();
            callback(null,dbData); 
        });
      });
};

module.exports = {
    getTrafficData: getTrafficData
};
