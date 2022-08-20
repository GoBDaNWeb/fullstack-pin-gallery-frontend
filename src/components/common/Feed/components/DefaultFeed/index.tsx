// * react
import { useEffect } from 'react';
import Masonry from 'react-masonry-css';

// * redux
import { useSelector } from 'react-redux';
import { selectPins } from '@redux/pin/selectors';
import {
    useGetAllPinsQuery,
    useGetPopularPinsQuery,
} from '@services/pin/pinApi';

// * components
import PinItem from '@components/common/PinItem';
import Buttons from './Buttons';
import Skeleton from './Skeleton';

const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
};

const DefaultFeed = () => {
    const { isNewPins } = useSelector(selectPins);

    const {
        data: allPins,
        refetch: refetchAllPins,
        isLoading: isLoadingAll,
    } = useGetAllPinsQuery();
    const {
        data: popularPins,
        refetch: refetchPopularPins,
        isLoading: isLoadingPopular,
    } = useGetPopularPinsQuery();

    useEffect(() => {
        isNewPins ? refetchAllPins() : refetchPopularPins();
    }, [isNewPins, refetchAllPins, refetchPopularPins]);

    return (
        <>
            <Buttons />
            {isNewPins ? (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex animate-slide-fwd"
                >
                    {isLoadingAll
                        ? [...Array(10)].map((_, index) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <Skeleton key={index} />
                          ))
                        : allPins?.map((pin) => (
                              <PinItem
                                  key={pin._id}
                                  _id={pin._id}
                                  author={pin.author}
                                  description={pin.description}
                                  imageUrl={pin.imageUrl}
                                  title={pin.title}
                                  viewsCount={pin.viewsCount}
                              />
                          ))}
                </Masonry>
            ) : (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex animate-slide-fwd"
                >
                    {isLoadingPopular
                        ? [...Array(10)].map((_, index) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <Skeleton key={index} />
                          ))
                        : popularPins?.map((pin) => (
                              <PinItem
                                  key={pin._id}
                                  _id={pin._id}
                                  author={pin.author}
                                  description={pin.description}
                                  imageUrl={pin.imageUrl}
                                  title={pin.title}
                                  viewsCount={pin.viewsCount}
                              />
                          ))}
                </Masonry>
            )}
        </>
    );
};

export default DefaultFeed;
