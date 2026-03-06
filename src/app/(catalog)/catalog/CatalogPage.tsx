"use client";

import { useEffect, useState } from "react";
import { CatalogProps } from "@/types/catalog";

import ErrorComponent from "@/components/ErrorComponent";
import { Loader } from "@/components/Loader";
import CatalogAdminControls from "../CatalogAdminControls";
import CatalogGrid from "./CatalogGrid";

const CatalogPage = () => {
  const [categories, setCategories] = useState<CatalogProps[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [draggedCategory, setDraggedCategory] = useState<CatalogProps | null>(
    null,
  );
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = true;

  const fetchCategories = async () => {
    try {
      const response = await fetch("api/catalog");
      if (!response.ok) {
        throw new Error(`Ошибка ответа сервера: ${response.status}`);
      }
      const data: CatalogProps[] = await response.json();
      setCategories(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      setError({
        error: error instanceof Error ? error : new Error("Неизвестная ошибка"),
        userMessage: "Не удалось загрузить каталог категорий",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateOrderInDB = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("api/catalog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          categories.map((category, index) => ({
            _id: category._id,
            order: index + 1,
            title: category.title,
            img: category.img,
            colSpan: category.colSpan,
            tabletColSpan: category.tabletColSpan,
            mobileColSpan: category.mobileColSpan,
          })),
        ),
      });

      if (!response.ok) throw new Error("Ошибка при обновлении порядка");

      await response.json();
    } catch (error) {
      setError({
        error: error instanceof Error ? error : new Error("Неизвестная ошибка"),
        userMessage: "Не удалось изменить порядок категорий",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleEditing = async () => {
    if (isEditing) {
      await updateOrderInDB();
    }
    setIsEditing(!isEditing);
  };

  const handleDragStar = (category: CatalogProps) => {
    if (isEditing) {
      console.log(category);
      setDraggedCategory(category);
    }
  };

  const handleDragOver = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    if (draggedCategory && draggedCategory._id !== categoryId) {
      console.log(categoryId);
      setHoveredCategoryId(categoryId);
    }
  };

  const handleDragLeave = () => {
    setHoveredCategoryId(null);
  };

  const handleDrop = (e: React.DragEvent, targetCategoryId: string) => {
    e.preventDefault();

    if (!isEditing || !draggedCategory) return;

    setCategories((prevCategories) => {
      const draggedIndex = prevCategories.findIndex(
        (c) => c._id === draggedCategory._id,
      );

      const targetIndex = prevCategories.findIndex(
        (c) => c._id === targetCategoryId,
      );

      if (draggedIndex === -1 || targetIndex === -1) return prevCategories;

      const newCategories = [...prevCategories];

      const draggedItem = newCategories[draggedIndex];
      const targetItem = newCategories[targetIndex];

      const draggedSizes = {
        mobileColspan: draggedItem.mobileColSpan,
        tabletColSpan: draggedItem.tabletColSpan,
        colSpan: draggedItem.colSpan,
      };

      const targetSizes = {
        mobileColspan: targetItem.mobileColSpan,
        tabletColSpan: targetItem.tabletColSpan,
        colSpan: targetItem.colSpan,
      };

      newCategories[draggedIndex] = { ...targetItem, ...draggedSizes };
      newCategories[targetIndex] = { ...draggedItem, ...targetSizes };

      return newCategories;
    });

    setDraggedCategory(null);
    setHoveredCategoryId(null);
  };

  const resetLayout = () => {
    fetchCategories();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorComponent error={error.error} userMessage={error.userMessage} />
    );
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
      {isAdmin && (
        <CatalogAdminControls
          isEditing={isEditing}
          onToggleEditingAction={handleToggleEditing}
          onResetLayoutAction={resetLayout}
        />
      )}
      <h1 className="mb-4 md:mb-8 xl:mb-10 flex flex-row text-4xl md:text-5xl xl:text-[64px] text-[#414141] font-bold">
        Каталог
      </h1>
      <CatalogGrid
        categories={categories}
        isEditing={isEditing}
        draggedCategory={draggedCategory}
        hoveredCategoryId={hoveredCategoryId}
        onDragStartAction={handleDragStar}
        onDragOverAction={handleDragOver}
        onDragLeaveAction={handleDragLeave}
        onDropAction={handleDrop}
      />
    </section>
  );
};

export default CatalogPage;
