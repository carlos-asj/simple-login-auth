import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
});

export default mongoose.model("Users", UsersSchema);
// mongoose.model('nome-do-modelo', schema-utilizado)
