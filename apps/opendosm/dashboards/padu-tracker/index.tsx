import { FunctionComponent } from "react";
import { AgencyBadge, Container, Hero, StateDropdown } from "datagovmy-ui/components";
import { useTranslation } from "datagovmy-ui/hooks";
import { IntegrationDataIcon } from "@icons/division";
import { WithData } from "datagovmy-ui/types";
import PaduTrackerTimeseries from "./timeseries";
import { HeatmapData } from "datagovmy-ui/charts/heatmap";
import PaduTrackerHeatmap from "./heatmap";
import PaduTrackerChoropleth from "./choropleth";
import { AKSARA_COLOR } from "datagovmy-ui/constants";
import { routes } from "@lib/routes";

/**
 * Padu Tracker Dashboard
 * @overview Status: Live
 */

export const TIMESERIESDATA = ["x", "activations", "submissions"] as const;

export const CHOROPLETHAREA = ["state"] as const;

export type TimeseriesData = (typeof TIMESERIESDATA)[number];

export type TimeseriesOptions = Record<TimeseriesData, number[]>;

export type TimeseriesCalloutOptions = "cumul" | "daily" | "rate";

export type ChoroplethArea = (typeof CHOROPLETHAREA)[number];

export type ChoroplethOptions = {
  x: Array<string>;
  y: Record<Exclude<TimeseriesData, "x">, Array<number>>;
};

interface PaduTrackerProps {
  last_updated: string;
  next_update: string;
  params: Record<string, string>;
  choropleth: Record<ChoroplethArea, WithData<ChoroplethOptions>>;
  heatmap: WithData<Record<"abs" | "rate", HeatmapData>>;
  timeseries: WithData<TimeseriesOptions>;
  timeseries_callout: WithData<
    Record<Exclude<TimeseriesData, "x">, Record<TimeseriesCalloutOptions, number>>
  >;
}

const PaduTracker: FunctionComponent<PaduTrackerProps> = ({
  last_updated,
  next_update,
  timeseries,
  timeseries_callout,
  heatmap,
  choropleth,
  params,
}) => {
  const { t } = useTranslation(["dashboard-padu-tracker"]);

  return (
    <>
      <Hero
        background="blue"
        category={[t("common:categories.public_administration"), "text-primary"]}
        header={[t("header")]}
        description={[t("description")]}
        last_updated={last_updated}
        next_update={next_update}
        action={<StateDropdown url={routes.PADU_TRACKER} currentState={params.state} />}
        agencyBadge={
          <AgencyBadge
            name={t("division:bipd.full")}
            icon={<IntegrationDataIcon fillColor={AKSARA_COLOR.PRIMARY} />}
            isDivision
          />
        }
      />
      <Container className="min-h-screen">
        <PaduTrackerTimeseries timeseries={timeseries} timeseries_callout={timeseries_callout} />
        <PaduTrackerChoropleth choropleth={choropleth} />
        <PaduTrackerHeatmap heatmap={heatmap} />
      </Container>
    </>
  );
};

export default PaduTracker;
