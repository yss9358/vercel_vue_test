import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: String,
  job: String,
  hobbies: [String],
  gender: { type: String, enum: ["\uB0A8\uC131", "\uC5EC\uC131"] },
  regdate: { type: Date, default: Date.now }
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User as U };
//# sourceMappingURL=User.mjs.map
