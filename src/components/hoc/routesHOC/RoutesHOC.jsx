import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLayout from 'src/components/layout/pageLayout/PageLayout';

import LandingPage from 'src/views/LandingPage';
import ArticleDetail from 'src/views/ArticleDetail';

const RoutesHOC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route
                        index
                        element={
                            <Suspense fallback={<>loadinggg...</>}>
                                <LandingPage />
                            </Suspense>
                        }
                    />
                    <Route path="/article/:id" element={<ArticleDetail />} />
                </Route>
            </Routes>
        </div>
    );
};

export default RoutesHOC;
