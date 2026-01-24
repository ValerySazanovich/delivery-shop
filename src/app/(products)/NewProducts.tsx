import fetchProductsByCategory from "./fetchProducts";
import ProductsSection from "./ProductsSection";
export const dynamic = "force-dynamic";

const NewProducts = async () => {
  try {
    const products = await fetchProductsByCategory("new");

    return <ProductsSection
    title="Новинки"
    viewAllButton={{text: "Все новинки", href: "new"}}
    products={products}
    compact
    />;
  } catch {
    return <div className="text-red-500">Ошибка: не удалось загрузить новинки</div>;
  }
};

export default NewProducts;
