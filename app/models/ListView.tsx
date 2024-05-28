"use client";

import React, { ReactNode } from "react";
import { Resizable } from "re-resizable";

const ListView = ({ children }: { children: ReactNode }) => {
  const minWidth = 120;
  return (
    <Resizable
      defaultSize={{ width: minWidth * 2, height: "100%" }}
      enable={{ right: true }}
      minWidth={minWidth}
      className="list-view scroll"
      handleStyles={{ right: { cursor: "e-resize" } }}
    >
      {children}
    </Resizable>
  );
};

export default ListView;
