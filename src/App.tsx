import React, { useState } from "react";
import PageLayout from "./layout/page";
import Transfer from "./widgets/transfer";
import Container from "./layout/container";
import Card from "./widgets/card";
import USSD from "./widgets/ussd";
import NQR from "./widgets/nqr";
import Raven from "./widgets/raven";

const App = () => {
  const [selected, setSelected] = useState({
    label: "",
  });

  return (
    <div>
      <PageLayout onSelect={setSelected}>
        {selected.label === "Bank Transfer" && <Transfer />}
        {selected.label === "Card Payment" && <Card />}
        {selected.label === "USSD" && <USSD />}
        {selected.label === "NQR Payment" && <NQR />}
        {selected.label === "Raven Pay" && <Raven />}
      </PageLayout>
    </div>
  );
};

export default App;
