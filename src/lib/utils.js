export const getCurrentDate = () => {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric"
    };

    const date = new Date(Date.now());

    return date.toLocaleString("en-US", options);
};

export const getArticleDate = date => {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: '2-digit'
    };

    return date.toLocaleString("en-US", options);
}

const validateArticle = article => 
    article &&
    article.author &&
    article.title &&
    article.description &&
    article.url &&
    article.urlToImage &&
    article.publishedAt &&
    article.content &&
    article.source &&
    article.source.name;

export const filterArticles = articles => articles.filter(article => validateArticle(article));

export const assignArticleID = article => {
    const title = article.title.slice(0, 10);
    const author = article.author.slice(0, 10);
    const published = article.publishedAt.slice(6);
    article.id =  (title + author + published).split(' ').join('');
    return article;
}

export const getSearchParams = query => {
    const params = query.slice(1).split('&');
    return params.reduce((acc, param) => {
        const [key, value] = param.split('=');
        acc[key] = value;
        return acc;
    }, {})
}