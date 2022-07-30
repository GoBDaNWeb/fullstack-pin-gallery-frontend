// * react
import React, {useEffect} from 'react'
import Masonry from 'react-masonry-css'

// * redux 
import {useSelector} from 'react-redux'
import {selectPins} from '@redux/pin/selectors'
import {useGetAllPinsQuery, useGetPopularPinsQuery} from '@redux/pin/pinApi'

// * components 
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

const Feed = () => {
    const {isNewPins} = useSelector(selectPins)

    const {data: allPins, refetch: refetchAllPins, isLoading: isLoadingAll} = useGetAllPinsQuery()
    const {data: popularPins, refetch: refetchPopularPins, isLoading: isLoadingPopular} = useGetPopularPinsQuery()

    useEffect(() => {
        isNewPins 
        ? refetchAllPins()
        : refetchPopularPins()
    }, [isNewPins])

    return (
        <>
            {
                isNewPins 
                ? (
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex animate-slide-fwd"
                    >
                        {
                            isLoadingAll
                            ? [...Array(10)].map((_, index) => (
                                <Skeleton key={index}/>
                            ))
                            : allPins?.map((pin) => <PinItem key={pin._id} {...pin}/>)
                        }
                    </Masonry>
                ) : (
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex animate-slide-fwd"
                    >  
                        {
                            isLoadingPopular
                            ? [...Array(10)].map((_, index) => (
                                <Skeleton key={index}/>
                            ))
                            : popularPins?.map((pin) => <PinItem key={pin._id} {...pin}/>)
                        }
                    </Masonry>
                )
            }
        </>
    )
}

export default Feed