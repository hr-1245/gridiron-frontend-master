'use client';

import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';
import AuthModernLayout from 'src/layouts/auth/modern';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
      <AuthModernLayout>{children}</AuthModernLayout>
  );
}
