// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/login`,
      register: (email: string) => `${ROOTS.AUTH}/register?email=${email}`,
      registerInitiateEmail: `${ROOTS.AUTH}/register/initiate`,
      forgotPassword: `${ROOTS.AUTH}/forgot-password`,
      verify: (email: string) => `${ROOTS.AUTH}/verify?email=${email}`,
      newPassword: `${ROOTS.AUTH}/new-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
    account: (to?: string) => {
      let url = `${ROOTS.DASHBOARD}/account`
      if (to) url += `?to=${to}`
      return url;
    },
    allDraft: `${ROOTS.DASHBOARD}/all-drafts`,
    howToUse: `${ROOTS.DASHBOARD}/how-to-use`,
    subscription: ((to?: string) => {
  let url = `${ROOTS.DASHBOARD}/account`;
  if (to) url += `?to=${to}`;
  return url;
})('subscription'),
    convert: {
      bulk: `${ROOTS.DASHBOARD}/convert/bulk`,
      manual: `${ROOTS.DASHBOARD}/convert/manual`,
    },
    profile: {
      root: ROOTS.DASHBOARD,
      view: (id: string) => `${ROOTS.DASHBOARD}/profile/view/${id}`,
    },
  },
};
