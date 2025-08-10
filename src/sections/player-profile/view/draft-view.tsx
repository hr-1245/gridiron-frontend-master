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
import { IDraftFolders, IPlayer } from 'src/types/player';
import { GET } from 'src/services/AxiosRequest';
import URL from 'src/services/API';
import { useAppSelector } from 'src/redux/hook';
import { RootState } from 'src/redux/store';
import { IUser } from 'src/types/user';
import PlayerCardView from '../player-cards';

// ----------------------------------------------------------------------

const TABS = [
    {
        value: 'players',
        label: 'Players',
        icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
    },

];

// ----------------------------------------------------------------------

type Props = {
    draftFolder: IDraftFolders;
}
export default function DraftView({ draftFolder }: Props) {
    const settings = useSettingsContext();


    const user = useAppSelector((root: RootState) => root?.user?.user) as IUser;

    const [searchQuery, setSearchQuery] = useState('');
    const [currentTab, setCurrentTab] = useState('players');
    const [loading, setLoading] = useState(false);
    const playerData = draftFolder.players.length ? draftFolder.players : [];
    const [players, setPlayers] = useState<IPlayer[]>(playerData);
    const [filteredPlayers, setFilteredPlayers] = useState<IPlayer[]>(playerData);

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    const handleSearchQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }, []);

    useEffect(() => {
        setLoading(true);
      
        const timeout = setTimeout(() => {
          const query = searchQuery.toLowerCase();
      
          const filtered = players.filter((player) =>
            player.name.toLowerCase().includes(query) ||
            player.position?.code.toLowerCase().includes(query)
          );
      
          setFilteredPlayers(filtered);
          setLoading(false);
        }, 300); 
      
        return () => clearTimeout(timeout);
      }, [searchQuery, players]);
    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <CustomBreadcrumbs
                heading={draftFolder.name}
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Draft Folder', href: paths.dashboard.profile.root },
                    { name: draftFolder.name },
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
                <PlayerCardView
                    players={filteredPlayers}
                    searchQuery={searchQuery}
                    onSearchQueryChange={handleSearchQueryChange}
                    loading={loading}
                />
            )}

        </Container>
    );
}
