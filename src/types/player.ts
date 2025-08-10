import { Dispatch, SetStateAction } from "react";

export enum PLAYER_POSTION_CODE {
    TightEnd = 'TE',
    QuarterBack = 'QB',
    RunningBack = 'RB',
    WiderReceiver = 'WR',
    Offensive_Line = 'OL',
    DefensiveTackle = 'DT',
    CornerBack = 'CB',
    Safety = 'S',
    LeftGuard = 'LG',
    RightGuard = 'RG',
    LeftTackle = 'LT',
    RightTackle = 'RT',
    LeftEnd = 'LE',
    RightEnd = 'RE',
    LeftOutside_linebacker_above_245_lbs = 'LOLB>',
    RightOutside_linebacker_above_245lbs = 'ROLB>',
    LeftOutside_linebacker_below_245lbs = 'LOLB<',
    RightOutside_linebacker_below_245lbs = 'ROLB<',
    All_Middle_Linebackers = 'MLB',
    FullBack = 'FB',
    Kicker = 'K',
    Punter = 'P',
}



export type AttributeData = {
    label: string;
    value: string | number;
};

export type EditAttributeModalProps = {
    open: boolean;
    onClose: () => void;
    obj: AttributeData | null;
    onUpdate: (updated: AttributeData) => void;
    id: string;
    setPlayerData: Dispatch<SetStateAction<IPlayer>>
};

export const PLAYER_POSITION_OPTIONS = [
    { value: 'TE', label: 'Tight End' },
    { value: 'QB', label: 'Quarter Back' },
    { value: 'RB', label: 'Running Back' },
    { value: 'WR', label: 'Wide Receiver' },
    { value: 'OL', label: 'Offensive Line' },
    { value: 'DT', label: 'Defensive Tackle' },
    { value: 'CB', label: 'Corner Back' },
    { value: 'S', label: 'Safety' },
    { value: 'LG', label: 'Left Guard' },
    { value: 'RG', label: 'Right Guard' },
    { value: 'LT', label: 'Left Tackle' },
    { value: 'RT', label: 'Right Tackle' },
    { value: 'LE', label: 'Left End' },
    { value: 'RE', label: 'Right End' },
    { value: 'LOLB<', label: 'Left Outside Linebacker (< 245lbs)' },
    { value: 'ROLB<', label: 'Right Outside Linebacker (< 245lbs)' },
    { value: 'MLB', label: 'Middle Linebacker' },
    { value: 'FB', label: 'Full Back' },
    { value: 'K', label: 'Kicker' },
    { value: 'P', label: 'Punter' },
];

