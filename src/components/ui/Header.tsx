import React from "react";

import AuthButtons from "@/components/ui/AuthButtons";

type Props = {
  classname: string;
};

const Header = ({ classname }: Props) => {
  return (
    <header
      className={`${classname} h-20 px-10 flex items-center justify-between`}
    >
      <AuthButtons />
    </header>
  );
};

export default Header;
