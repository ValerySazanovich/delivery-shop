"use client";

import { CatalogProps } from "@/types/catalog";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const CatalogPage = () => {
  const [categories, setCategories] = useState<CatalogProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch("api/catalog");
      if (!response.ok) {
        throw new Error(`Ошибка ответа сервера: ${response.status}`);
      }
      const data: CatalogProps[] = await response.json();
      setCategories(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Не удалось получить данные категорий:", error);
      setError("Не удалось загрузить категории.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Загрузка каталога...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Категорий каталога не найдено
      </div>
    );
  }

  return (
    <section className="w-full mx-auto mb-20 px-[max(12px,calc((100%-1208px)/2))]">
      <h1 className="mb-4 md:mb-8 xl:mb-10 flex flex-row text-4xl md:text-5xl xl:text-[64px] text-[#414141]">
        Каталог
      </h1>
      <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`${category.mobileColSpan} ${category.tabletColSpan} ${category.colSpan} bg-gray-100 rounded overflow-hidden min-h-50 h-full`}
          >
            <div className="h-full w-full">
              <Link
                href={`category-${category.id}`}
                className="block relative h-full overflow-hidden group min-w-40 md:min-w-56 xl:min-w-68.5"
              >
                <Image
                  src={category.img}
                  alt={category.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(112,192,91,0)_0%,rgba(112,192,91,0.82)_82.813%)] h-29.25 top-auto
                  group-hover:bg-[linear-gradient(180deg,rgba(255,102,51,0)_0%,rgba(255,102,51,1)_100%)] group-hover:h-44.25 transition-all duration-300"
                ></div>
                <div className="absolute left-2.5 bottom-2.5 flex items-center">
                  <span className="text-white text-lg font-bold">
                    {category.title}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CatalogPage;
