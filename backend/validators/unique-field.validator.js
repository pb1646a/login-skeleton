
const uniqueField=(value, schema)=>{
    console.log(value);
    schema.find({email: value}).then(user=>{
        console.log(user);
        if(user){
            return false;
        }
        return true;
    })
}



module.exports=uniqueField;