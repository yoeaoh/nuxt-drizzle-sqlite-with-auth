import { eq } from "drizzle-orm";

import { db } from "@/server/sqlite-service";
import { users } from "@/db/schema";

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.params?.id as string;
    const usersResp = db
      .delete(users)
      .where(eq(users.id, parseInt(userId)))
      .run();
    return { user: usersResp };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});