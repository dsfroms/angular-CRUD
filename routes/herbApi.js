// Serve to our AngularJS client

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('herbdb', server);

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'herbdb' database");
        db.collection('herbs', {strict: true}, function (err, collection) {
            if (err) {
                console.log("Creating collection with sample data...");
                populateDB();
            }
        });
    }
});

exports.find = function (req, res) {
    db.collection('herbs', function (err, collection) {
        var limit = req.query.limit,
            skip = limit * (req.query.page - 1),
            size = 0;
        console.log('Retrieving Herbs: ' + skip + ' ' + limit);
        collection.count(function (err, count) {
            size = count;
        });
        collection.find({}, {"limit": limit, "skip": skip}).toArray(function (err, items) {
            res.json({herbs: items, size: size});
        });
    });
};

exports.findById = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving Herb: ' + id);
    db.collection('herbs', function (err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function (err, item) {
            res.send(item);
        });
    });
};

exports.addHerb = function (req, res) {
    var herb = req.body;
    console.log('Adding herb: ' + JSON.stringify(herb));
    db.collection('herbs', function (err, collection) {
        collection.insert(herb, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateHerb = function (req, res) {
    var id = req.params.id;
    var herb = req.body;
    console.log('Updating Herb: ' + id);
    console.log(JSON.stringify(herb));
    delete herb._id;
    db.collection('herbs', function (err, collection) {
        collection.update({'_id': new BSON.ObjectID(id)}, herb, {safe: true}, function (err, result) {
            if (err) {
                console.log('Error updating herb: ' + err);
                res.send({'error': 'error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                herb._id = id;
                res.send(herb);
            }
        });
    });
}

exports.deleteHerb = function (req, res) {
    var id = req.params.id;
    console.log('Deleting Herb: ' + id);
    db.collection('herbs', function (err, collection) {
        collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': ' error has occurred - ' + err});
            } else {
                console.log(result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}


var populateDB = function () {

    var herbs = [
        {
            name: "Ashwagandha",
            description: "The leaf and berry are helpful in treating a vast array of ailments: calming anxiety, lowering inflammation and blood pressure and strengthening the immune system",
            picture: "Ashwagandha.jpg",
            flickrlink: "http://www.flickr.com/photos/28567825@N03/3090910521"
        },
        {
            name: "Calendula",
            description: "Calendula is often used to help ease upset stomachs, but when applied directly to the skin, may help heal burns, cuts and bruises. It has also been used to treat a sore throat, as its anti-inflammatory properties",
            picture: "Calendula.jpg",
            flickrlink: "http://www.flickr.com/photos/27384147@N02/7664221352"
        },
        {
            name: "Cilantro",
            description: "Cilantro is high in vitamin K, reports Livestrong. And that, in turn, improves bone strength and helps the blood clot.",
            picture: "Cilantro.jpg",
            flickrlink: "http://www.flickr.com/photos/47854142@N04/6993731457"
        },
        {
            name: "Cinnamon",
            description: "There's some research to suggest that cinnamon may lower blood sugar levels in people with type 2 diabetes and reduce cholesterol levels.",
            picture: "Cinnamon.jpg",
            flickrlink: "http://www.flickr.com/photos/65187097@N03/7309903584"
        },
        {
            name: "Cumin",
            description: "Cumin may help people with diabetes keep blood sugar levels in check. But it also has powerful germ-fighting properties that might prevent stomach ulcers",
            picture: "Cumin.jpg",
            flickrlink: "http://www.flickr.com/photos/70757891@N00/7160308468"
        },
        {
            name: "Milk Thistle",
            description: "An herb that is often processed into capsule form, milk thistle is thought to help delay the growth of cancerous tumors, thanks to its richness in the antioxidant silymarin, according to National Cancer Institute.",
            picture: "Milk Thistle.jpg",
            flickrlink: "http://www.flickr.com/photos/42076387@N00/4815325600"
        },
        {
            name: "Mint",
            description: "Mint is helpful in treating a number of digestive ailments, but most notably irritable bowel syndrome. In one 2011 study, researchers found that peppermint oil was effective in alleviating symptoms of irritable bowel syndrome.",
            picture: "Mint.jpg",
            flickrlink: "http://www.flickr.com/photos/29059495@N03/7996552235"
        },
        {
            name: "Oregano",
            description: "Oregano has both antibacterial and antifungal properties that make it effective against some forms of food-borne illnesses and even some antibiotic resistant infections. It has also been found to be effective against yeast-based infections like vaginitis and oral thrush.",
            picture: "Oregano.jpg",
            flickrlink: "http://www.flickr.com/photos/58545726@N02/5620133116"
        },
        {
            name: "Rosemary",
            description: "This popular garden herb is rich in rosmarinic acid as well as many other antioxidants, making it fantastic against inflammation. There’s also some evidence that it stimulates the production of acetylcholine, which in turn helps boost learning and memory.",
            picture: "Oregano.jpg",
            flickrlink: "http://www.flickr.com/photos/29059495@N03/7996554412"
        },
        {
            name: "Thyme",
            description: "This common garden herb is full of antioxidants, like thymol, lavonoids apigenin, naringenin, luteolin, and thymonin. Antioxidants prevent cellular damage that can boost overall health and help prevent cancer, inflammation, signs of aging and more.",
            picture: "Thyme.jpg",
            flickrlink: "http://www.flickr.com/photos/58545726@N02/6121426994"
        },
        {
            name: "Burdock",
            description: "It's possible to cook and eat the root of this plant as food, but, along with its leaves and seeds, it's also used in supplement form, mainly to fight bacteria and inflammation and to detox the body.",
            picture: "Burdock.jpg",
            flickrlink: "http://www.flickr.com/photos/19646481@N06/7750014678"
        }
    ];

    db.collection('herbs', function (err, collection) {
        collection.insert(herbs, {safe: true}, function (err, result) {
        });
    });

};
