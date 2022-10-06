const Lesson = require("./../models/lessons.model");

exports.add = (req, res) => {
    
    const lesson = new Lesson({
        lessonID: req.body.lessonID,
        lessonName: req.body.lessonName,
        lessonContent: req.body.lessonContent,
        lessonVideoLink: req.body.lessonVideoLink,
        studentLevel: req.body.studentLevel,
    });

    lesson.save().then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Lesson."
        });
    });

};

exports.get = (req, res) => {
    Lesson.find()
        .then( lesson => {
            res.status(200).send(lesson);
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

    const {lessonID, lessonName, lessonContent, lessonVideoLink, studentLevel} = req.body;
    console.log(req.body);
    
    Lesson.findOne({_id : req.body.id }, (err, foundLesson) => {
        if(err) return res.status(401).send(err);

        if(!foundLesson) return res.status(404).send("Lesson not found");

        if(lessonID){
            foundLesson.lessonID = req.body.lessonID;
        }
        if(lessonName){
            foundLesson.lessonName = req.body.lessonName;
        }
        if(lessonContent){
            foundLesson.lessonContent = req.body.lessonContent;
        }
        if(lessonVideoLink){
            foundLesson.lessonVideoLink = req.body.lessonVideoLink;
        }
        if(studentLevel){
            foundLesson.studentLevel = req.body.studentLevel;
        }

        foundLesson.save((err, savedLesson) => {
            if(err) return res.status(401).send(err);

            if(!savedLesson) return res.status(404).send("Not saved");

            return res.status(200).send(savedLesson);
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
    
    await Lesson.findOneAndDelete({ _id: req.params.id })
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
        const les = await Lesson.findOne({ _id: req.params.id });
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
        const les = await lesson.findOne({ name : req.params.id });
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

exports.getCurrentLesson = async (req, res) => {

    console.log(req);

    try {
        const les = await Lesson.findOne({ lessonID : req.params.id });
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