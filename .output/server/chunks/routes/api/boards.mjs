import { c as defineEventHandler, i as getQuery } from '../../_/nitro.mjs';
import { c as connectDB } from '../../_/mongoose.mjs';
import { B as Board } from '../../_/Board.mjs';
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

const boards = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 5;
    const skip = (page - 1) * limit;
    await connectDB();
    const totalCount = await Board.countDocuments();
    const rows = await Board.find().sort({ regdate: -1 }).skip(skip).limit(limit);
    const data = rows.map((row, index) => ({
      ...row.toObject(),
      //toObject() : MongoDB 문서를 일반 자바스크립트 객체로 변환
      rownum: totalCount - skip - index
      //row 객체에 rownum 필드 추가
    }));
    return {
      success: true,
      data,
      pagination: {
        currentPage: page,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        limit
      }
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: error.message
    };
  }
});

export { boards as default };
//# sourceMappingURL=boards.mjs.map
