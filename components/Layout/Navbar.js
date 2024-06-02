import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { id } = router.query;

  const tabList = [
    { tab: "Dashboard", link: "/" },
    { tab: "Preview", link: `/landingpage/${id}/preview` },
  ];
  return (
    <nav className="bg-[var(--primary-color)] py-3 px-2  flex items-center justify-center">
      <ul className="text-[var(--secondary-color)] flex justify-center gap-10">
        {tabList.map((tab) => (
          <li
            key={tab.tab}
            className="cursor-pointer hover:text-[var(--cta-color)] px-3 text-md"
          >
            <Link href={tab.link}>{tab.tab}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
