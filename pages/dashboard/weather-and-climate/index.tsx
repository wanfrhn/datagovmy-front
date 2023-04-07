import { GetStaticProps } from "next";
import type { InferGetStaticPropsType } from "next";
import { get } from "@lib/api";
import type { Page } from "@lib/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Metadata from "@components/Metadata";
import { useTranslation } from "@hooks/useTranslation";
import WeatherandClimateDashboard from "@dashboards/environment/weather-and-climate";

const WeatherandClimate: Page = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation(["common", "dashboard-weather-and-climate"]);

  return (
    <>
      <Metadata
        title={t("dashboard-weather-and-climate:header")}
        description={t("dashboard-weather-and-climate:description")}
        keywords={""}
      />
      <WeatherandClimateDashboard />
    </>
  );
};
// Disabled
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const i18n = await serverSideTranslations(
    locale!,
    ["common", "dashboard-weather-and-climate"],
    null,
    ["en-GB", "ms-MY"]
  );
  //   const { data } = await get("/dashboard", { dashboard: "currency" });

  return {
    notFound: false,
    props: {
      ...i18n,
    },
    revalidate: 60 * 60 * 24, // 1 day (in seconds)
  };
};

export default WeatherandClimate;
