import mongoose from "mongoose";
const userSchema = new mongoose.Schema ({
    userid: { 
      type: mongoose.Schema.Types.ObjectId,
     ref: 'user'
    },
    id: { 
      type: Number, 
      required : true
    },
    name: { 
      type: String, 
      required : true
    },
    password: {  
      type: String,
      required : true
    },
    comment: {  
      type: String,
      default :""
    },
    changed: {  
      type: String,
      default :'No'
    },
  }
  );

  export default mongoose.model('user', userSchema);