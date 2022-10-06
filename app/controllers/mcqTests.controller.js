const MCQ = require("./../models/mcqTests.model");

exports.add = (req, res) => {
    
    const mcq = new MCQ({
        lessonID: req.body.lessonID,
        question: req.body.question,
        awn1: req.body.awn1,
        awn2: req.body.awn2,
        awn3: req.body.awn3,
        awn4: req.body.awn4,
        correct: req.body.correct,
    });

    mcq.save().then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the mcq."
        });
    });

};

exports.get = (req, res) => {
    MCQ.find()
        .then( mcq => {
            res.status(200).send(mcq);
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

    const {lessonID, question, awn1, awn2, awn3, awn4, correct} = req.body;
    console.log(req.body);
    
    MCQ.findOne({_id : req.body.id }, (err, foundMCQ) => {
        if(err) return res.status(401).send(err);

        if(!foundMCQ) return res.status(404).send("Lesson not found");

        if(lessonID){
            foundMCQ.lessonID = req.body.lessonID;
        }
        if(question){
            foundMCQ.question = req.body.question;
        }
        if(awn1){
            foundMCQ.awn1 = req.body.awn1;
        }
        if(awn2){
            foundMCQ.awn2 = req.body.awn2;
        }
        if(awn3){
            foundMCQ.awn3 = req.body.awn3;
        }
        if(awn4){
            foundMCQ.awn4 = req.body.awn4;
        }
        if(correct){
            foundMCQ.correct = req.body.correct;
        }

        foundMCQ.save((err, savedMCQ) => {
            if(err) return res.status(401).send(err);

            if(!savedMCQ) return res.status(404).send("Not saved");

            return res.status(200).send(savedMCQ);
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
    
    await MCQ.findOneAndDelete({ _id: req.params.id })
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
        const les = await MCQ.findOne({ _id: req.params.id });
        return res.status(200).send({
            data: les
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
        const les = await MCQ.findOne({ name : req.params.id });
        return res.status(200).send({
            data: les
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            error: error
        })
    }

}


exports.getMCQByLesson = async (req, res) => {

    console.log(req);

    try {
        const les = await MCQ.find({ lessonID : req.params.id });
        return res.status(200).send({
            data: les
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            error: error
        })
    }

}
