'use client';

import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers, _userList } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileCover from '../profile-cover';
import PlayerAttributes from '../player-attributes';
import { IPlayer } from 'src/types/player';

// ----------------------------------------------------------------------

const TABS = [
    {
        value: 'attributes',
        label: 'Attributes',
        icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
    },

];

// ----------------------------------------------------------------------
type Props = {
    id: string
    player: IPlayer
}
export default function PlayerView({ id, player }: Props) {
    console.log(player);
    const currentUser = _userList.find((user) => user.id === id);
    const settings = useSettingsContext();


    const [searchFriends, setSearchFriends] = useState('');

    const [currentTab, setCurrentTab] = useState('attributes');

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    const handleSearchFriends = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFriends(event.target.value);
    }, []);

    return (
        <Container maxWidth={'xl'}>
            <CustomBreadcrumbs
                heading="Profile"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Profile', href: paths.dashboard.profile.root },
                    { name: player.name || "N/A" },
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
                    role={player.position ? player.position.code : "N/A"}
                    name={player?.name || "N/A"}
                    avatarUrl={currentUser?.avatarUrl || ""}
                    coverUrl={player.images.length ? player.images[0].url : '/assets/background/overlay_4.webp'}
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



            {currentTab === 'attributes' && (
                <PlayerAttributes followers={_userFollowers} player={player} id={id} />
            )}

        </Container>
    );
}
