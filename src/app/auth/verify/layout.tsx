'use client';

import AuthModernLayout from 'src/layouts/auth/modern';
import AuthClassicLayout from 'src/layouts/auth/classic';
import AuthModernCompactLayout from 'src/layouts/auth/modern-compact';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <AuthModernLayout>{children}</AuthModernLayout>;
}
