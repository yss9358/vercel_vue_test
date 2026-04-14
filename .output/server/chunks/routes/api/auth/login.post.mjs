import { c as defineEventHandler, r as readBody, g as generateToken, e as setCookie } from '../../../_/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.userid || !body.password) {
      return {
        success: false,
        error: "\uC544\uC774\uB514\uC640 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694."
      };
    }
    await connectDB();
    const user = await User.findById(body.userid);
    if (!user) {
      return {
        success: false,
        error: "\uC544\uC774\uB514 \uB610\uB294 \uBE44\uBC00\uBC88\uD638\uAC00 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
      };
    }
    const isValid = await bcrypt.compare(body.password, user.password);
    if (!isValid) {
      return {
        success: false,
        error: "\uC544\uC774\uB514 \uB610\uB294 \uBE44\uBC00\uBC88\uD638\uAC00 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
      };
    }
    const token = generateToken({
      userid: user._id,
      name: user.name
    });
    setCookie(event, "auth_token", token, {
      httpOnly: false,
      secure: true,
      maxAge: 60 * 60 * 24,
      path: "/"
    });
    setCookie(event, "user_name", user.name, {
      maxAge: 60 * 60 * 24,
      path: "/"
    });
    setCookie(event, "user_id", user._id, {
      maxAge: 60 * 60 * 24,
      path: "/"
    });
    return {
      success: true,
      user: {
        userid: user._id,
        name: user.name
      }
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error.message
    };
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
