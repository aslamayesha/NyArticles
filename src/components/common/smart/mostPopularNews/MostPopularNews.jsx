import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from 'src/helpers/utils/apiHelpers';
import PopularNewsCard from '../../presentational/popularNewsCard/PopularNewsCard';

const MostPopularNews = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['mostPopularNews'],
        queryFn: fetchArticles,
    });

    if (isLoading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error fetching data</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Most Popular News</h1>

            <div className="grid grid-cols-1 gap:6">
                {data.map((article) => {
                    const imageUrl =
                        article.media?.[0]?.['media-metadata']?.[2]?.url ||
                        'https://via.placeholder.com/440x293?text=No+Image';

                    return (
                        <PopularNewsCard key={article.id} article={article} imageUrl={imageUrl} />
                    );
                })}
            </div>
        </div>
    );
};

export default MostPopularNews;
