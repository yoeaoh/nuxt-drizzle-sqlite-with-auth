import bcrypt from 'bcryptjs'
import { eq } from "drizzle-orm";

import { db } from "@/server/sqlite-service";
import { users } from "@/db/schema";

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event);

    const usersResp = db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .get();

    if (!usersResp) throw new Error("User Not Found");

    if (!bcrypt.compareSync(password, usersResp.password as string)) {
      throw new Error("Invalid Credentials ");
    }

    const authUser = usersResp;
    authUser["password"] = null;

    return authUser;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});