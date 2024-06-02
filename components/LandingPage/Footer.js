import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const router = useRouter();
  const { id } = router.query;
  const footerList = [
    { tab: "Github", link: "https://github.com/vashnavichauhan1825" },
    { tab: "LinkedIn", link: "https://www.linkedin.com/in/vashnavichauhan18" },
    { tab: "Twitter", link: "https://x.com/VashnaviChauhan" },
  ];
  const [footerTabs, setFooterTabs] = useState(footerList);

  const landingPages = useSelector((state) => state.landingPages.landingPages);

  useEffect(() => {
    if (id && landingPages.length > 0) {
      const currentFooter = landingPages.filter((page) => page.id === id);
      const footerVal = currentFooter[0]?.components.find(
        (item) => item.type === "Footer"
      ).content;
      console.log("footer", footerVal, currentFooter);
      setFooterTabs(footerVal || footerList);
    }
  }, [id, landingPages]);

  return (
    <footer
      id="Contact"
      className="bg-[var(--secondary-color)] py-10 h-[30vh] flex items-center justify-center"
    >
      <ul className="text-[var(--primary-color)] flex justify-center gap-10">
        {footerTabs.map((tab, i) => (
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
