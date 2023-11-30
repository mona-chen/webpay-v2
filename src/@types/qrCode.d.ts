import React from "react";

declare module "react" {
  interface IntrinsicElements {
    "qr-code": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
