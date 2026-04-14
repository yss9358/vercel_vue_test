import { c as defineEventHandler, r as readBody } from '../../../_/nitro.mjs';
import { c as connectDB } from '../../../_/mongoose.mjs';
import { B as Board } from '../../../_/Board.mjs';
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

const create_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const user = event.context.user;
    if (!body.title || !body.content) {
      return {
        success: false,
        error: "\uC81C\uBAA9\uACFC \uB0B4\uC6A9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694."
      };
    }
    await connectDB();
    const board = await Board.create({
      userid: user.userid,
      writer: user.name,
      title: body.title,
      content: body.content
    });
    return {
      success: true,
      message: "\uAC8C\uC2DC\uBB3C\uC774 \uB4F1\uB85D\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
      insertId: board._id
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: error.message
    };
  }
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
