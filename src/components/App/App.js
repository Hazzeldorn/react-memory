import React from "react";

import MemoryPlayground from "../MemoryPlayground";
import Footer from "../Footer";

import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <MemoryPlayground />
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
