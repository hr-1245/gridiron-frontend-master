'use client';

import { useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';

import { PATH_AFTER_LOGIN } from 'src/config-global';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push(paths.auth.jwt.login);
  }, [router]);

  return null;
}
