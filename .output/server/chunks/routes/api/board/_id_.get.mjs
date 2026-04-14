import { c as defineEventHandler, h as getRouterParam } from '../../../_/nitro.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    await connectDB();
    console.log("\uBC1B\uC740 id:", id);
    if (!id) {
      return {
        success: false,
        error: "id\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
      };
    }
    const board = await Board.findByIdAndUpdate(
      id,
      { $inc: { hitno: 1 } },
      { new: true }
    );
    if (!board) {
      return {
        success: false,
        error: "\uAC8C\uC2DC\uBB3C\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."
      };
    }
    const prev = await Board.findOne({ regdate: { $lt: board.regdate } }).sort({ regdate: -1 }).select("_id");
    const next = await Board.findOne({ regdate: { $gt: board.regdate } }).sort({ regdate: 1 }).select("_id");
    return {
      success: true,
      data: board,
      prev,
      next
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: error.message
    };
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
