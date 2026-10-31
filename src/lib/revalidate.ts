import { revalidatePath } from "next/cache";

// Public pages are cached; call after any admin edit so visitors see it right away
export const refreshPublicPages = () => revalidatePath("/", "layout");
