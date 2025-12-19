import React from 'react';
import { View } from 'react-native';
import OverlappingAvatars from '../../../../../core/common_widget/overlapping_avatars';

const fakeUserList = [
    { id: 1, name: 'User 1', profilePic: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'User 2', profilePic: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'User 3', profilePic: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'User 4', profilePic: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'User 5', profilePic: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'User 6', profilePic: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, name: 'User 7', profilePic: 'https://i.pravatar.cc/150?img=7' },
];

const TeamPreview = () => {

    const topThree = fakeUserList.slice(0, 3);

    const afterList = fakeUserList;

    const avatarUrls = afterList.slice(0, 3).map(u => u.profilePic);

    const extraCount = afterList.length > 3 ? afterList.length - 3 : 0;

    return (
        <View>
            <OverlappingAvatars
                imageUrls={avatarUrls}
                extraCount={extraCount}
            />
        </View>
    );
};

export default TeamPreview;