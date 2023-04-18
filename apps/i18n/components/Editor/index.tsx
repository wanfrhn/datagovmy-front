"use client";
import { FunctionComponent, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { Monaco, default as MonacoEditor } from "@monaco-editor/react";
import debounce from "lodash/debounce";
import SaveEditor from "./save";
import Empty from "./empty";

interface EditorProps {
  className?: string;
  filePath?: string[];
  defaultValue?: string;
  onChange?: (text: string) => void;
}

const Editor: FunctionComponent<EditorProps> = ({
  className = "grow h-full border-l border-washed-dark bg-black",
  filePath = ["en-GB", "common.json"],
  defaultValue = JSON.stringify(dummy, null, 2),
  onChange,
}) => {
  const ref = useRef(null);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const onMount = (ctx: any, monaco: Monaco) => {
    ref.current = ctx;

    setTimeout(function () {
      ctx.getAction("editor.action.formatDocument").run();
    }, 500);
  };

  const onFinalChange = useCallback(
    debounce((text?: string, event?: any) => {
      compareContent(text!);
      return onChange && text ? onChange(text) : undefined;
    }, 500),
    []
  );

  const compareContent = (text: string) => {
    if (text === defaultValue) return setIsDirty(false);
    else return setIsDirty(true);
  };

  return (
    <div className={className}>
      <SaveEditor isDirty={isDirty} filePath={filePath} />
      {filePath.length > 0 ? (
        <MonacoEditor
          height="90vh"
          theme="vs-dark"
          defaultLanguage="json"
          onMount={onMount}
          onChange={(text, event) => onFinalChange(text, event)}
          defaultValue={defaultValue}
          options={{
            acceptSuggestionOnCommitCharacter: true,
            acceptSuggestionOnEnter: "on",
            accessibilitySupport: "auto",
            autoIndent: false,
            automaticLayout: true,
            codeLens: true,
            colorDecorators: true,
            contextmenu: true,
            cursorBlinking: "blink",
            cursorSmoothCaretAnimation: false,
            cursorStyle: "line",
            disableLayerHinting: false,
            disableMonospaceOptimizations: false,
            dragAndDrop: false,
            fixedOverflowWidgets: false,
            folding: true,
            foldingStrategy: "auto",
            fontLigatures: false,
            formatOnPaste: false,
            formatOnType: false,
            hideCursorInOverviewRuler: false,
            highlightActiveIndentGuide: true,
            links: true,
            mouseWheelZoom: false,
            multiCursorMergeOverlapping: true,
            multiCursorModifier: "alt",
            overviewRulerBorder: true,
            overviewRulerLanes: 2,
            quickSuggestions: true,
            quickSuggestionsDelay: 100,
            readOnly: false,
            renderControlCharacters: false,
            renderFinalNewline: true,
            renderIndentGuides: true,
            renderLineHighlight: "all",
            renderWhitespace: "none",
            revealHorizontalRightPadding: 30,
            roundedSelection: true,
            rulers: [],
            scrollBeyondLastColumn: 5,
            scrollBeyondLastLine: true,
            selectOnLineNumbers: true,
            selectionClipboard: true,
            selectionHighlight: true,
            showFoldingControls: "mouseover",
            smoothScrolling: false,
            suggestOnTriggerCharacters: true,
            wordBasedSuggestions: true,
            wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
            wordWrap: "off",
            wordWrapBreakAfterCharacters: "\t})]?|&,;",
            wordWrapBreakBeforeCharacters: "{([+",
            wordWrapBreakObtrusiveCharacters: ".",
            wordWrapColumn: 80,
            wordWrapMinified: true,
            wrappingIndent: "none",
          }}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
};

const dummy = {
  site: {
    name: "data.gov.my",
    description:
      "Your one-stop interface to browse Malaysia's wealth of open data. If data is the new oil, then openness is the pipeline that maximises its value.",
  },
  error: {
    "output": "Output",
    "disclaimer": "*Not an actual terminal / console.",
    "500": {
      title: "Oops, something went terribly wrong.",
      description: "We are sorry for this incident.",
      reason: "Error code: 500 -- Server error",
    },
    "404": {
      title: "Oops, we cannot find the page you're looking for.",
      description: "Is your URL incorrect?",
      reason: "Error code: 404 -- Page not found",
    },
  },
  common: {
    state: "State",
    district: "District",
    type: "Type",
    name: "Name",
    previous: "Previous",
    next: "Next",
    in: " in ",
    yr: "yr",
    views: "views",
    page_of: "{{ current }} of {{ total }}",
    data_for: "Data for {{ state }}",
    data_of: "Data as of {{ date }}",
    latest: "Latest ({{ date }})",
    last_updated: "Last updated {{ date }}",
    next_update: "Next update {{ date }}",
    slider: "",
    zoom: "Zoom into my area",
    clear: "Clear",
    clear_selection: "Clear selection",
    clear_all: "Clear all",
    reset: "Reset",
    reset_default: "Reset to default",
    close: "Close",
    select: "Select",
    here: "Here",
    no_entries: "No entries found",
    check_out: "Check out",
    no_data: "No data",
    copy: "Copy",
    copied: "Copied!",
    maximum: "Maximum",
    minimum: "Minimum",
    indicator: "Indicator",
    charts: {
      heatmap: "Heatmap",
      table: "Table",
    },
  },
  placeholder: {
    all: "All",
    search: "Search",
    state: "Select state",
    state_first: "Select a state first",
    district: "Select district",
    facility: "Select facility",
    facility_type: "Select facility type",
  },
  nav: {
    home: "Home",
    dashboards: "Dashboards",
    catalogue: "Data Catalogue",
    megamenu: {
      categories: {
        democracy: "Democracy",
        demography: "Demography",
        digitalisation: "Digitalisation",
        economy: "Economy",
        education: "Education",
        environment: "Environment",
        financial_sector: "Financial Sector",
        government_programs: "Government Programs",
        healthcare: "Healthcare",
        high_frequency: "High-Frequency Data",
        national_accounts: "National Accounts",
        public_finances: "Public Finances",
        public_safety: "Public Safety",
        social: "Social",
        transportation: "Transportation",
      },
      dashboards: {
        kawasanku: "Kawasanku",
        gdp: "Gross Domestic Product (GDP)",
        labour_market: "Labour Markets",
        composite_index: "Composite Indices",
        currency_in_circulation: "Currency in Circulation",
        money_supply: "Money Supply",
        reserve_money: "Reserve Money",
        international_reserves: "International Reserves",
        interest_rates: "Interest Rates",
        wholesale_retail: "Wholesale & Retail Trade",
        industrial_production: "Industrial Production",
        consumer_prices: "Consumer Prices",
        producer_prices: "Producer Prices",
        rubber: "Rubber Statistics",
        crime: "Violent & Property Crime",
        drug: "Drug Addiction",
        exchange_rate: "Exchange Rates",
        daily_price: "Daily Prices",
        blood_donation: "Blood Donation",
        birthday_explorer: "Birthday Explorer",
        name_popularity: "Name Popularity",
      },
    },
    about: "About",
    pmo: "Prime Minister's Department",
    dosm: "Department of Statistics Malaysia",
    gov: "Government of Malaysia",
    open_source: "Open Source",
    frontend: "Frontend Repo: NextJS",
    backend: "Backend Repo: Django",
    uiux: "UI + UX Design: Figma",
    mampu: "MAMPU",
    open_data: "Open Data",
    public_open_data: "Public Sector Open Data",
    guiding_principles: "Guiding Principles",
    terms_of_use: "Terms of Use",
  },
  components: {
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    brought_by: "Brought to you by the",
    visit_portal: "Visit our portal",
    click_to_explore: "Click to explore",
    ovs: "Malaysian-born Overseas",
  },
  agency: {
    govt: "Government of Malaysia",
    bnm: "Bank Negara Malaysia",
    mampu: "Malaysian Administrative Modernisation and Management Planning Unit",
    dosm: "Department of Statistics Malaysia",
  },
  agency_abbr: {
    bnm: "BNM",
    mampu: "MAMPU",
    dosm: "DOSM",
  },
  home: {
    category: "Malaysia's official open data portal",
    title: "High frequency. High granularity. High impact.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    section_1: {
      title: "Explore our hottest dashboards",
      description: "Explore how you compare to the national data",
      stats: {
        population: "Current Population",
        economic_growth: "Economic Growth",
        bnm_opr: "BNM OPR",
        unemployment: "Unemployment",
        inflation: "Inflation",
        production_cost: "Production Costs",
        industrial_production: "Industrial Production",
        wholesale_retail: "Wholesale & Retail Trade",
      },
    },
    section_2: {
      title: "Study our most popular datasets",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      past_24h: "Past 24h",
      past_month: "Past 1 month",
      all_time: "All-time",
      dashboards: "Dashboards",
      datasets_available: "Datasets available",
      resource_views: "Resource views",
      resource_downloads: "Resource downloads",
      top_dashboards: "Most viewed dashboards",
      top_catalogues: "Most viewed datasets",
      top_files: "Most downloaded (data)",
      top_images: "Most downloaded (graphics)",
    },
    section_3: {
      title: "Usage of data.gov.my",
      daily: "Daily",
      total: "Total",
    },
    keys: {
      users: "Daily Users",
      views: "Daily Views",
      downloads: "Daily Data Downloads",
    },
  },
  dashboard: {
    header: "A collection of Dashboards",
    description: "Your one-stop interface to browse Malaysia's wealth of open data.",
    demographics: "Demographics",
    source_placeholder: "Select Agency",
    search_placeholder: "Search for dashboards",
    section1_title: "Most Popular Dashboards",
    section1_description: "Explore popular dashboards",
    section2_title: "Recommended for you",
    index_filters: {
      sex: "Sex",
      ethnicity: "Ethnicity",
      age: "Age",
      religion: "Religion",
      nationality: "Nationality",
      disability_status: "Disability Status",
      marital_status: "Marital Status",
    },
  },
  catalogue: {
    header: "Data Catalogue",
    description:
      "Your one-stop interface to browse Malaysia's wealth of open data. This page will grow in depth and breadth every single day, providing richer and more varied data from all Malaysian government and state agencies.",
    dataset_count: "{{ count }} data series, and counting",
    download: "Download",
    category: "Category",
    chart: "Chart",
    table: "Table",
    filter: "Filter",
    index_filters: {
      daily: "Daily",
      weekly: "Weekly",
      monthly: "Monthly",
      quarterly: "Quarterly",
      yearly: "Yearly",
      state: "State",
      dun: "DUN",
      national: "National",
      parlimen: "Parliament",
      district: "District",
    },
    show_filters: {
      "mean": "Mean",
      "median": "Median",
      "minimum": "Minimum",
      "maximum": "Maximum",
      "variable": "Variable",
      "percentile": "Percentile",
      "state": "State",
      "real": "Real",
      "real_sa": "Real (sa)",
      "nominal": "Nominal",
      "level": "Level",
      "growth": "Growth",
      "contribution": "Contribution",
      "male": "Male",
      "female": "Female",
      "change_weekly": "Weekly Change",
      "overall": "Overall",
      "food_beverage": "Food & Non-Alcoholic Beverages",
      "alcohol_tobacco": "Alcoholic Beverages & Tobacco",
      "clothing_footwear": "Clothing & Footwear",
      "housing_utilities": "Housing, Water, Electricity, Gas & Other Fuels",
      "furnishings": "Furnishings, Household Equipment & Routine Household Maintenance",
      "health": "Health",
      "transport": "Transport",
      "communication": "Communication",
      "recreation_culture": "Recreation Services & Culture",
      "education": "Education",
      "hospitality": "Restaurants & Hotels",
      "misc": "Miscellaneous Goods & Services",
      "DAILY": "Daily",
      "WEEKLY": "Weekly",
      "MONTHLY": "Monthly",
      "QUARTERLY": "Quarterly",
      "YEARLY": "Yearly",
      "malaysia": "Malaysia",
      "johor": "Johor",
      "kedah": "Kedah",
      "kelantan": "Kelantan",
      "melaka": "Melaka",
      "negeri-sembilan": "Negeri Sembilan",
      "pahang": "Pahang",
      "perak": "Perak",
      "perlis": "Perlis",
      "pulau-pinang": "Pulau Pinang",
      "sabah": "Sabah",
      "sarawak": "Sarawak",
      "selangor": "Selangor",
      "terengganu": "Terengganu",
      "wp-kuala-lumpur": "W.P. Kuala Lumpur",
      "wp-labuan": "W.P. Labuan",
      "wp-putrajaya": "W.P. Putrajaya",
      "w": {
        p: {
          "-kuala-lumpur": "W.P. Kuala Lumpur",
          "-labuan": "W.P. Labuan",
          "-putrajaya": "W.P. Putrajaya",
        },
      },
      "supra": "Supra",
      "educ_0": "No formal education",
      "educ_1": "Primary",
      "educ_2": "Secondary",
      "educ_3": "Tertiary",
      "cert_0": "No certificate/Not applicable",
      "cert_1": "SPM and below",
      "cert_2": "STPM/Certificate ",
      "cert_3": "Diploma",
      "cert_4": "Degree",
      "masco_1": "Managers",
      "masco_2": "Professionals",
      "masco_3": "Technicians and associate professionals",
      "masco_4": "Clerical support workers",
      "masco_5": "Service and sales workers ",
      "masco_6": "Skilled agricultural, forestry, livestock and fishery workers",
      "masco_7": "Craft and related trades workers",
      "masco_8": "Plant and machine-operators, and assemblers",
      "masco_9": "Elementary occupations",
      "sector_1": "Agriculture",
      "sector_2": "Mining and quarrying",
      "sector_3": "Manufacturing",
      "sector_4": "Construction",
      "sector_5": "Services",
      "skill_1": "Low-skilled",
      "skill_2": "Semi-skilled",
      "skill_3": "Skilled",
      "msic_a": "Agriculture",
      "msic_b": "Mining and quarrying ",
      "msic_c": "Manufacturing",
      "msic_d": "Electricity, gas, steam and air conditioning supply ",
      "msic_e": "Water supply; sewerage, waste management and remediation activities ",
      "msic_f": "Construction ",
      "msic_g": "Wholesale and retail trade; repair of motor vehicles and motorcycles ",
      "msic_h": "Transportation and storage",
      "msic_i": "Accommodation and food and beverage service activities",
      "msic_j": "Information and communication",
      "msic_k": "Financial and insurance/takaful activities ",
      "msic_l": "Real estate activities ",
      "msic_m": "Professional, scientific and technical activities",
      "msic_n": "Administrative and support service activities ",
      "msic_o": "Public administration and defence; compulsory social security",
      "msic_p": "Education ",
      "msic_q": "Human health and social work activities ",
      "msic_r": "Arts, entertainment and recreation",
      "msic_s": "Other service activities",
      "citizen": "Citizen",
      "bumiputera": "Bumiputera",
      "chinese": "Chinese",
      "indian": "Indian ",
      "other_citizen": "Other (Citizen)",
      "other_noncitizen": "Non-Citizen",
    },
    period: "Period",
    geography: "Geography",
    begin: "Begin",
    end: "End",
    source: "Data Source",
    source_placeholder: "Select agency",
    search_placeholder: "Search for dataset",
    image: {
      title: "Image (PNG)",
      desc: "Suitable for general digital use.",
    },
    vector: {
      title: "Vector Graphic (SVG)",
      desc: "Suitable for high quality prints or further image editing.",
    },
    csv: {
      title: "Full Dataset (CSV)",
      desc: "Recommended for individuals seeking an Excel-friendly format.",
    },
    parquet: {
      title: "Full Dataset (Parquet)",
      desc: "Recommended for data scientists seeking to work with data via code.",
    },
    geojson: {
      title: "GeoJSON (JSON)",
      desc: "Open standard format for plotting geographical features on maps.",
    },
    header_1: "How is this data produced?",
    header_2: "What caveats I should bear in mind when using this data?",
    header_3: "Publication(s) using this data",
    meta_desc: "Dataset description",
    meta_def: "Variable definitions",
    meta_chart_above: "(Chart above)",
    meta_all_dataset: "In the entire dataset:",
    meta_variable: "Variable",
    meta_variable_name: "Name in Dataset",
    meta_data_type: "Data type",
    meta_definition: "Definition",
    meta_source: "Data source(s)",
    meta_url: "URLs to dataset",
    meta_license: "License",
    code: "Code",
    code_desc: "Connect directly to the data with Python.",
    code_note: "If not already installed, do",
    code_comments: {
      geojson_1:
        "# the first URL gives you 15dp accuracy (highest possible) \n# the _LIGHT URL gives you 5dp accuracy, sufficient for visuals but not analysis \n# the _LIGHT URL is over 90% smaller in size, hence the tradeoff",
      geojson_2:
        "# Uncomment below to maintain a rectangular map, but remove the whitespace caused by the South China Sea",
      geojson_3:
        "# Uncomment below to change from rectangular --> square, for a more compact visual",
    },
    license_text:
      "This data is made open under the Creative Commons Attribution 4.0 International License (CC BY 4.0). A human-readable copy of the license is available ",
  },
};

export default Editor;
