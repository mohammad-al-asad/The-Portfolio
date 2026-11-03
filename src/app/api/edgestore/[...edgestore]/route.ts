import { initEdgeStore } from "@edgestore/server";
import {
  createEdgeStoreNextHandler,
  type CreateContextOptions,
} from "@edgestore/server/adapters/next/app";
import { getToken } from "next-auth/jwt";

// EdgeStore context values must be strings
type Context = { role: string };

// Read the signed-in admin from the next-auth cookie. EdgeStore saves this
// context when the uploader starts (and again on reset, see EdgeStoreSessionSync).
async function createContext({ req }: CreateContextOptions): Promise<Context> {
  const token = await getToken({ req });
  return { role: token?.role === "admin" ? "admin" : "guest" };
}

const es = initEdgeStore.context<Context>().create();

// Files are public to view, but only the admin may upload or delete them
const adminOnly = ({ ctx }: { ctx: Context }) => ctx.role === "admin";

const edgeStoreRouter = es.router({
  projectImages: es.imageBucket().beforeUpload(adminOnly).beforeDelete(adminOnly),
  qualificationImages: es
    .imageBucket()
    .beforeUpload(adminOnly)
    .beforeDelete(adminOnly),
  resumeFiles: es.fileBucket().beforeUpload(adminOnly).beforeDelete(adminOnly),
});

export type EdgeStoreRouter = typeof edgeStoreRouter;

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});

export { handler as GET, handler as POST };
