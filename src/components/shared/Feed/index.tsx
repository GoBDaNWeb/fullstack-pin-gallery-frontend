// * react 
import React from 'react'
import {IFeedProps} from './types'

// * components 
import DefaultFeed from './DefaultFeed'
import ProfileFeed from './ProfileFeed'



const Feed: React.FC<IFeedProps> = ({isMain}) => {
    return (
        <>
            {
                isMain 
                ? <DefaultFeed/>
                : <ProfileFeed/>
            }
        </>
    )
}

export default Feed