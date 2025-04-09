import { useLocation, Link } from 'react-router-dom';

function ArticleDetail() {
    const location = useLocation();
    const article = location.state?.article;

    if (!article) return <p className="text-center mt-10 text-lg">No article data found.</p>;

    const imageUrl = article.media?.[0]?.['media-metadata']?.[2]?.url;
    const caption = article.media?.[0]?.caption;
    const keywords = article.adx_keywords?.split(';') || [];
    const people = article.per_facet || [];
    const topics = article.des_facet || [];

    return (
        <div className="max-w-5xl mx-auto mb-6">
            <Link to="/articles" className="inline-block mb-4 hover:bg-gray-700">
                ← Back
            </Link>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {imageUrl && (
                    <div className="h-[300px] overflow-hidden">
                        <img
                            src={imageUrl}
                            alt="article visual"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{article.title}</h1>
                    <p className="text-sm text-gray-500 mb-2">{article.published_date}</p>
                    <p className="text-gray-700 italic mb-5">{article.byline}</p>

                    <p className="text-lg text-gray-800 leading-relaxed mb-6">{article.abstract}</p>

                    {caption && <p className="text-sm text-gray-500 italic mb-4">📸 {caption}</p>}

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <h2 className="font-semibold text-gray-800 mb-1">Section:</h2>
                            <p className="text-sm text-gray-700">{article.section || 'N/A'}</p>
                        </div>

                        {topics.length > 0 && (
                            <div>
                                <h2 className="font-semibold text-gray-800 mb-1">Topics:</h2>
                                <ul className="list-disc list-inside text-sm text-gray-700">
                                    {topics.map((topic, idx) => (
                                        <li key={idx}>{topic}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {people.length > 0 && (
                        <div className="mb-6">
                            <h2 className="font-semibold text-gray-800 mb-1">People Mentioned:</h2>
                            <ul className="list-disc list-inside text-sm text-gray-700">
                                {people.map((person, idx) => (
                                    <li key={idx}>{person}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {keywords.length > 0 && (
                        <div className="mb-6">
                            <h2 className="font-semibold text-gray-800 mb-1">Keywords:</h2>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {keywords.map((kw, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                                    >
                                        {kw.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <a
                        href={article.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-4 text-white bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-md text-sm"
                    >
                        Read Full Article on NYTimes.com →
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ArticleDetail;
