import AdminSessionPill from "@/components/AdminSessionPill";
import { EdgeStoreProvider } from "@/lib/edgestore";

// Admin pages always show the latest data; public pages are the cached ones
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EdgeStoreProvider>
      <div className="px-4 md:px-[47px] py-8 pt-10 md:pt-40 pb-28 md:pb-24">
        {children}
        <AdminSessionPill />
      </div>
    </EdgeStoreProvider>
  );
}
