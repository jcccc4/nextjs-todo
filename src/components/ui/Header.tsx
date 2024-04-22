import React from "react";

import AuthButtons from "@/components/ui/AuthButtons";

type Props = {
  listName: string;
};

const Header = (props: Props) => {
  return (
    <header className="h-20 px-10 flex items-center justify-between">

      <AuthButtons />
    </header>
  );
};

export default Header;
