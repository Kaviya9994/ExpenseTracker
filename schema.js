// We are using mongoose to design schema
const mongoose=require('mongoose')
// Defining schema
const expenseDetailsSchema=new mongoose.Schema({
    amount:{
        type:Number
    },
    category:{
        type:String
    },
    date:{
        type:String
    },
})
//using model only we can access the database 
// creating a model-->give name of the model in capital letter
const Expense=mongoose.model('ExpenseDetails',expenseDetailsSchema) //first parameter collection ,second parameter schema that have created. 
                                                                    // If there the collection is available it performs from the collection otherwise it creates new collection

const userDetailsSchema=new mongoose.Schema({
username:{
    type:String
},
emailID:{
    type:String
},
password:{
    type:String
}
})
const User=mongoose.model('UserDetails',userDetailsSchema)

module.exports={Expense,User} //exporting the model


