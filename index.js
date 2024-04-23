// // CRUD OPERATIONS
// // adding a new expense->/add expense
// // view existing ones->/get-expenses(get)
// // edit existing entries->/update-expense(patch)
// // deleting entries->/delete-expenses(delete)
//
// // adding a new user
// validating existing user
// // monthly analysis
// Database - Expense Tracker
// Collection 
       //1)-ExpenseDetails
            //   amount(number)
            //   category(string)
            //   Date(string)
        // 2)UserDetails
            //userName
            // emailID
            // password
      // 
const express=require('express')
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const cors=require('cors')
const {Expense}=require('./schema.js')//importing the Expense model from the schema.js to index.js
const {User}=require('./schema.js')

const app=express();
app.use(bodyParser.json())
app.use(cors())//-->if the cors is not given it will respond for al the request given from anywhere.So it necessary to give cors

// the function is given as async because only after the connection established with mongoose the app should listen to the port i have given. so i have used async and await
async function connectToDb(){
    //We are using try catch because when an error happened the server will get stopped,to stop the server from crashing we are using try catch block
    try{
    await mongoose.connect('mongodb+srv://kaviyasaran9952:aTtmrYPQoudxJeMO@cluster0.lrbfs7v.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0')//if you  didn't specify the database name it will be added in the test in mongodb
    console.log("DB connection is established!");

    const port=process.env.PORT ||8000 //it is given because while deploying the port we have mentioned may have or not if it is there it can use or use the available port in  
    app.listen(port,function(){
        console.log(`Listening on port ${port}...`);
    })
 }
 catch(error){
    console.log(error);
    console.log("DB Connection not established!")
 }
}
connectToDb()
app.post('/add-expense',async function(request,response){
    try{
    await Expense.create({
        "amount":request.body.amount,
        "category":request.body.category,
        "date":request.body.date
    })
    response.status(201).json({
        "status":"success",
        "message":"entry successfully created"
    })
}
catch(error){
    response.status(500).json({
        "status":"failure",
        "message":"entry not created",
        "error":error
    })
}
})
app.get('/get-expenses',async function(request,response){
    try{
   const expenseDetails=await Expense.find()
    response.status(200).json(expenseDetails)
   }
   catch(error){
    response.status(500).json({
        "status":"failure",
        "message":"couldn't fetch data",
        "error":error
    })
   }
})
//should be deleted usind the unique id
app.delete('/delete-expense/:id',async function(request,response){      //should give : to indicate that it is params
    // console.log(request.params.id)----> //we can also pass the data using params and query also
    // response.json("hello");
    try{
    await Expense.findByIdAndDelete(request.params.id)
    response.status(200).json({
        "status":"sucess",
        "message":"entry deleted"
    })
    }
    catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"couldn't delete entry",
            "error":error
        })
    }
})

//update-->should be updated using id 
app.patch('/update-expense/:id',async function(request,response){
    try{
        await Expense.findByIdAndUpdate(request.params.id,{ //first parameter is id and the second parameter is the data to be appended 
      "amount":request.body.amount,
      "category":request.body.category,
      "date":request.body.date
        })
        response.status(200).json({
            "status":"success",
            "message":"entry updated"
        })
    }catch (error){
        response.status(500).json({
            "status":"failure",
            "message":"couldn't update entry",
            "error":error
        })
    }
})
