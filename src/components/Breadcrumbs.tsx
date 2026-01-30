"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import iconToRight from "/public/icons-products/icon-arrow-right.svg";
import { PATH_TRANSLATIONS } from "../../utils/pathTranslations";


const Breadcrumbs = () => {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return {
      href,
      label: PATH_TRANSLATIONS[segment] || segment,
      isLast: index === pathSegments.length - 1,
    };
  });

  breadcrumbs.unshift({
    href: "/",
    label: "Главная",
    isLast: false,
  });

  return (
    <nav className="px-[max(12px,calc((100%-1208px)/2))] my-6 ">
      <ol className=" flex items-center gap-4 text-[8px] md:text-xs">
        {breadcrumbs.map((item, index) => (
          <li key={index} className=" flex items-center gap-4">
            <div
              className={
                item.isLast
                  ? "text-[#8f8f8f]"
                  : "text-[#414141] hover:underline cursor-pointer"
              }
            >
              {item.isLast ? (
                item.label
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </div>
            {!item.isLast && (
              <Image
                src={iconToRight}
                width={24}
                height={24}
                sizes="24px"
                alt={`Переход от ${item.label} к ${breadcrumbs[breadcrumbs.length - 1].label}`}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
