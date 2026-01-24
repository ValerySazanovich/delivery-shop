import fetchProductsByCategory from "./fetchProducts";
import ProductsSection from "./ProductsSection";
export const dynamic = "force-dynamic";

const Actions = async () => {
  try {
    const products = await fetchProductsByCategory("actions");

    return <ProductsSection
    title="Акции"
    viewAllButton={{text: "Все акции", href: "actions"}}
    products={products}
    compact
    />;
  } catch {
    return <div className="text-red-500">Ошибка: не удалось загрузить акции</div>;
  }
};

export default Actions;
