import { c as defineEventHandler } from '../../_/nitro.mjs';
import { c as connectDB } from '../../_/mongoose.mjs';
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

const connectionTest = defineEventHandler(async () => {
  try {
    await connectDB();
    return { success: true, message: "MongoDB \uC5F0\uACB0 \uC131\uACF5!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

export { connectionTest as default };
//# sourceMappingURL=connectionTest.mjs.map
