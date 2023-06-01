import { createSignal, createEffect, Switch, Match, For } from "solid-js";

const [currentTabIndex, setCurrentTabIndex] = createSignal(1);

const TABS_DATA = [
  {
    id: 1,
    title: "Blogging",
    image: {
      src: "./blogging_notes.png",
      alt: "Copywriting notes with AI",
    },
  },
  {
    id: 2,
    title: "Marketing",
    image: {
      src: "./marketing_notes.png",
      alt: "Marketing notes with AI",
    },
  },
  {
    id: 3,
    title: "Social media",
    image: {
      src: "./mediaplanning_notes.png",
      alt: "Social media notes with AI",
    },
  },
  {
    id: 4,
    title: "Engineering",
    image: {
      src: "./educating_notes.png",
      alt: "Education notes with AI",
    },
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
      class={`text lg:text-xl font-semibold text-left transition-colors focus:outline-none  focus:text-gray-900 hover:text-gray-900 ${
        isCurrent() ? "text-gray-900" : "text-gray-400"
      }`}
    >
      {title}
    </button>
  );
}

function Tabs(props) {
  return (
    <div class="space-x-6 lg:space-x-12 py-4">
      <For each={props.tabs}>
        {(tab) => <Tab index={tab.id} title={tab.title} />}
      </For>
    </div>
  );
}

function NotesTabs({ TabComponent }) {
  return (
    <div class="space-y-1 md:space-y-2">
      <Tabs tabs={TABS_DATA} />
      <For each={TABS_DATA}>
        {(tab) => (
          <img
            classList={{ hidden: currentTabIndex() !== tab.id }}
            src={`./${tab.image.src}`}
            alt={tab.image.alt}
          />
        )}
      </For>
    </div>
  );
}

export default NotesTabs;
