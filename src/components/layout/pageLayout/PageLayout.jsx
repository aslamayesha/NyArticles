import { Outlet } from 'react-router-dom';
import Navbar from 'src/components/common/presentational/navbar/Navbar';

const PageLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-[40px]">
                <Outlet />
            </div>
        </div>
    );
};

export default PageLayout;
