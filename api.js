// liberaries start
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');
var session = require("express-session");

// liberaries end

//api configuration start
var app = express();//constractor of express
app.use(bodyParser.json());  
app.use(function(req,res,next){
   res.header('Access-Control-Allow-Origin', '*'); // allow different domins
   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});


// app.use(session({
//   cookieName: 'session',
//   secret: 'random_string_goes_here',
//   duration: 30 * 60 * 1000,
//   activeDuration: 1 * 60 * 1000,
// }));
//app.use(session({resave:true, saveUninitialized:true, secret: 'random_string_goes_here'}))
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE',}))
//api configuration end

//Mongoose Schema Model Start

//Mongoose Schema
var Schema=mongoose.Schema;
var EmployeeSchema= new Schema({
    UserName:String,
    Email:String,
    PhoneNumber:Number
});



var RegisterSchema= new Schema({
    UserName:String,
    Email:String,
    Password:String,
    CPassword:String
    
});
//Mongoose Model strat
 var Employee=mongoose.model("employees",EmployeeSchema);
//Mongoose Model End
 var Register=mongoose.model("registers",RegisterSchema);
//Mongoose Schema Model End

// End Point Begin

////////////////////Get///////////////////
app.get('/employees', function(req,res){
    Employee.find({}, function(req,employees){
   
        res.status(200).json(employees);

    });
});

//////////////////Post////////////////////
app.post('/employees',function(req,res){
        var employee=req.body;

       var newemployee=new Employee({
            UserName: req.body.UserName,
            Email: req.body.Email,
            PhoneNumber: req.body.PhoneNumber
        });
        newemployee.save(function(err){
            res.status(200).json(newemployee);
        });
});

///////////////update//////////////
app.patch('/employees/:_id', function(req, res){
        Employee.findById(req.params._id, function(err,user){
            if(err){
                res.status(500).send(err);
            } else {
                user.UserName = req.body.UserName;
                user.Email = req.body.Email;
                user.PhoneNumber = req.body.PhoneNumber;
                //user.userId = req.body.userId;
                user.save();
                res.status(200).json(user);
            }
        });
    });




    /////////////edit post//////////


// app.get('/employees/:_id' ,function (req,res){

//  var id=req.param._id;
//   console.log(id);

//  Employee.findOne.remove({_id: req.params._id, UserName:req.body.UserName, Email:req.body.Email, PhoneNumber: req.body.PhoneNumber}, function(err,doc){
//       res.json(doc);
//   });
// });

////////////////////////////////

/////////Delete api////////////
// app.delete('/employees/:_id', function(req,res){

//     Employee.remove(req.param._id, function(err,deleterecord){

//         if(err){
//             res.send("Error");

//         }else{
//             res.json(deleterecord);
//         }
//     });
// });

//////////////////Search///////////////

// app.get( '/employees', function(req, res) {
//         Employess.find({ }, function(err, emp) {
//             if (err) {
//                 res.send(err);
//                 return;
//             }
//             res.json(emp);
//         });
//     });

app.delete('/deleteRecord/:_id', function (req, res){ 

     if (req.params._id) { 

        Employee.remove({_id: req.params._id}, function(err){ 

        if(!err){ 

       var result = { 

           removed: true, 

           userId: req.params._id
  
        }; 

         res.status(200).json(result); 

     } 

       }); 

 } 
});


////////////////////////Register///////////////////

app.post('/register',function(req,res){
        var register=req.body;
        //req.('password','password is invalid').equal(req.body.CPassword) 
        
       var newRegister=new Register({
            UserName: req.body.UserName,
            Email: req.body.Email,
            Password:req.body.Password,
            CPassword:req.body.CPassword
        });
        newRegister.save(function(err){
            res.status(200).json(newRegister);
        });
});


// app.post('/login', function(req,res){

//     Register.findOne({Email: req.body.Email}).select('email Password').exec(function(error,user){
//         if(error) throw error;
//         if(!user){
//             res.json({success:false, message:'could not authenticate'});

//         }else if(user){
//             var validPassword = user.ComparePassword(req.body.Password);
//             if(!validPassword){
//                  res.json({success:false, message:'could not authenticate'});
//             }else{
//                  res.json({success:true, message:'user is  authenticate'});
//             }
//         }
//     });

// });

app.post('/login', function(req,res){
    var user=req.body;
    
    Register.findOne({Email:user.Email, Password:user.Password}, function(err,finduser){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        
        console.log(req.cookies);
         console.log('***********************');
         console.log(req.session);
        //req.session.userId=user._id;
         res.send(finduser);
        // res.send('first applcation');
         
       // res.render("home", { title: "Home" });
        
    });
});

// app.get('/users/users', function(req,res){

//     res.cookie('name', req.param.users)
//     .send('<p> cookie set <a href="/users">View Here </a>');
// });


// app.get('/' , function(req,res){
//     res.send('first applcation');
//          console.log(req.cookies);
//          console.log('***********************');
//          console.log(req.session);
//     //res.send(req.cookies.name);
// });
// app.get('/', function(req, res) {
//   if (req.session && req.session.finduser) {
//     var username=req.body; // Check if session exists
//     // lookup the user in the DB by pulling their email from the session
//       Register.findOne({ Email: req.session.Email }, function (err, user) {
//       if (!user) {
//         // if the user isn't found in the DB, reset the session info and
//         // redirect the user to the login page
//         req.session.reset();
//         res.redirect('/login');
//       } else {
//         // expose the user to the template
//         res.locals.user = user;
 
//         // render the dashboard page
//         //res.render('dashboard.jade');
//       }
//     });
//   } else {
//     res.redirect('/login');

//   }

// // if(!req.session.visitcount){
// //     req.session.visitcount=1;

// // }else{
// //     req.session.visitcount++;
// // }
// //    console.log(req.session);
// });




//console.log(JSON.stringify(data));
//server port listen
 var server_port=8080;
 var server_ip_address='127.0.0.1';
 var mongo_url='mongodb://localhost/ntest';

 //database connectivity strart

mongoose.connect(mongo_url);

 //database connectivity end

//Api start listening

 var server=app.listen(server_port,server_ip_address, function(){
 console.log("Server listening on " +server_ip_address+ "server port " +server_port);

});
//Api  listening end