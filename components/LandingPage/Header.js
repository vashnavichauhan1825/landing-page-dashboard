import Link from "next/link";

const Header = () => {
  const tabList = ["Home", "About", "Contact"];
  return (
    <nav className="bg-[var(--secondary-color)] py-3 px-2 h-[10vh] flex items-center justify-center">
      <ul className="text-[var(--primary-color)] flex justify-center items-center gap-10">
        {tabList.map((tab, i) => (
          <li
            key={i}
            className="cursor-pointer hover:text-[var(--cta-color)] px-3 text-lg"
          >
            <Link href={`#${tab}`}>{tab}</Link>
          </li>
        ))}
        <li>
          <button className="bg-[var(--primary-color)] font-medium text-[var(--secondary-color)] px-3 py-1 rounded-md hover:bg-[var(--cta-color)] hover:text-[var(--primary-color)]">
            Publish
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
