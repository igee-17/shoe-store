import React from "react";
import {
  Cart,
  FlexContent,
  Footer,
  Hero,
  Navbar,
  Sales,
  Stories,
} from "../components";
import SharedLayout from "../components/SharedLayout";
import {
  heroapi,
  popularsales,
  toprateslaes,
  highlight,
  sneaker,
  story,
  footerAPI,
} from "../data/data.js";

const Landing = () => {
  return (
    <SharedLayout>
      <main className="flex flex-col gap-16 relative">
        <Hero heroapi={heroapi} />
        {/* <Sales endpoint={popularsales} ifExists /> */}
        <Sales
          title={popularsales.title}
          items={popularsales.items}
          ifExists={true}
        />
        <FlexContent endpoint={highlight} ifExists />
        {/* <Sales endpoint={toprateslaes} /> */}
        <Sales title={toprateslaes.title} items={toprateslaes.items} />
        <FlexContent endpoint={sneaker} ifExists />
        <Stories story={story} />
      </main>
    </SharedLayout>
  );
};

export default Landing;
