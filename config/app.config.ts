import type { NuxtConfig } from "@nuxt/schema";

type AppConfig = NonNullable<NuxtConfig["app"]>;

const config: AppConfig = {
  pageTransition: { name: "page", mode: "out-in" },
  head: {
    title: "EcoOptimizer | Duurzame Energie Oplossingen & Consultancy",
    meta: [
      {
        property: "og:title",
        content: "EcoOptimizer | Duurzame Energie Oplossingen & Consultancy",
      },
      {
        name: "description",
        content:
          "EcoOptimizer berekent vooraf exact welke verduurzamingsmaatregelen financieel en praktisch het beste in uw situatie uitpakken. Zonnepanelen, batterijen, laadpalen, EMS en warmtepompen met data-gedreven optimalisatie voor een duurzame toekomst.",
      },
      {
        property: "og:description",
        content:
          "Verduurzaam uw bedrijf met EcoOptimizer. Wij helpen bedrijven bij netcongestie, energiekosten en strengere wetgeving met innovatieve energie-oplossingen, subsidies en belastingvoordelen.",
      },
      {
        name: "keywords",
        content:
          "EcoOptimizer, duurzame energie, zonnepanelen, batterijen, laadpalen, warmtepomp, energiebesparing, consultancy, CSRD, CO2-footprint, verduurzaming, energie optimalisatie",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:locale",
        content: "nl_NL",
      },
    ],
  },
};

export default config;
