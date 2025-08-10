
// ----------------------------------------------------------------------

import { AccountView } from "src/sections/account/view";
import OneView from "src/sections/one/view";

export const metadata = {
  title: 'GridIron: Account Settings',
};


type PageParams = {
  searchParams: {
    to: string;
  }
};


export default function Page({ searchParams }: PageParams) {
  const to = searchParams?.to || 'general'; 
  return <AccountView to={to} />;
}
