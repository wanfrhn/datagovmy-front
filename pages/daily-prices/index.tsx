import { GetStaticProps } from "next";
import type { InferGetStaticPropsType } from "next";
import { get } from "@lib/api";
import type { Page } from "@lib/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Metadata from "@components/Metadata";
import { useTranslation } from "@hooks/useTranslation";
import DailyPricesDashboard from "@dashboards/exchange-rates";

const DailyPrices: Page = ({
  last_updated,
  bar,
  timeseries,
  timeseries_callouts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation(["common", "dashboard-exchange-rates"]);

  return (
    <>
      <Metadata
        title={t("nav.megamenu.dashboards.exchange_rate")}
        description={t("dashboard-exchange-rates:description")}
        keywords={""}
      />
      <DailyPricesDashboard
        last_updated={last_updated}
        bar={bar}
        timeseries={timeseries}
        timeseries_callouts={timeseries_callouts}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const i18n = await serverSideTranslations(locale!, ["common", "dashboard-exchange-rates"]);

  // [WIP] Pending Daily Prices Figma
  return {
    notFound: true,
  };

  //   const { data } = await get("/dashboard", { dashboard: "exchange_dashboard" });

  //   return {
  //     props: {
  //       ...i18n,
  //       last_updated: new Date().valueOf(),
  //       bar: data.bar_chart,
  //       timeseries: data.timeseries,
  //       timeseries_callouts: data.statistics,
  //     },
  //     revalidate: 60 * 60 * 24, // 1 day (in seconds)
  //   };
};

export default DailyPrices;
