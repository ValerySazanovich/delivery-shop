import fetchPurchases from "../fetchPurchases";
import ProductsSection from "@/app/(products)/ProductsSection";
export const dynamic = "force-dynamic";

const AllNew = async () => {
  try {
    const purchases = await fetchPurchases();

    return <ProductsSection
    title="Все покупки"
    viewAllButton={{text: "На главную", href: "/"}}
    products={purchases}
    />;
  } catch {
    return <div className="text-red-500">Ошибка: не удалось загрузить все покупки</div>;
  }
};

export default AllNew;
