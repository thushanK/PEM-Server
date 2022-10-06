const WritenTest = require("./../models/writenTests.model");

exports.add = (req, res) => {
    
    const writenTest = new WritenTest({
        lessonID: req.body.lessonID,
        testContent: req.body.testContent,
    });

    writenTest.save().then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Writen Test."
        });
    });

};

exports.get = (req, res) => {
    WritenTest.find()
        .then( writenTest => {
            res.status(200).send(writenTest);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the data."
            });
        });

};

exports.update = (req, res) => {

    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            message: "ID can not be empty!"
        });
        return;
    }

    const {lessonID, testContent} = req.body;
    console.log(req.body);
    
    WritenTest.findOne({_id : req.body.id }, (err, foundWritenTest) => {
        if(err) return res.status(401).send(err);

        if(!foundWritenTest) return res.status(404).send("Lesson not found");

        if(lessonID){
            foundWritenTest.lessonID = req.body.lessonID;
        }
        if(testContent){
            foundWritenTest.testContent = req.body.testContent;
        }

        foundWritenTest.save((err, savedWritenTest) => {
            if(err) return res.status(401).send(err);

            if(!savedWritenTest) return res.status(404).send("Not saved");

            return res.status(200).send(savedWritenTest);
        });
    });

};

exports.delete = async (req, res) => {
    
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    await writenTest.findOneAndDelete({ _id: req.params.id })
    .then( result => {

        if (!result) {
            throw new Error('No record found')
        }

        res.status(200).send({
            message: "Deleted successfully"
        });
    
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the data."
        });
    });   
   
}

exports.getOne = async (req, res) => {

    console.log(req);

    try {
        const wtest = await writenTest.findOne({ _id: req.params.id });
        return res.status(200).send({
            data: wtest
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            error: error
        })
    }

}


exports.getOneByName = async (req, res) => {

    console.log(req);

    try {
        const wtest = await writenTest.findOne({ name : req.params.id });
        return res.status(200).send({
            data: wtest
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            error: error
        })
    }

}

