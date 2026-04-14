import { c as defineEventHandler, h as getRouterParam, r as readBody } from '../../../_/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    const user = event.context.user;
    await connectDB();
    const board = await Board.findById(id);
    if (!board) {
      return {
        success: false,
        error: "\uAC8C\uC2DC\uBB3C\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."
      };
    }
    if (board.userid !== user.userid) {
      return {
        success: false,
        error: "\uC218\uC815 \uAD8C\uD55C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
      };
    }
    await Board.findByIdAndUpdate(id, {
      title: body.title,
      content: body.content
    });
    return {
      success: true,
      message: "\uAC8C\uC2DC\uBB3C\uC774 \uC218\uC815\uB418\uC5C8\uC2B5\uB2C8\uB2E4."
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: error.message
    };
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
