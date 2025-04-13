const express=require('express')
const mongoose=require('mongoose')
const app=express();
const cors=require('cors')
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken');
const { number } = require('joi');
const  ObjectId = require('mongodb').ObjectId;
const JWT_SECRET="vufyterityr56i448987r8@%$@$#^6787v_++69867338";
const logger = require("./logger");
// const { connectKafka } = require('./kafkaProducer');


app.use(cors());
app.use(express.json());

// Our server

app.listen(5000,()=>{
    console.log("Server is started ...")
})

// importing from models
require('./model/User')
require('./model/Order')
require('./model/Product')
require('./model/OrderDetails')



// const MongoUrl='mongodb://127.0.0.1:27017/rest-api?authSource=admin&w=1'
const MongoUrl='mongodb+srv://naiksatwik7:satwik123@foodflydb.x1asaku.mongodb.net/?retryWrites=true&w=majority&appName=FoodFlyDB'


mongoose.set('useFindAndModify',false);


// connect express to mongodb
mongoose.connect(MongoUrl,{
    useNewUrlParser:true

}).then(()=>{
    console.log('Connection Done ... ')
}).catch((err)=>{
    console.log(err)
})



//user info
const User=mongoose.model('User');
app.post('/api/register',async(req,res)=>{
    const {name,email,password,address,phone,UserType}=req.body;
    user=email;
    const encryptPassword = await bcrypt.hash(password,10)
     try{
        const oldUser= await User.findOne({email});

         if(oldUser){
            logger.warn(`Registration failed: User already exists - ${email}`);
           return res.send({error:"User Exists"});
        }
        await User.create({
            name:name,
            email:email,
            password:encryptPassword,
            address,
            phone,
            UserType
        })
       
        logger.info(`User registration successfully - ${email}`)
        res.send({
            status:"ok"
        })
    }catch(err){
        logger.err(`Exception in registration: ${err.message}`)
        res.send({
            status:err
        })
    }
})


app.post('/api/sign-in', async(req,res)=>{
    const {email,password}=req.body;
    const registeredEmail= await User.findOne({email});

    if(!registeredEmail){
        logger.warn(`Sign-in attempt with unregistered email - ${email}`);
        return res.send({
            error:"Email Not Exist"
        })
    }
    
    if(await bcrypt.compare(password,registeredEmail.password)){
        const token=jwt.sign({email:registeredEmail.email},JWT_SECRET);
        
        if(res.status(201)){
            logger.info(`User signed in successfully - ${email}`);
            return res.json({
                status:'ok',
                data:token,
                profile:registeredEmail.name,
                userId:registeredEmail._id,
                address:registeredEmail.address,
                phone:registeredEmail.phone,
                UserType:registeredEmail.UserType,
            })
        }else{
            logger.error(`Exception during sign-in - ${email} - ${err.message}`);
            return res.json({
                error:"error"
            })            
        }
    }
    
    logger.warn(`Invalid password attempt - email: ${email}`);
    res.send({
        error:"invalid password"
    })
})


//user Order data
const UserOrder =mongoose.model('UserOrder');


app.post('/api/orderData',async(req,res)=>{
     const {email,order_data,address,phone,order_date}=req.body;
     logger.debug(`Order received for email: ${email}, address: ${address}, phone: ${phone}`);
  
     await  order_data.splice(0,0,{order_date:order_date})
    // await order_data

     let emailId=await UserOrder.findOne({email});

     if(emailId == null){
        try{
           await UserOrder.create({
                email,
                order_data,
                address,
                phone,
            })
            
            logger.info(`New order created for user: ${email}`);
            res.send({
                status:"ok"
            })
        }catch(err){
            logger.error(`Order processing failed for ${email} - ${err.message}`);
            res.send({
                mess:err
            })
        }
     }else{
        
        try{
            await UserOrder.findOneAndUpdate({email},
            {$push:{order_data}}).then(()=>{
                logger.info(`Old user order updated successfully - ${email}`);
                res.send({
                    mess:"Old User order Page is Updated",
                    status:"ok"
                })
            })
        }catch(err){
            logger.error(`Error updating old user order - ${email}: ${err.message}`);
            res.send({
                mess:"Internal Server Error"
            })
        }
     }
})

