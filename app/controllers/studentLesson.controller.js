const StudentLesson = require("./../models/studentLesson.model");

exports.add = (req, res) => {
    
    const studentLesson = new StudentLesson({
        studentID: req.body.studentID,
        lessonID: req.body.lessonID,
    });

    studentLesson.save().then(data => {
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
    StudentLesson.find()
        .then( studentLesson => {
            res.status(200).send(studentLesson);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the data."
            });
        });

};

exports.update = (req, res) => {

    // let stID = req.params.id; 

    // const {lessonID} = req.body;

    // const updateStudentLesson = {
    //     lessonID
    // }


    // StudentLesson.findByIdAndUpdate(stID, updateStudentLesson).then(()=> {
    //     res.status(200).send({status: "Student & Lesson Updated"})
    // }).catch((err)=> {
    //     console.log(err)
    //     res.status(500).send({status: "Error with updating data" })
    // })


   
    if (req.body.studentID == null || req.body.studentID == undefined) {
        res.status(400).send({
            message: "ID can not be empty!"
        });
        return;
    }

    const {lessonID} = req.body;
    console.log(req.body);
    
    StudentLesson.findOne({studentID : req.body.studentID }, (err, foundStudentLesson) => {
        if(err) return res.status(401).send(err);

        if(!foundStudentLesson) return res.status(404).send("Student & lesson not found");

        if(lessonID){
            foundStudentLesson.lessonID = req.body.lessonID;
        }
       
        

        foundStudentLesson.save((err, savedStudentLesson) => {
            if(err) return res.status(401).send(err);

            if(!savedStudentLesson) return res.status(404).send("Not saved");

            return res.status(200).send(savedStudentLesson);
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
    
    await StudentLesson.findOneAndDelete({ _id: req.params.id })
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
        const les = await StudentLesson.findOne({ _id: req.params.id });
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

exports.getLesson = async (req, res) => {

    console.log(req);

    try {
        const les = await StudentLesson.findOne({ studentID : req.params.id });
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