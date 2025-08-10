'use client';

import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileCover from '../profile-cover';
import ProfileFriends from '../profile-friends';
import { IDraftFolders } from 'src/types/player';
import { GET } from 'src/services/AxiosRequest';
import URL from 'src/services/API';
import { useAppSelector } from 'src/redux/hook';
import { RootState } from 'src/redux/store';
import { IUser } from 'src/types/user';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'players',
    label: 'Draft Classes',
    icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },

];

// ----------------------------------------------------------------------

export default function PlayerProfileView() {
  const settings = useSettingsContext();


  const user = useAppSelector((root: RootState) => root?.user?.user) as IUser;

  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('players');
  const [loading, setLoading] = useState(false);
  const [draftFolders, setDraftFolders] = useState<IDraftFolders[]>([]);

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const handleSearchQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const fetchDraftFolders = async (signal: AbortSignal, query: string) => {
    try {
      setLoading(true);
      const res = await GET(URL.GET_ALL_DRAFT_PLAYERS(query), signal);
      setDraftFolders(res);
    } catch (error) {
      console.error("Failed to fetch draft folders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchDraftFolders(controller.signal, searchQuery);
    return () => controller.abort();
  }, [searchQuery]);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Profile', href: paths.dashboard.profile.root },
          { name: user?.fullName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card
        sx={{
          mb: 3,
          height: 290,
        }}
      >
        <ProfileCover
          role={""}
          name={user?.fullName}
          avatarUrl={user?.photoURL}
          coverUrl={'/assets/background/overlay_4.webp'}
        />

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card>



      {currentTab === 'players' && (
        <ProfileFriends
          draftFolders={draftFolders}
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          loading={loading}
        />
      )}

    </Container>
  );
}
