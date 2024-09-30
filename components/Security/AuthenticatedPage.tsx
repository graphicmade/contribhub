'use client'
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from '../Contexts/SessionContext';

interface AuthenticatedPageProps {
  redirectPath: string;
  children: React.ReactNode;
}

const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({ redirectPath, children }) => {
  const session = useSession() as any;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!session.authenticated && !session.loading) {
      router.push(redirectPath + '?redirect=' + pathname);
    }
  }, [session.authenticated, session.loading, pathname, router, redirectPath]);

  if (session.loading || !session.authenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthenticatedPage;
