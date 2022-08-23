// * react
import React, { memo } from 'react';
import { IFeedProps } from './types';

// * components
import DefaultFeed from './components/DefaultFeed';
import ProfileFeed from './components/ProfileFeed';

const Feed: React.FC<IFeedProps> = memo(({ isMain }) => (
    <>{isMain ? <DefaultFeed /> : <ProfileFeed />}</>
));

export default Feed;
