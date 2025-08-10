import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'GridIron: Login',
};

export default function LoginPage() {
  return <JwtLoginView/>;
}
