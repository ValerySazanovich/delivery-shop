import ArticlesSection from "./ArticlesSection";
import fetchArticles from "./fetchArticles";

const Articles = async () => {
  try {
    const articles = await fetchArticles();

    return (
      <ArticlesSection
        title="Статьи"
        viewAllButton={{ text: "Все статьи", href: "articles" }}
        articles={articles}
        compact
      />
    );
  } catch {
    return <div className="text-red-500">Ошибка: не удалось загрузить статьи</div>;
  }
};

export default Articles;
