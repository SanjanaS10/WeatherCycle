const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // ✅ Use bcryptjs (better compatibility)

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    periodHistory: { 
      type: [{ date: String, duration: Number }], 
      default: [] 
    }, // ✅ Makes sure period history is structured properly
  },
  { timestamps: true } // ✅ Adds createdAt & updatedAt automatically
);

// 🔹 **Hash password before saving**
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔹 **Compare entered password with hashed password**
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
