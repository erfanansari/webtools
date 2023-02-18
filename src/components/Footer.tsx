import Image from "next/image";
import Link from "next/link";
import { IoHeart, IoLogoTwitter } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";

const Footer: React.FC = () => {
  return (
    <footer
      className="mt-24 text-white"
      style={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(24,78,89,1) 100%)",
      }}
    >
      <div className="custom-container flex h-28 flex-col items-center justify-around py-6 md:flex-row md:justify-between md:py-2">
        <Link href="/" className="text-white">
          <div className="flex cursor-pointer items-center">
            <Image src="/white-gear.png" width={43} height={33} alt="logo" />
            <p className="ml-2 text-3xl font-bold">WebTools</p>
          </div>
        </Link>
        <div className="flex items-center">
          <h2 className="cursor-default text-sm">
            Created with{" "}
            <IoHeart className="inline-block text-red-500" size={17} /> By{" "}
            <a
              href="https://twitter.com/eansarimehr"
              target="_blank"
              rel="noreferrer"
              className="text-blue-50 transition-all hover:text-blue-100 hover:underline"
            >
              Erfan Ansari
            </a>
          </h2>
        </div>
        <div className="flex items-center">
          <a
            href="mailto:dev.erfanansari@gmai.com"
            className="text-3xl transition-all hover:scale-110"
            target="_blank"
            rel="noreferrer"
          >
            <MdOutgoingMail />
          </a>
          <a
            href="https://twitter.com/eansarimehr"
            className="ml-5 text-3xl transition-all hover:scale-110"
            target="_blank"
            rel="noreferrer"
          >
            <IoLogoTwitter />
          </a>
          <a
            href="https://t.me/eansarimehr"
            className="ml-5 text-3xl transition-all hover:scale-110"
            target="_blank"
            rel="noreferrer"
          >
            <FaTelegramPlane />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
