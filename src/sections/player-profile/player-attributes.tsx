'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import Iconify from 'src/components/iconify';

import { IUserProfileFollower } from 'src/types/user';
import { LinearProgress, Stack, Tooltip, alpha } from '@mui/material';
import { AttributeData, IPlayer } from 'src/types/player';
import EditAttributeModal from './edit-attribute-modal';

// ----------------------------------------------------------------------

type Props = {
    followers: IUserProfileFollower[];
    player: IPlayer;
    id: string;
};

export default function PlayerAttributes({ followers, player, id }: Props) {
    console.log("🚀 ~ PlayerAttributes ~ player:", player)

    const getSliderColor = (val: number) => {
        if (val <= 2) return 'success';
        if (val <= 4) return 'warning';
        if (val <= 6) return 'error';
        return 'error'; 
    };
    const [playerData, setPlayerData] = useState<IPlayer>(player);

    const [openModal, setOpenModal] = useState(false);
    const [selectedAttr, setSelectedAttr] = useState<AttributeData | null>(null);

    const handleCardClick = (attr: AttributeData) => {
        console.log("🚀 ~ handleCardClick ~ attr:", attr)
        setSelectedAttr(attr);
        setOpenModal(true);
    };

    const handleUpdate = (updated: AttributeData) => {
        console.log('Updated attribute:', updated);
    };
    const attributes = [
        { label: 'Draft Round', value: Number(playerData.projectedReason) ?? 0 },
        { label: 'Hometown', value: playerData.homeTown || '' },
        { label: 'Height', value: playerData.height ?? '' },
        { label: 'Weight', value: playerData.weight ?? 0 },
        { label: 'Age', value: `${playerData.attributes[0]?.age}`},
        { label: 'Jersey Number', value: playerData.jerseyNumber ?? '' },
        { label: 'Overall Rating', value: playerData.overallRating ?? 0 },
        { label: 'College', value: playerData.college || '' }
    ];

    const skillWhitelist = [
        'id', 'age','draft_round'
    ];

    const attributeObject = playerData.attributes[0] || {};

    const playerSkills = Object.entries(attributeObject)
        .filter(([key, value]) => !skillWhitelist.includes(key) && typeof value === 'number' && value !== null)
        .map(([key, value]) => ({
            label: key,
            value,
        }));

    return (
        <>
            <Typography variant="h4" sx={{ my: 5 }}>
                All Attributes
            </Typography>
            <Box
                gap={3}
                display="grid"
                gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(5, 1fr)',
                }}
            >
                {attributes.map((attr, index) => (
                    <Tooltip key={index} title="Edit">
                    <Card
                        onClick={attr.label === "Draft Round" ? () => {} : () => handleCardClick(attr)}
                        sx={{
                            p: 2,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: 6,
                            },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {attr.label}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {attr.value}
                        </Typography>
                    </Card>
                     </Tooltip>
                ))}
            </Box>

            <Box
                mt={3}
                gap={3}
                display="grid"
                gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                }}
            >
                {playerSkills.map((skill, index) => {
                    const isDraftRound = skill.label === 'draft_round';
                    const normalizedValue = isDraftRound ? (skill.value / 7) * 100 : skill.value;

                    return (
                        <Tooltip key={index} title="Edit">
                            <Card
                                onClick={() => handleCardClick(skill)}
                                sx={{
                                    p: 3,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.03)',
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ mb: 1 }}
                                >
                                    <Typography variant="overline">
                                        {skill.label.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                    </Typography>
                                    <Typography variant="subtitle1">{skill.value}</Typography>
                                </Stack>

                                <LinearProgress
                                    variant="determinate"
                                    value={normalizedValue}
                                    color={
                                        isDraftRound
                                            ? getSliderColor(skill.value)
                                            : skill.value <= 40
                                                ? 'primary'
                                                : skill.value >= 90
                                                    ? 'success'
                                                    : skill.value >= 70
                                                        ? 'warning'
                                                        : 'error'
                                    }
                                    sx={{
                                        height: 8,
                                        borderRadius: 1,
                                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16),
                                    }}
                                />
                            </Card>
                        </Tooltip>
                    );
                })}
            </Box>


            {/* Edit Modal */}
            <EditAttributeModal
                open={openModal}
                onClose={() => {
                    setSelectedAttr(null);
                    setOpenModal(false);
                }}
                obj={selectedAttr}
                onUpdate={handleUpdate}
                id={id}
                setPlayerData={setPlayerData}
            />
        </>
    );
}

