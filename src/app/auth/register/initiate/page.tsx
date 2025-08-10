import { JwtRegisterView } from 'src/sections/auth/jwt';
import ModernSignupInitiateView from 'src/sections/auth/jwt/modern-signup-intiate';

// ----------------------------------------------------------------------

export const metadata = {
    title: 'GridIron: Create Account – Enter Email',
};

export default function RegisterEmailPage() {
    return <ModernSignupInitiateView />
}
