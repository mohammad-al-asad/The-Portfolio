import AdminSessionPill from "@/components/AdminSessionPill";
import EdgeStoreSessionSync from "@/components/EdgeStoreSessionSync";
import { SessionProvider } from "@/components/SessionProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";

// Admin pages always show the latest data; public pages are the cached ones
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Only the admin area needs the session, so public pages never fetch it
    <SessionProvider>
      <EdgeStoreProvider>
        <EdgeStoreSessionSync />
        <div className="pl-14 pr-4 md:px-[47px] py-8 pt-[10vh] md:pt-40 pb-24">
          {children}
          <AdminSessionPill />
        </div>
      </EdgeStoreProvider>
    </SessionProvider>
  );
}