app.post('/api/myOrder',async(req,res)=>{
    const {email}=req.body
    logger.debug(`Fetching order data for email: ${email}`);
  try{
    let myData= await UserOrder.findOne({email});

    if (myData) {
        logger.info(`Order data fetched successfully for ${email}`);
    } else {
        logger.warn(`No order data found for ${email}`);
    }

    res.json({
        order_data:myData
    })
  }catch(err){
    logger.error(`Failed to fetch order data for ${email} - ${err.message}`);
    res.send({
        mess:"Internal Server Error"
    })
  }
})


// product api
const Products= mongoose.model('Products') 
app.post('/api/products',async(req,res)=>{
    const {product,item}= req.body;
    logger.debug(`Received request to add product: ${product}, item: ${item}`);

    try{
        await Products.create({
            product,
            item,
        })
        logger.info(`Product "${product}" added successfully`);
        res.send({
            status:"ok"
        })
    }catch(err){
        logger.error(`Failed to add product "${product}" - ${err.message}`);
        res.send({
            mess:err
        })
    }
})

app.get('/api/products',async(req,res)=>{
    //  let data=Products.find({ "_id" :"643bb4bb39182745f0fe63d3"})
 
       await  Products.findById(new ObjectId("67e656f2efb8e6263d1b1a5b"))
          .then(doc => {
            logger.info(`Product fetched successfully: ${doc.product}`);
            res.send({
                data:doc.product,
            })
          })
          .catch(err => {
            logger.error(`Error fetching product  - ${err.message}`);
            console.log(err);
          });
})



app.post('/api/addProduct',async(req,res)=>{
    const {id,name,category,image,price,noItem}=req.body;
    let data={
        id,
        name,
        category,
        image,
        price,
        noItem
    }
    logger.debug(`Attempting to add product: ${JSON.stringify(data)}`);
    try{
        await Products.findByIdAndUpdate(new ObjectId("67e656f2efb8e6263d1b1a5b"),{
            $push:{product:data}}).then(()=>{
                logger.info(`Product added successfully: ${name} (${id})`);
                res.send({
                    mess:"product is updated...",
                    status:"ok"
                })
            })
    }catch(err){
        logger.error(`Error adding product ${name} (${id}) - ${err.message}`);
        res.send({
            mess:"Internal Server Error"
        })
    }
})


app.post('/api/delProduct',async(req,res)=>{
    const {id}=req.body;
    const ids=parseInt(id)
    logger.debug(`Attempting to delete product with id: ${ids}`);

    try{
        await Products.findByIdAndUpdate(new ObjectId('67e656f2efb8e6263d1b1a5b'),{
            $pull:{product:{id:ids}}}).then(()=>{
                logger.info(`Product with id ${ids} deleted successfully`);
                res.send({
                    mess:"Product removed",
                    status:"ok"
                })
            })
    }catch(err){
        logger.error(`Error deleting product with id ${ids} - ${err.message}`);
        res.send({
            mess:"Internal Server Error"
        })
    }
})


//admin display
const OrderDetail=mongoose.model('OrderDetails');
app.post('/api/ProductToAdmin',async(req,res)=>{
    const {email,order_data,address,userName,phone,status,Time}=req.body;
    logger.debug(`Received admin order: email=${email}, userName=${userName}, status=${status}, time=${Time}`);

    try{
        await OrderDetail.create({
            email,
            order_data,
            address,
            userName,
            phone,
            status,
            Time
        })

        logger.info(`Order saved for admin by user ${email}`);
        res.send(({
            status:"ok"
        }))
        
    }catch(err){
        logger.error(`Error saving admin order from ${email} - ${err.message}`);
       res.send({
           mess:err
       })
    }

})


app.get('/api/ProductToAdmin',async(req,res)=>{
    logger.debug("Fetching all admin order details");
     try{
       const allData=await OrderDetail.find({});
       logger.info(`Fetched ${allData.length} admin orders`);
       res.send({status:"ok",data:allData})
     }catch(err){
        logger.error(`Failed to fetch admin orders - ${err.message}`);
     }
})
