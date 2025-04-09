import useDocumentTitle from 'src/helpers/customHook/useDocumentTitle';
import MostPopularNews from 'src/components/common/smart/mostPopularNews/MostPopularNews';

export default function LandingPage() {
    useDocumentTitle('Ny Articles');
    return (
        <div>
            <MostPopularNews />
        </div>
    );
}
