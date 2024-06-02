const Footer = () => {
  const footerList = [
    { tab: "Github", link: "https://github.com/vashnavichauhan1825" },
    { tab: "LinkedIn", link: "https://www.linkedin.com/in/vashnavichauhan18" },
    { tab: "Twitter", link: "https://x.com/VashnaviChauhan" },
  ];
  return (
    <footer
      id="Contact"
      className="bg-[var(--secondary-color)] py-10 h-[30vh] flex items-center justify-center"
    >
      <ul className="text-[var(--primary-color)] flex justify-center gap-10">
        {footerList.map((tab, i) => (
          <li
            key={i}
            className="cursor-pointer hover:text-[var(--cta-color)] text-lg"
          >
            <a href={`/${tab.link}`} target="_blank" className="px-3 py-4">
              {tab.tab}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
