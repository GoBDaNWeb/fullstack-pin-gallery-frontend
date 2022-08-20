import ContentLoader from 'react-content-loader';

const Skeleton = () => {
    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 350 490"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="1" y="5" rx="8" ry="8" width="342" height="480" />
        </ContentLoader>
    );
};

export default Skeleton;
