import Image from "next/image";
import Link from "next/link";
import iconMenu from "/public/icons-header/icon-menu.svg";

const ButtonSearch = () => {
  return (
    <Link href='./catalog' className=" bg-(--color-primary) hover:shadow-(--shadow-button-default) active:shadow-(--shadow-button-active) hidden md:flex w-10 p-2 gap-4 lg:w-35 cursor-pointer duration-300 rounded">
      <Image
        src={iconMenu}
        alt="menu"
        width={24}
        height={24}
        className="hidden md:block w-6 h-6"
      />
      <span className=" text-base text-white hidden lg:block">Каталог</span>
    </Link>
  );
};

export default ButtonSearch;
