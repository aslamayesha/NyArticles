import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PopularNewsCard = ({ article, imageUrl }) => {
    return (
        <div
            className="bg-white flex mb-[20px] shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
        >
            <img src={imageUrl} alt={article.title} className="w-56 h-56 object-cover" />
            <div className="p-4 flex flex-col justify-between h-full">
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">{article.title}</h2>
                    <p className="text-sm text-gray-600 mb-1">{article.byline}</p>
                    <p className="text-sm text-gray-700 line-clamp-3">{article.abstract}</p>
                </div>
                <Link
                    to={`/article/${article.id}`}
                    state={{ article }}
                    className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                    Read More →
                </Link>
            </div>
        </div>
    );
};

PopularNewsCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    article: PropTypes.object,
};

export default PopularNewsCard;
