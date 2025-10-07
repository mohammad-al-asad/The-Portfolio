'use client';

import { SessionProvider as AuthProvider } from 'next-auth/react';

export function SessionProvider({ 
  children, 
  session 
}: { 
  children: React.ReactNode;
  session: import('next-auth').Session | null;
}) {
  return (
    <AuthProvider session={session}>
      {children}
    </AuthProvider>
  );
}