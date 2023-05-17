// @import type="text/javascript" src="https://www.gstatic.com/charts/loader.js"
function myFun(){
    window.location.href="/news";
}


function updatedata(){
    // app.post("/updata_data",function(req,res){
    //     const rollno=req.body.rollno;
    //     const minor1=req.body.minor1;
    //     const minor2=req.body.minor2;
    //     const mid=req.body.mid;
    //     const end=req.body.end;
    //     const total=req.body.total;
    //     const attendance=req.body.attendance;
    //     connection.query('update cs251 set minor1=?,minor2=?,mid=?,endm=?,total=?,attendance=? where rollno=?',[minor1,minor2,mid,end,total,attendance,rollno],function(err,results){
    //         if(err) throw err;
    //         else{
    //             window.alert('successfully updated!!');
    //         }
    //     });
    // });
}
const mysql=require("mysql");
const express=require("express");
const app=express();
const bodyParser=require('body-parser');
const ejs=require('ejs');


const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Babu@244",
    database:"db2"
});

app.use(express.static(__dirname+'views'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("asset"));
app.use(bodyParser.json());
app.use(express.static("public"));

connection.connect(function(error){
    if(error) throw error
    else console.log("connected to database successfully")
});

app.get("/1.html",function(req,res){
    res.sendFile(__dirname+"/1.html");
});
app.get("/3.html",function(req,res){
    res.sendFile(__dirname+"/3.html");
});
app.get("/4.html",function(req,res){
    res.sendFile(__dirname+"/4.html");
});
app.get("/2.html",function(req,res){
    res.sendFile(__dirname+"/2.html");
})
app.get("/annadd.html",function(req,res){
    res.sendFile(__dirname+"/annadd.html");
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/home.html");
});
app.get("/studentlogin.html",function(req,res){
    res.sendFile(__dirname+"/studentlogin.html");
});
app.get("/facultylogin.html",function(req,res){
    res.sendFile(__dirname+"/facultylogin.html");
});
app.get("/contact.html",function(req,res){
    res.sendFile(__dirname+"/contact.html");
});
app.get("/about.html",function(req,res){
    res.sendFile(__dirname+"/about.html");
});
app.get("/facultyafterlogin.html",function(req,res){
    res.sendFile(__dirname+"/facultyafterlogin.html");
});
app.get("/studentafterlogin.html",function(req,res){
    res.sendFile(__dirname+"/studentafterlogin.html");
});
app.get("/info.html",function(req,res){
    res.sendFile(__dirname+"/info.html");
});
app.get("/cs251.html",function(req,res){
    res.sendFile(__dirname+"/cs251.html");
});
app.get("/cs252.html",function(req,res){
    res.sendFile(__dirname+"/cs252.html");
});
app.get("/cs253.html",function(req,res){
    res.sendFile(__dirname+"/cs253.html");
});
app.get("/cs254.html",function(req,res){
    res.sendFile(__dirname+"/cs254.html");
});
app.get("/cs255.html",function(req,res){
    res.sendFile(__dirname+"/cs255.html");
});
// app.get("/info.ejs",function(req,res){
//     res.sendFile("/info.ejs");
// });
 var username;
//  app.get('/database_table',username,function(req,res){
//      connection.query('select * from cs255 where rollno=?',[username],function(err,results,fields){
//         if(err) throw err;
//         var data1=JSON.parse(JSON.stringify(results))
//         res.render('info',{data:data1});
       
//      });
//  });
app.post('/database_table',function(req,res){
    username=req.body.rollno;
    let data1,data2,data3,data4,data5,data6;
    connection.query('select * from cs251 where rollno=?',username,function(err,results,fields){
       if(err) throw err;
       data1=JSON.parse(JSON.stringify(results));
    });
    connection.query('select * from cs252 where rollno=?',username,function(err,results,fields){
        if(err) throw err;
        data2=JSON.parse(JSON.stringify(results));
     });
     connection.query('select * from cs253 where rollno=?',username,function(err,results,fields){
        if(err) throw err;
        data3=JSON.parse(JSON.stringify(results));
        
     });
     connection.query('select * from cs254 where rollno=?',username,function(err,results,fields){
        if(err) throw err;
        data4=JSON.parse(JSON.stringify(results));
        
     });
     connection.query('select * from cs255 where rollno=?',username,function(err,results,fields){
       if(err) throw err;
       data5=JSON.parse(JSON.stringify(results));
      
    });
    connection.query('select * from cgpa where rollno=?',username,function(err,results,fields){
        if(err) throw err;
        data6=JSON.parse(JSON.stringify(results));
        res.render('info',{data:data1,data1:data2,data2:data3,data3:data4,data4:data5,data5:data6});
       
     });
});
app.post('/dept_news',function(req,res){
    const yes=req.body.ansy;
    const no=req.body.ansn;
    let data2;
    let data3;
    let data4;
    if(yes){
        connection.query('select * from ac3',function(err,results,fields){
            if(err) throw err;
            data3=JSON.parse(JSON.stringify(results));
            // res.render('news',{data:data3});
        });
        connection.query('select * from timetable',function(err,results,fields){
            if(err) throw err;
            data4=JSON.parse(JSON.stringify(results));
        })
        connection.query('select * from announcements',function(err,results,fields){
            if(err) throw err;
            data2=JSON.parse(JSON.stringify(results));
            res.render('news',{data2:data2,data3:data3,data4:data4});
        });
        
    }
    
});
app.post("/student",function(req,res){
    const username=req.body.username;
    const pass=req.body.password;
    if(username && pass){
        connection.query('select * from student where username=? and password=?',[username,pass],function(err,results,fields){
            if(err) throw err;
            if(results.length>0){
                res.redirect("/studentafterlogin.html");
            }
            else{
                res.send('Incorrect username or password!!');
            }
            res.end();
        })
    }
    else{
        res.send('Please Enter username and password!!');
    }
    
});
app.post("/faculty",function(req,res){
    const username=req.body.username;
    const passf=req.body.password;
    if(username && passf){
        connection.query('select * from faculty where username=? and password=?',[username,passf],function(err,results,fields){
            if(err) throw err;
            if(results.length>0){
                res.redirect('/facultyafterlogin.html');
            }
            else{
                res.send('Incorrect username or password!!');
            }
            res.end();
        });
    }
    else{
        res.send('Please Enter username and password!!');
    }
});
app.post("/announce",function(req,res){
    const ann=req.body.ann;
    if(ann){
        // connection.query('select * from announcements where ann=?',[ann],function(req,results,fields){
        //     if(err) throw err;
        //     if(results.length>0){
        //         res.send('The announcement is already announced!!!');
        //     }
           // else{
                connection.query('insert into announcements(ann) values(?)',[ann],function(err,result){
                    if(err) throw err;
                    if(result.affectedRows>0){
                       res.redirect('/facultyafterlogin.html');
                    }
                    res.end();
                });
    //        }
           
        //});
    }
    else{
        res.send('please enter the text you want to announce!!!');
    }
});
app.post("/updata_data",function(req,res){
    const rollno=req.body.rollno;
    const minor1=req.body.minor1;
    const minor2=req.body.minor2;
    const mid=req.body.mid;
    const end=req.body.end;
    const total=req.body.total;
    const attendance=req.body.attendance;
    if(rollno){
        connection.query('update cs251 set minor1=?,minor2=?,mid=?,endm=?,total=?,attendance=? where rollno=?',[minor1,minor2,mid,end,total,attendance,rollno],function(err,results){
            if(err) throw err;
            res.send('successfully updated!!');
        });
    }
    else{
        res.send('enter rollno!!');
    }
});
app.post("/updata_cs252",function(req,res){
    const rollno=req.body.rollno;
    const minor1=req.body.minor1;
    const minor2=req.body.minor2;
    const mid=req.body.mid;
    const end=req.body.end;
    const total=req.body.total;
    const attendance=req.body.attendance;
    if(rollno){
        connection.query('update cs252 set minor1=?,minor2=?,mid=?,endm=?,total=?,attendance=? where rollno=?',[minor1,minor2,mid,end,total,attendance,rollno],function(err,results){
            if(err) throw err;
            res.send('successfully updated!!');
        });
    }
    else{
        res.send('enter rollno!!');
    }
});
app.post("/updata_cs253",function(req,res){
    const rollno=req.body.rollno;
    const minor1=req.body.minor1;
    const minor2=req.body.minor2;
    const mid=req.body.mid;
    const end=req.body.end;
    const total=req.body.total;
    const attendance=req.body.attendance;
    if(rollno){
        connection.query('update cs253 set minor1=?,minor2=?,mid=?,endm=?,total=?,attendance=? where rollno=?',[minor1,minor2,mid,end,total,attendance,rollno],function(err,results){
            if(err) throw err;
            res.send('successfully updated!!');
        });
    }
    else{
        res.send('enter rollno!!');
    }
});
app.post("/updata_cs254",function(req,res){
    const rollno=req.body.rollno;
    const minor1=req.body.minor1;
    const minor2=req.body.minor2;
    const mid=req.body.mid;
    const end=req.body.end;
    const total=req.body.total;
    const attendance=req.body.attendance;
    if(rollno){
        connection.query('update cs254 set minor1=?,minor2=?,mid=?,endm=?,total=?,attendance=? where rollno=?',[minor1,minor2,mid,end,total,attendance,rollno],function(err,results){
            if(err) throw err;
            res.send('successfully updated!!');
        });
    }
    else{
        res.send('enter rollno!!');
    }
});
app.post("/updata_cs255",function(req,res){
    const rollno=req.body.rollno;
    const minor1=req.body.minor1;
    const minor2=req.body.minor2;
    const mid=req.body.mid;
    const end=req.body.end;
    const total=req.body.total;
    const attendance=req.body.attendance;
    if(rollno){
        connection.query('update cs255 set minor1=?,minor2=?,mid=?,endm=?,total=?,attendance=? where rollno=?',[minor1,minor2,mid,end,total,attendance,rollno],function(err,results){
            if(err) throw err;
            res.send('successfully updated!!');
        });
    }
    else{
        res.send('enter rollno!!');
    }
});
app.post("/update_time_table",function(req,res){
    const day=req.body.day;
    const morning=req.body.morning;
    const lunch=req.body.lunch;
    const two=req.body.two;
    const three=req.body.three;
    const four=req.body.four;
    const five=req.body.five;
    if(rollno){
        connection.query('update timetable set morning=?,twelvetotwothirty=?,twotothree=?,threetofour=?,fourtofive=?,fivetofivethirty=? where theday=?',[morning,lunch,two.three,four,five,day],function(err,results){
            if(err) throw err;
            res.send('successfully updated!!');
        });
    }
    else{
        res.send('enter rollno!!');
    }
});
app.post("/update_academic_calender",function(req,res){
    const event=req.body.event;
    const sem1=req.body.sem1;
    const sem2=req.body.sem2;
    if(rollno){
        connection.query('update ac3 set sem1=?,sem2=? where event=?',[sem1,sem2,event],function(err,results){
            if(err) throw err;
            res.send('successfully updated!!');
        });
    }
    else{
        res.send('enter rollno!!');
    }
});
app.post("/update_cgpa_sgpa",function(req,res){
    const rollno=req.body.rollno;
    const cgpa=req.body.cgpa;
    const sgpa=req.body.sgpa;
    if(rollno){
        connection.query('update cgpa set cgpa=?,sgpa=? where rollno=?',[cgpa,sgpa,rollno],function(err,results){
            if(err) throw err;
            res.send('successfully updated!!');
        });
    }
    else{
        res.send('enter rollno!!');
    }
});


app.listen(4500);

