const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const ToDoTaskData = require('./models/Mytasks');

const app = express();

app.set("view engine", 'ejs')
app.set("views", path.join(__dirname, 'views'));


app.use(express.urlencoded());
app.use(express.static('src'));

var Tasks = [
    // {id:"1",
    //  task:"This is task 1"},
    // {id:"2",
    //  task:"This is task 2"},
    // {id:"3",
    //  task:"This is task 3"}
]


app.get('/', (req,res) => {

    // return res.render("home", {
    //     title:"To Do List",
    //     to_do_list:Tasks
    // });

    ToDoTaskData.find({}, (err, AllTasks) => {
        if(err){
            console.log("error displaying database values");
            return;
        }
        return res.render("home", 
        {
            title:"To Do List App",
            to_do_list: AllTasks
        });
    });
});


// POST method inside the express POSTS THE INPUT

app.post('/add-task', function(req, res){
     
//    Tasks.push(req.body);

    ToDoTaskData.create({
        // id:req.body.id,
        task:req.body.task
    }, (err, newTaskInsert) => {
        if(err){
            console.log("Error Creating the Data.")
            return;
        }

        console.log('******', newTaskInsert);
        return res.redirect('back');
    });


//    return res.redirect('back');
   
});


// GET method inside the express DELETING DATA FROM DB
app.get('/delete/', (req, res) => {
   
    // // console.log(req.query);
    // let id = req.query.id;

    // let todoIndex = Tasks.findIndex(toDos => toDos.id == id);

    // console.log(todoIndex);

    // if(todoIndex!=-1) {
    //     Tasks.splice(todoIndex,1);
    // }

    // return res.redirect("back");

    let id = req.query.id;

    ToDoTaskData.findByIdAndDelete(id, (err) => {
        if(err){
            console.log("Error Deleting")
            return;
        }
        
        return res.redirect('back');
    });

});




app.listen(port, (err) => {
    if(err){
        console.log(`You have reached an unwanted error..! Dear. $(err)`)
        
    }

    console.log("Hii Boss...! Connection Successful..!")

} )


