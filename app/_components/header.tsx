import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <div className="flex justify-between px-5 pt-6">
        <Image src="/logo.png" alt="FSW Foods" width={100} height={30} />
        <Button
          size="icon"
          variant="outline"
          className="border-none bg-transparent"
        >
          <MenuIcon />
        </Button>
      </div>
    </>
  );
};

export default Header;
