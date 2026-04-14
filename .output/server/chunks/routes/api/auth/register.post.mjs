import { c as defineEventHandler, r as readBody } from '../../../_/nitro.mjs';
import bcrypt from 'bcryptjs';
import { c as connectDB } from '../../../_/mongoose.mjs';
import { U as User } from '../../../_/User.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jsonwebtoken';
import 'mongoose';

const register_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.userid || !body.name || !body.password || !body.email) {
      return {
        success: false,
        error: "\uD544\uC218 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uC785\uB825\uD574\uC8FC\uC138\uC694."
      };
    }
    await connectDB();
    const existing = await User.findById(body.userid);
    if (existing) {
      return {
        success: false,
        error: "\uC774\uBBF8 \uC0AC\uC6A9\uC911\uC778 \uC544\uC774\uB514\uC785\uB2C8\uB2E4."
      };
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    await User.create({
      _id: body.userid,
      name: body.name,
      password: hashedPassword,
      email: body.email,
      job: body.job,
      hobbies: Array.isArray(body.hobbies) ? body.hobbies : [],
      gender: body.gender
    });
    return {
      success: true,
      message: "\uD68C\uC6D0\uAC00\uC785\uC774 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4."
    };
  } catch (error) {
    console.error("Register error:", error);
    return {
      success: false,
      error: error.message
    };
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
