import ContentLoader from 'react-content-loader';

const Skeleton = () => {
    return (
        <ContentLoader
            speed={2}
            width={410}
            height={600}
            viewBox="0 0 410 600"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="5" y="5" rx="8" ry="8" width="400" height="590" />
        </ContentLoader>
    );
};

export default Skeleton;
