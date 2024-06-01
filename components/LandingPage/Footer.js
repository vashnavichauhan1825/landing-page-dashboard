const Footer = () => {
  const footerList = ["Github", "LinkedIn", "Twitter", "Mail"];
  return (
    <footer className="bg-[var(--secondary-color)] py-10 ">
      <ul className="text-[var(--primary-color)] flex justify-center gap-10">
        {footerList.map((tab, i) => (
          <li
            key={i}
            className="cursor-pointer hover:text-[var(--cta-color)] px-3 py-4"
          >
            {tab}
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
