import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// TODO: add uniqueness and email validations
const schema = new mongoose.Schema({
    email: {type: String, required: true, lowercase: true, index: true},
    passwordHash: {type: String, required: true}
}, {timestamps: true});


schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
}

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign({
        email: this.email
    }, process.env.SECRET_JWT)
}

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        token: this.generateJWT()
    }
}

export default mongoose.model('User', schema);