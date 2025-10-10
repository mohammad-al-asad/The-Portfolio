"use client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 md:px-10 py-8 pt-20 md:pt-40">
        {children}
    </div>
  );
}
