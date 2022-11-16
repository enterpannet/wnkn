let mysql =require('mysql')
let connection =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"wat_data"
})
connection.connect((error)=>{
    if(!!error){
        console.log(error)
    }else{
        console.log("เชื่อมต่อสำเร็จแล้ว")
    }
})
module.exports=connection