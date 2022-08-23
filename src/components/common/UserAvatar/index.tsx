// * react
import React, { memo } from 'react';
import { IUserAvatarProps } from './types';

const UserAvatar: React.FC<IUserAvatarProps> = memo(
    ({ avatarUrl, firstName, size = 10 }) => (
        <>
            {avatarUrl ? (
                <img
                    src={`${process.env.REACT_APP_API_URL}${avatarUrl}`}
                    alt="avatsar"
                    className={`w-${size} h-${size} bg-sky-500 rounded-full shadow-md`}
                />
            ) : (
                <div
                    className={`w-${size} h-${size} bg-sky-500 rounded-full shadow-md flex items-center justify-center text-white font-semibold text-3xl`}
                >
                    {firstName && firstName[0].toUpperCase()}
                </div>
            )}
        </>
    ),
);

export default UserAvatar;
