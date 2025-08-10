
// ----------------------------------------------------------------------

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { paths } from "src/routes/paths";
import OneView from "src/sections/one/view";
import PlayerView from "src/sections/player-profile/view/player.view";
import URL from "src/services/API";
import { GET } from "src/services/AxiosRequest";

export const metadata = {
  title: 'GridIron: Player Profile',
};

type PageParams = {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageParams) {
  const { id } = params;
  const cookieStore = cookies();
  let accessToken: string;
  accessToken = cookieStore.get("accessToken")?.value || "";
  const getPlayer = async (id: string) => {
    try {
      const res = await GET(URL.GET_PLAYER_BY_ID(id), accessToken);
      return res.data;
    } catch (error) {
      console.log("🚀 ~ player ~ error:", error)
    }
  }
  const player = await getPlayer(id);

  if (!player) {
    redirect(paths.dashboard.root)

  }

  return <PlayerView id={id} player={player} />;
}
