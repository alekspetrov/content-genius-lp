import { createSignal, createEffect, Switch, Match, For } from "solid-js";

const [currentTabIndex, setCurrentTabIndex] = createSignal(1);

const TABS_DATA = [
  {
    id: 1,
    name: "Twitter Journalist",
    role: "You are well known Journalist in Twitter.",
    context:
      "Limit per tweet 280 characters, tread not longer that 3 tweets. Professional tone. Add 2-3 hashtags.",
    goal: "Your goal is to create short and easy to read stories form the provided news.",
  },
  {
    id: 2,
    name: "Full Stack Developer",
    role: "You are experienced JS full-stack developer.",
    context:
      "Limit per tweet 280 characters, tread not longer that 3 tweets. Professional tone. Add 2-3 hashtags.",
    goal: "Your goal is to create short and easy to read stories form the provided news.",
  },
  {
    id: 3,
    name: "Creative Marketer",
    role: "You are creative marketer.",
    context:
      "Limit per tweet 280 characters, tread not longer that 3 tweets. Professional tone. Add 2-3 hashtags.",
    goal: "Your goal is to create short and easy to read stories form the provided news.",
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

const InfoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current"
  >
    <g clip-path="url(#clip0_1821_10276)">
      <path d="M7.9974 12.3332C8.36559 12.3332 8.66406 12.0347 8.66406 11.6665L8.66406 6.99984C8.66406 6.63165 8.36559 6.33317 7.9974 6.33317C7.62921 6.33317 7.33073 6.63165 7.33073 6.99984L7.33073 11.6665C7.33073 12.0347 7.62921 12.3332 7.9974 12.3332Z" />
      <path d="M7.9974 5.6665C8.54968 5.6665 8.9974 5.21879 8.9974 4.6665C8.9974 4.11422 8.54968 3.6665 7.9974 3.6665C7.44511 3.6665 6.9974 4.11422 6.9974 4.6665C6.9974 5.21879 7.44511 5.6665 7.9974 5.6665Z" />
      <path d="M0.664062 7.99984C0.664062 12.0499 3.94731 15.3332 7.9974 15.3332C12.0475 15.3332 15.3307 12.0499 15.3307 7.99984C15.3307 3.94975 12.0475 0.666504 7.9974 0.666504C3.94731 0.666504 0.664062 3.94975 0.664062 7.99984ZM7.9974 13.9998C4.68369 13.9998 1.9974 11.3135 1.9974 7.99984C1.9974 4.68613 4.68369 1.99984 7.9974 1.99984C11.3111 1.99984 13.9974 4.68613 13.9974 7.99984C13.9974 11.3135 11.3111 13.9998 7.9974 13.9998Z" />
    </g>
  </svg>
);

function Tab(props) {
  const [isCurrent, setIsCurrent] = createSignal();

  createEffect(() => {
    setIsCurrent(props.index === currentTabIndex());
  });

  return (
    <button
      onClick={[setCurrentTabIndex, props.index]}
      class="text-left rounded-md bg-gray-800 focus:bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-gray-500"
      classList={{
        "border-gray-500 bg-gray-700": isCurrent(),
      }}
    >
      <div class="flex-1 p-4">
        <div class="flex items-center gap-2">
          <div class="text-indigo-500">
            <RobotIcon />
          </div>
          <div class="font-medium">{props.name}</div>
        </div>
        <div class="text-sm text-gray-400 hidden md:block">{props.text}</div>
      </div>
    </button>
  );
}

function Tabs() {
  return (
    <div class="flex flex-col md:flex-row gap-1 md:gap-2">
      <Tab
        name="Full Stack Developer"
        index={1}
        text="Act as a Creative Marketer focused on product value. Your goal is to write marketing content to promote product"
      />
      <Tab
        name="Twitter Journalist"
        index={2}
        text="Act as a Creative Marketer focused on product value. Your goal is to write marketing content to promote product"
      />
      <Tab
        name="Creative Marketer"
        index={3}
        text="Act as a Creative Marketer focused on product value. Your goal is to write marketing content to promote product"
      />
    </div>
  );
}

function PromptForm({ data }) {
  return (
    <div class="pt-4 md:pt-8 rounded-md border border-gray-500 bg-gray-700">
      <div class="px-4 md:px-8">
        <div class="flex gap-2 items-center mb-6">
          <div class="text-red-600 ">
            <RobotIcon />
          </div>
          <div class=" text-white font-semibold">{data.name}</div>
        </div>
        <div class="mb-6">
          <div class="text-white font-medium mb-2">Role</div>
          <div>{data.role}</div>
        </div>
        <div class="mb-6">
          <div class="text-white font-medium mb-2">Context</div>
          <div>{data.context}</div>
        </div>
        <div class="mb-6">
          <div class="text-white font-medium mb-2">Goal</div>
          <div>{data.goal}</div>
        </div>
      </div>

      <div class="border-t border-gray-500 py-4">
        <div class="px-4 md:px-8 flex justify-between">
          <div class="hidden md:flex items-center gap-2 text-sm text-gray-450">
            <div>
              <InfoIcon />
            </div>
            <div>Learn how to prompt</div>
          </div>
          <div class="text-center flex w-full md:w-auto gap-2 text-sm">
            <div class="flex-1 md:flex-none px-3 py-2 rounded-md border border-gray-500">
              Cancel
            </div>
            <div class="flex-1 md:flex-none px-3 py-2 rounded-md bg-indigo-500 text-white">
              Create assistant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SystemPromptForm() {
  return (
    <div class="space-y-1 md:space-y-2">
      <Tabs />
      <Switch>
        <For each={TABS_DATA}>
          {(tab) => (
            <Match when={currentTabIndex() === tab.id}>
              <PromptForm data={tab} />
            </Match>
          )}
        </For>
      </Switch>
    </div>
  );
}
