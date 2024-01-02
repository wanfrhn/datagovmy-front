import { GetStaticPaths, GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import { get } from "datagovmy-ui/api";
import { Page } from "datagovmy-ui/types";
import { Metadata, StateDropdown, StateModal } from "datagovmy-ui/components";
import { useTranslation } from "datagovmy-ui/hooks";
import { withi18n } from "datagovmy-ui/decorators";
import { AnalyticsProvider } from "datagovmy-ui/contexts/analytics";
import PaduTrackerDashboard from "@dashboards/padu-tracker";
import { WindowProvider } from "datagovmy-ui/contexts/window";
import Layout from "@components/Layout";
import { clx } from "datagovmy-ui/helpers";
import { body } from "datagovmy-ui/configs/font";
import { routes } from "@lib/routes";

const PaduTracker: Page = ({
  choropleth,
  heatmap,
  last_updated,
  next_update,
  meta,
  timeseries,
  timeseries_callout,
  params,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation(["dashboard-padu-tracker"]);

  return (
    <AnalyticsProvider meta={meta}>
      <Metadata title={t("header")} description={t("description")} keywords={""} />
      <PaduTrackerDashboard
        last_updated={last_updated}
        next_update={next_update}
        timeseries={timeseries}
        timeseries_callout={timeseries_callout}
        choropleth={choropleth}
        heatmap={heatmap}
        params={params}
      />
    </AnalyticsProvider>
  );
};

PaduTracker.layout = (page, props) => {
  return (
    <WindowProvider>
      <Layout
        className={clx(body.variable, "font-sans")}
        stateSelector={
          <StateDropdown
            width="w-max xl:w-64"
            url={routes.PADU_TRACKER}
            currentState={props.params.state}
            hideOnScroll
          />
        }
      >
        <StateModal state={props.params.state} url={routes.POPULATION} />
        {page}
      </Layout>
    </WindowProvider>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = withi18n(
  "dashboard-padu-tracker",
  async ({ params }) => {
    const state = params?.state ? params.state[0] : "mys";
    const { data } = await get("/dashboard", { dashboard: "padu_tracker", state: state });

    return {
      notFound: false,
      props: {
        last_updated: data.data_last_updated,
        next_update: data.data_next_update,
        meta: {
          id: "dashboard-padu-tracker",
          type: "dashboard",
          category: "public-administration",
          agency: "DOSM",
        },
        params: { state: state },
        choropleth: { state: data.choropleth_state },
        heatmap: data.heatmap,
        timeseries: data.timeseries,
        timeseries_callout: data.timeseries_callout,
      },
    };
  }
);

export default PaduTracker;
