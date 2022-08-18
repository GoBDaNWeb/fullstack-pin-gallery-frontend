// * react 
import React from 'react'
import {IFeedProps} from './types'

// * components 
import DefaultFeed from './components/DefaultFeed'
import ProfileFeed from './components/ProfileFeed'



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