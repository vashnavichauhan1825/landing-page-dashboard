const Header = () => {
  const tabList = ["Home", "About", "Career", "Contact"];
  return (
    <nav className="bg-[var(--secondary-color)] py-3 px-2">
      <ul className="text-[var(--primary-color)] flex justify-center gap-10">
        {tabList.map((tab, i) => (
          <li
            key={i}
            className="cursor-pointer hover:text-[var(--cta-color)] px-3"
          >
            {tab}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
