import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  name:   String,
  email: String, 
  phone: Number,
  dob: String,
});



export interface User extends mongoose.Document {
  id: string;
  username: String,
  name:   String,
  email: String, 
  phone: Number,
  dob: String,
}
