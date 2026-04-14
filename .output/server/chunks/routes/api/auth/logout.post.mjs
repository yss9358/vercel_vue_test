import { c as defineEventHandler, f as deleteCookie } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jsonwebtoken';

const logout_post = defineEventHandler((event) => {
  deleteCookie(event, "auth_token");
  deleteCookie(event, "user_name");
  deleteCookie(event, "user_id");
  return {
    success: true,
    message: "\uB85C\uADF8\uC544\uC6C3\uB418\uC5C8\uC2B5\uB2C8\uB2E4."
  };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
