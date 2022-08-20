// * react
import React, { useEffect, useRef, memo } from 'react';
import { useParams } from 'react-router-dom';

// * redux
import { useSelector } from 'react-redux';
import { selectAuthData } from '@redux/user/selectors';
import {
    useUpdateUserAvatarMutation,
    useGetUserQuery,
    useLazyGetAuthMeQuery,
    useAddUploadUserMutation,
} from '@services/user/userApi';

// * hooks
import useUploadImage from '@hooks/useUploadImage';

import UserAvatar from '@components/common/UserAvatar';
import CurrentUserAvatar from './CurrentUserAvatar';

const Avatar = memo(() => {
    const { id } = useParams();
    const inputFileRef = useRef<HTMLInputElement>(null);

    const currentUser = useSelector(selectAuthData);

    const [updateUserAvatar] = useUpdateUserAvatarMutation();
    const [addUploadUser] = useAddUploadUserMutation();
    const { data: user, refetch: refetchUser } = useGetUserQuery(id);
    const [fetchCurrentUser] = useLazyGetAuthMeQuery();

    const {
        imageUrl: avatar,
        handleUploadImage,
        handleInputClick,
    } = useUploadImage(
        addUploadUser,
        updateUserAvatar,
        currentUser,
        inputFileRef,
    );

    useEffect(() => {
        refetchUser();
        fetchCurrentUser();
    }, [id, avatar, refetchUser, fetchCurrentUser]);

    return (
        <>
            {currentUser?._id === id ? (
                <CurrentUserAvatar
                    user={user}
                    inputFileRef={inputFileRef}
                    handleInputClick={handleInputClick}
                    handleUploadImage={handleUploadImage}
                />
            ) : (
                <div className="flex flex-col items-center absolute bottom-[-4rem] right-0 left-0 mx-auto">
                    <UserAvatar
                        avatarUrl={user?.avatarUrl}
                        firstName={user?.firstName}
                        size="20"
                    />
                    <h5 className="font-semibold">
                        {user?.firstName} {user?.lastName}
                    </h5>
                </div>
            )}
        </>
    );
});

export default Avatar;