export const POSITION_FIELDS: Record<string, { name: string; label: string; type: 'number' | 'string' }[]> = {
    TE: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'change_of_direction', label: 'Change Of Direction', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'break_tackle', label: 'Break Tackle', type: 'number' },
        { name: 'catch_in_traffic', label: 'Catch In Traffic', type: 'number' },
        { name: 'spectacular_catch', label: 'Spectacular Catch', type: 'number' },
        { name: 'release', label: 'Release', type: 'number' },
        { name: 'pass_block', label: 'Pass Block', type: 'number' },
        { name: 'pass_block_power', label: 'Pass Block Power', type: 'number' },
        { name: 'pass_block_finesse', label: 'Pass Block Finesse', type: 'number' },
        { name: 'run_block', label: 'Run Block', type: 'number' },
        { name: 'run_block_power', label: 'Run Block Power', type: 'number' },
        { name: 'run_block_finesse', label: 'Run Block Finesse', type: 'number' },
        { name: 'lead_blocking', label: 'Lead Blocking', type: 'number' },
        { name: 'impact_blocking', label: 'Impact Blocking', type: 'number' },
        { name: 'jumping', label: 'Jumping', type: 'number' },
        { name: 'carrying', label: 'Carrying', type: 'number' },
        { name: 'trucking', label: 'Trucking', type: 'number' },
        { name: 'catching', label: 'Catching', type: 'number' },
        { name: 'stiff_arm', label: 'Stiff Arm', type: 'number' },
        { name: 'spin_move', label: 'Spin Move', type: 'number' },
        { name: 'juke_move', label: 'Juke Move', type: 'number' },
        { name: 'short_route_running', label: 'Short Route Running', type: 'number' },
        { name: 'medium_route_running', label: 'Medium Route Running', type: 'number' },
        { name: 'deep_route_running', label: 'Deep Route Running', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    QB: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'throw_power', label: 'Throw Power', type: 'number' },
        { name: 'throw_accuracy_short', label: 'Throw Accuracy Short', type: 'number' },
        { name: 'throw_accuracy_mid', label: 'Throw Accuracy Mid', type: 'number' },
        { name: 'throw_accuracy_deep', label: 'Throw Accuracy Deep', type: 'number' },
        { name: 'throw_on_the_run', label: 'Throw On The Run', type: 'number' },
        { name: 'throw_under_pressure', label: 'Throw Under Pressure', type: 'number' },
        { name: 'play_action', label: 'Play Action', type: 'number' },
        { name: 'break_sack', label: 'Break Sack', type: 'number' },
        { name: 'break_tackle', label: 'Break Tackle', type: 'number' },
        { name: 'trucking', label: 'Trucking', type: 'number' },
        { name: 'carrying', label: 'Carrying', type: 'number' },
        { name: 'ball_carrier_vision', label: 'Ball Carrier Vision', type: 'number' },
        { name: 'stiff_arm', label: 'Stiff Arm', type: 'number' },
        { name: 'spin_move', label: 'Spin Move', type: 'number' },
        { name: 'juke_move', label: 'Juke Move', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    RB: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'change_of_direction', label: 'Change Of Direction', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'break_tackle', label: 'Break Tackle', type: 'number' },
        { name: 'carrying', label: 'Carrying', type: 'number' },
        { name: 'trucking', label: 'Trucking', type: 'number' },
        { name: 'pass_block', label: 'Pass Block', type: 'number' },
        { name: 'ball_carrier_vision', label: 'Ball Carrier Vision', type: 'number' },
        { name: 'catching', label: 'Catching', type: 'number' },
        { name: 'stiff_arm', label: 'Stiff Arm', type: 'number' },
        { name: 'spin_move', label: 'Spin Move', type: 'number' },
        { name: 'juke_move', label: 'Juke Move', type: 'number' },
        { name: 'pass_blocking', label: 'Pass Blocking', type: 'number' },
        { name: 'catch_in_traffic', label: 'Catch In Traffic', type: 'number' },
        { name: 'spectacular_catch', label: 'Spectacular Catch', type: 'number' },
        { name: 'short_route_running', label: 'Short Route Running', type: 'number' },
        { name: 'medium_route_running', label: 'Medium Route Running', type: 'number' },
        { name: 'release', label: 'Release', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'return', label: 'Return', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    WR: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'change_of_direction', label: 'Change Of Direction', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'break_tackle', label: 'Break Tackle', type: 'number' },
        { name: 'catch_in_traffic', label: 'Catch In Traffic', type: 'number' },
        { name: 'spectacular_catch', label: 'Spectacular Catch', type: 'number' },
        { name: 'release', label: 'Release', type: 'number' },
        { name: 'jumping', label: 'Jumping', type: 'number' },
        { name: 'carrying', label: 'Carrying', type: 'number' },
        { name: 'trucking', label: 'Trucking', type: 'number' },
        { name: 'ball_carrier_vision', label: 'Ball Carrier Vision', type: 'number' },
        { name: 'catching', label: 'Catching', type: 'number' },
        { name: 'stiff_arm', label: 'Stiff Arm', type: 'number' },
        { name: 'spin_move', label: 'Spin Move', type: 'number' },
        { name: 'juke_move', label: 'Juke Move', type: 'number' },
        { name: 'short_route_running', label: 'Short Route Running', type: 'number' },
        { name: 'medium_route_running', label: 'Medium Route Running', type: 'number' },
        { name: 'deep_route_running', label: 'Deep Route Running', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'return', label: 'Return', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    OL: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'lead_block', label: 'Lead Block', type: 'number' },
        { name: 'impact_blocking', label: 'Impact Blocking', type: 'number' },
        { name: 'run_blocking', label: 'Run Blocking', type: 'number' },
        { name: 'pass_blocking', label: 'Pass Blocking', type: 'number' },
        { name: 'pass_block_power', label: 'Pass Block Power', type: 'number' },
        { name: 'pass_block_finesse', label: 'Pass Block Finesse', type: 'number' },
        { name: 'run_block_power', label: 'Run Block Power', type: 'number' },
        { name: 'run_block_finesse', label: 'Run Block Finesse', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    DT: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'tackling', label: 'Tackling', type: 'number' },
        { name: 'hit_power', label: 'Hit Power', type: 'number' },
        { name: 'power_moves', label: 'Power Moves', type: 'number' },
        { name: 'finesse_moves', label: 'Finesse Moves', type: 'number' },
        { name: 'block_shedding', label: 'Block Shedding', type: 'number' },
        { name: 'pursuit', label: 'Pursuit', type: 'number' },
        { name: 'play_recognition', label: 'Play Recognition', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    CB: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'change_of_direction', label: 'Change Of Direction', type: 'number' },
        { name: 'catching', label: 'Catching', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'jumping', label: 'Jumping', type: 'number' },
        { name: 'tackling', label: 'Tackling', type: 'number' },
        { name: 'hit_power', label: 'Hit Power', type: 'number' },
        { name: 'pursuit', label: 'Pursuit', type: 'number' },
        { name: 'play_recognition', label: 'Play Recognition', type: 'number' },
        { name: 'man_coverage', label: 'Man Coverage', type: 'number' },
        { name: 'zone_coverage', label: 'Zone Coverage', type: 'number' },
        { name: 'press', label: 'Press', type: 'number' },
        { name: 'return', label: 'Return', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    S: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'change_of_direction', label: 'Change Of Direction', type: 'number' },
        { name: 'catching', label: 'Catching', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'block_shed', label: 'Block Shed', type: 'number' },
        { name: 'jumping', label: 'Jumping', type: 'number' },
        { name: 'tackling', label: 'Tackling', type: 'number' },
        { name: 'hit_power', label: 'Hit Power', type: 'number' },
        { name: 'pursuit', label: 'Pursuit', type: 'number' },
        { name: 'play_recognition', label: 'Play Recognition', type: 'number' },
        { name: 'man_coverage', label: 'Man Coverage', type: 'number' },
        { name: 'zone_coverage', label: 'Zone Coverage', type: 'number' },
        { name: 'press', label: 'Press', type: 'number' },
        { name: 'return', label: 'Return', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    LG: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'lead_block', label: 'Lead Block', type: 'number' },
        { name: 'impact_blocking', label: 'Impact Blocking', type: 'number' },
        { name: 'run_blocking', label: 'Run Blocking', type: 'number' },
        { name: 'pass_blocking', label: 'Pass Blocking', type: 'number' },
        { name: 'pass_block_power', label: 'Pass Block Power', type: 'number' },
        { name: 'pass_block_finesse', label: 'Pass Block Finesse', type: 'number' },
        { name: 'run_block_power', label: 'Run Block Power', type: 'number' },
        { name: 'run_block_finesse', label: 'Run Block Finesse', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    RG: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'lead_block', label: 'Lead Block', type: 'number' },
        { name: 'impact_blocking', label: 'Impact Blocking', type: 'number' },
        { name: 'run_blocking', label: 'Run Blocking', type: 'number' },
        { name: 'pass_blocking', label: 'Pass Blocking', type: 'number' },
        { name: 'pass_block_power', label: 'Pass Block Power', type: 'number' },
        { name: 'pass_block_finesse', label: 'Pass Block Finesse', type: 'number' },
        { name: 'run_block_power', label: 'Run Block Power', type: 'number' },
        { name: 'run_block_finesse', label: 'Run Block Finesse', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    LE: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'tackling', label: 'Tackling', type: 'number' },
        { name: 'hit_power', label: 'Hit Power', type: 'number' },
        { name: 'power_moves', label: 'Power Moves', type: 'number' },
        { name: 'finesse_moves', label: 'Finesse Moves', type: 'number' },
        { name: 'block_shed', label: 'Block Shed', type: 'number' },
        { name: 'pursuit', label: 'Pursuit', type: 'number' },
        { name: 'play_recognition', label: 'Play Recognition', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    RE: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'tackling', label: 'Tackling', type: 'number' },
        { name: 'hit_power', label: 'Hit Power', type: 'number' },
        { name: 'power_moves', label: 'Power Moves', type: 'number' },
        { name: 'finesse_moves', label: 'Finesse Moves', type: 'number' },
        { name: 'block_shed', label: 'Block Shed', type: 'number' },
        { name: 'pursuit', label: 'Pursuit', type: 'number' },
        { name: 'play_recognition', label: 'Play Recognition', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    LT: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'lead_block', label: 'Lead Block', type: 'number' },
        { name: 'impact_block', label: 'Impact Block', type: 'number' },
        { name: 'run_block', label: 'Run Block', type: 'number' },
        { name: 'pass_block', label: 'Pass Block', type: 'number' },
        { name: 'pass_block_power', label: 'Pass Block Power', type: 'number' },
        { name: 'pass_block_finesse', label: 'Pass Block Finesse', type: 'number' },
        { name: 'run_block_power', label: 'Run Block Power', type: 'number' },
        { name: 'run_block_finesse', label: 'Run Block Finesse', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    RT: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'lead_block', label: 'Lead Block', type: 'number' },
        { name: 'impact_block', label: 'Impact Block', type: 'number' },
        { name: 'run_block', label: 'Run Block', type: 'number' },
        { name: 'pass_block', label: 'Pass Block', type: 'number' },
        { name: 'pass_block_power', label: 'Pass Block Power', type: 'number' },
        { name: 'pass_block_finesse', label: 'Pass Block Finesse', type: 'number' },
        { name: 'run_block_power', label: 'Run Block Power', type: 'number' },
        { name: 'run_block_finesse', label: 'Run Block Finesse', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    'LOLB>': [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'tackling', label: 'Tackling', type: 'number' },
        { name: 'hit_power', label: 'Hit Power', type: 'number' },
        { name: 'power_moves', label: 'Power Moves', type: 'number' },
        { name: 'finesse_moves', label: 'Finesse Moves', type: 'number' },
        { name: 'block_shed', label: 'Block Shed', type: 'number' },
        { name: 'pursuit', label: 'Pursuit', type: 'number' },
        { name: 'play_recognition', label: 'Play Recognition', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    'ROLB>': [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'tackling', label: 'Tackling', type: 'number' },
        { name: 'hit_power', label: 'Hit Power', type: 'number' },
        { name: 'power_moves', label: 'Power Moves', type: 'number' },
        { name: 'finesse_moves', label: 'Finesse Moves', type: 'number' },
        { name: 'block_shed', label: 'Block Shed', type: 'number' },
        { name: 'pursuit', label: 'Pursuit', type: 'number' },
        { name: 'play_recognition', label: 'Play Recognition', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    'LOLB<': [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'change_of_direction', label: 'Change Of Direction', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'jumping', label: 'Jumping', type: 'number' },
        { name: 'tackling', label: 'Tackling', type: 'number' },
        { name: 'hit_power', label: 'Hit Power', type: 'number' },
        { name: 'power_moves', label: 'Power Moves', type: 'number' },
        { name: 'finesse_moves', label: 'Finesse Moves', type: 'number' },
        { name: 'block_shedding', label: 'Block Shedding', type: 'number' },
        { name: 'pursuit', label: 'Pursuit', type: 'number' },
        { name: 'play_recognition', label: 'Play Recognition', type: 'number' },
        { name: 'man_coverage', label: 'Man Coverage', type: 'number' },
        { name: 'zone_coverage', label: 'Zone Coverage', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    'ROLB<': [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'change_of_direction', label: 'Change Of Direction', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'jumping', label: 'Jumping', type: 'number' },
        { name: 'tackling', label: 'Tackling', type: 'number' },
        { name: 'hit_power', label: 'Hit Power', type: 'number' },
        { name: 'power_moves', label: 'Power Moves', type: 'number' },
        { name: 'finesse_moves', label: 'Finesse Moves', type: 'number' },
        { name: 'block_shedding', label: 'Block Shedding', type: 'number' },
        { name: 'pursuit', label: 'Pursuit', type: 'number' },
        { name: 'play_recognition', label: 'Play Recognition', type: 'number' },
        { name: 'man_coverage', label: 'Man Coverage', type: 'number' },
        { name: 'zone_coverage', label: 'Zone Coverage', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    MLB: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'change_of_direction', label: 'Change Of Direction', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'jumping', label: 'Jumping', type: 'number' },
        { name: 'tackling', label: 'Tackling', type: 'number' },
        { name: 'hit_power', label: 'Hit Power', type: 'number' },
        { name: 'power_moves', label: 'Power Moves', type: 'number' },
        { name: 'finesse_moves', label: 'Finesse Moves', type: 'number' },
        { name: 'block_shedding', label: 'Block Shedding', type: 'number' },
        { name: 'pursuit', label: 'Pursuit', type: 'number' },
        { name: 'play_recognition', label: 'Play Recognition', type: 'number' },
        { name: 'man_coverage', label: 'Man Coverage', type: 'number' },
        { name: 'zone_coverage', label: 'Zone Coverage', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
    ],

    K: [
        { name: 'kick_power', label: 'Kick Power', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'kick_accuracy', label: 'Kick Accuracy', type: 'number' },
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
    ],

    P: [
        { name: 'kick_power', label: 'Kick Power', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
        { name: 'kick_accuracy', label: 'Kick Accuracy', type: 'number' },
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
    ],

    FB: [
        { name: 'speed', label: 'Speed', type: 'number' },
        { name: 'acceleration', label: 'Acceleration', type: 'number' },
        { name: 'agility', label: 'Agility', type: 'number' },
        { name: 'stamina', label: 'Stamina', type: 'number' },
        { name: 'change_of_direction', label: 'Change Of Direction', type: 'number' },
        { name: 'lead_block', label: 'Lead Block', type: 'number' },
        { name: 'run_block', label: 'Run Block', type: 'number' },
        { name: 'pass_block', label: 'Pass Block', type: 'number' },
        { name: 'pass_block_power', label: 'Pass Block Power', type: 'number' },
        { name: 'run_block_power', label: 'Run Block Power', type: 'number' },
        { name: 'pass_block_finesse', label: 'Pass Block Finesse', type: 'number' },
        { name: 'run_block_finesse', label: 'Run Block Finesse', type: 'number' },
        { name: 'carrying', label: 'Carrying', type: 'number' },
        { name: 'catching', label: 'Catching', type: 'number' },
        { name: 'catch_in_traffic', label: 'Catch In Traffic', type: 'number' },
        { name: 'short_route_running', label: 'Short Route Running', type: 'number' },
        { name: 'medium_route_running', label: 'Medium Route Running', type: 'number' },
        { name: 'injury', label: 'Injury', type: 'number' },
        { name: 'strength', label: 'Strength', type: 'number' },
        { name: 'impact_blocking', label: 'Impact Blocking', type: 'number' },
        { name: 'stiff_arm', label: 'Stiff Arm', type: 'number' },
        { name: 'trucking', label: 'Trucking', type: 'number' },
        { name: 'awareness', label: 'Awareness', type: 'number' },
    ],
};


export interface IPosition {
    positionId: number;
    code: string;
    name: string;
}

export interface IPlayer {
    id: string,
    createdAt: string;
    updatedAt: string;
    name: string;
    homeTown: string;
    college:string;
    playerClass: string;
    height: string;
    weight: number;
    jerseyNumber: string;
    projectedReason: number;
    isActive: string;
    overallRating:number;
    position: {
        code: string;
        name: string;
    }
    attributes: IPlayerAttributes[];
    images: IPlayerImages[];
}

export interface IPlayerImages {
    id: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

export interface IDraftFolders {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    players: IPlayer[]
}


export interface IPlayerAttributes {
    id: number;
    createdAt: string;
    updatedAt: string;
    age: number | null;
    speed: number | null;
    strength: number | null;
    agility: number | null;
    acceleration: number | null;
    awareness: number | null;
    stamina: number | null;
    injury: number | null;
    toughness: number | null;
    throw_power: number | null;
    throw_accuracy_short: number | null;
    throw_accuracy_mid: number | null;
    throw_accuracy_deep: number | null;
    short_accuracy: number | null;
    medium_accuracy: number | null;
    deep_accuracy: number | null;
    throw_on_the_run: number | null;
    throw_under_pressure: number | null;
    break_sack: number | null;
    play_action: number | null;
    break_tackle: number | null;
    trucking: number | null;
    change_of_direction: number | null;
    ball_carrier_vision: number | null;
    stiff_arm: number | null;
    spin_move: number | null;
    kick_power: number | null;
    kick_accuracy: number | null;
    juke_move: number | null;
    carrying: number | null;
    catching: number | null;
    short_route_running: number | null;
    short_throw_acceleration: number | null;
    medium_throw_acceleration: number | null;
    deep_throw_acceleration: number | null;
    medium_route_running: number | null;
    deep_route_running: number | null;
    catch_in_traffic: number | null;
    spectacular_catch: number | null;
    release: number | null;
    jumping: number | null;
    return: number | null;
    pass_block: number | null;
    pass_block_power: number | null;
    pass_block_finesse: number | null;
    run_block: number | null;
    run_block_power: number | null;
    run_block_finesse: number | null;
    lead_block: number | null;
    impact_block: number | null;
    tackling: number | null;
    hit_power: number | null;
    power_moves: number | null;
    finesse_moves: number | null;
    block_shedding: number | null;
    pursuit: number | null;
    play_recognition: number | null;
    man_coverage: number | null;
    zone_coverage: number | null;
    press: number | null;
    draft_round: number | null;
}