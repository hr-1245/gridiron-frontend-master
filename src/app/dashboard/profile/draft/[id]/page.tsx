
// ----------------------------------------------------------------------

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { paths } from "src/routes/paths";
import OneView from "src/sections/one/view";
import DraftView from "src/sections/player-profile/view/draft-view";
import PlayerView from "src/sections/player-profile/view/player.view";
import URL from "src/services/API";
import { GET } from "src/services/AxiosRequest";

export const metadata = {
  title: 'GridIron: Draft Folder',
};

type PageParams = {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageParams) {
  const { id } = params;
  const cookieStore = cookies();
  let accessToken:string;
  accessToken = cookieStore.get("accessToken")?.value || "";
  const getDraftFolder = async (id: string) => {
    try {
      const res = await GET(URL.GET_DRAFT_FOLDER_BY_ID(+id), accessToken);
      return res;
    } catch (error) {
      console.log("🚀 ~ getDraftFolder ~ error:", error)
    }
  }
  const draftFolder = await getDraftFolder(id);

  if (!draftFolder) {
    redirect(paths.dashboard.root)

  }

  return <DraftView draftFolder={draftFolder} />
}
