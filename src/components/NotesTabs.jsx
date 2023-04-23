import { createSignal, createEffect, Switch, Match, For } from "solid-js";

const [currentTabIndex, setCurrentTabIndex] = createSignal(1);

const TABS_DATA = [
  {
    id: 1,
    title: "Devs",
    content: "1",
  },
  {
    id: 2,
    title: "Market",
    content: "2",
  },
  {
    id: 3,
    title: "Copy",
    content: "3",
  },
];

const RobotIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current"
  >
    <rect width="32" height="32" rx="16" />
    <g
      filter="url(#filter0_d_1821_10305)"
      stroke="#FCFCFC"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M20.6667 15.3335H11.3333C10.597 15.3335 10 15.9304 10 16.6668V20.6668C10 21.4032 10.597 22.0002 11.3333 22.0002H20.6667C21.403 22.0002 22 21.4032 22 20.6668V16.6668C22 15.9304 21.403 15.3335 20.6667 15.3335Z" />
      <path d="M15.9974 12.6667C16.7338 12.6667 17.3307 12.0697 17.3307 11.3333C17.3307 10.597 16.7338 10 15.9974 10C15.261 10 14.6641 10.597 14.6641 11.3333C14.6641 12.0697 15.261 12.6667 15.9974 12.6667Z" />
      <path d="M16 12.6665V15.3332" />
      <path d="M13.3359 18.6665H13.3426" />
      <path d="M18.6641 18.6665H18.6707" />
    </g>
    <defs>
      <filter
        id="filter0_d_1821_10305"
        x="8"
        y="8"
        width="16"
        height="16.6667"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.666667" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.486275 0 0 0 0 0 0 0 0 0 0.67451 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1821_10305"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1821_10305"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

function Tab({ index, title }) {
  const [isCurrent, setIsCurrent] = createSignal();

  createEffect(() => {
    setIsCurrent(index === currentTabIndex());
  });

  return (
    <button
      onClick={[setCurrentTabIndex, index]}
      class="text-left rounded-md bg-gray-800 focus:bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-gray-500"
      classList={{
        "border-gray-500 bg-gray-700": isCurrent(),
      }}
    >
      <div class="flex-1 p-4">
        <div class="flex items-center gap-2">
          <div class="font-medium">{title}</div>
        </div>
      </div>
    </button>
  );
}

function Tabs(props) {
  return (
    <div class="flex flex-col md:flex-row gap-1 md:gap-2">
      <For each={props.tabs}>
        {(tab) => <Tab index={tab.id} title={tab.title} />}
      </For>
    </div>
  );
}

function TabContent(props) {
  return (
    <div class="pt-4 md:pt-8 rounded-md border border-gray-500 bg-gray-700">
      {props.tab.id}
    </div>
  );
}

export default function NotesTabs() {
  return (
    <div class="space-y-1 md:space-y-2">
      <Tabs tabs={TABS_DATA} />
      <Switch>
        <For each={TABS_DATA}>
          {(tab) => (
            <Match when={currentTabIndex() === tab.id}>
              <TabContent tab={tab} />
            </Match>
          )}
        </For>
      </Switch>
    </div>
  );
}
