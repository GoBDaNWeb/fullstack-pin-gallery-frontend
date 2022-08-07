// * react
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Masonry from 'react-masonry-css'

// * redux 
import {useGetPinedQuery, useGetCreatedQuery} from '@services/pin/pinApi'

// * components 
import Buttons from './Buttons'
import Skeleton from './Skeleton'
import PinItem from '@components/shared/PinItem'

const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
};

const ProfileFeed = () => {
    const [isCreated, setIsCreated] = useState<boolean>(true)

    const {id} = useParams()

    const {data: pinedItems, isLoading: isLoadingPined, refetch: refetchPined} = useGetPinedQuery(id)
    const {data: createdItems, isLoading: isLoadingCreated, refetch: refetchCreated} = useGetCreatedQuery(id)

    useEffect(() => {
        isCreated 
        ? refetchCreated()
        : refetchPined()
    }, [isCreated])

    return (
        <>
            <Buttons
                isCreated={isCreated}
                setIsCreated={setIsCreated}
            />
            {
                isCreated 
                ? (
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex animate-slide-fwd"
                    >
                        {
                            isLoadingPined
                            ? [...Array(10)].map((_, index) => (
                                <Skeleton key={index}/>
                            ))
                            : createdItems?.map((pin) => <PinItem key={pin._id} {...pin}/>)
                        }
                    </Masonry>
                ) : (
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex animate-slide-fwd"
                    >
                        {
                            isLoadingCreated
                            ? [...Array(10)].map((_, index) => (
                                <Skeleton key={index}/>
                            ))
                            : pinedItems?.map((pin) => <PinItem key={pin._id} {...pin}/>)
                        }
                    </Masonry>
                )
            }
        </>
    )
}

export default ProfileFeed