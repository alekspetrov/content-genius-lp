import splitbee from "@splitbee/web";

splitbee.default.init({
  scriptUrl: "/bee.js",
  apiUrl: "/_hive",
});

export function trackSubscription(email: string): void {
  splitbee.user.set({ email: email });
  splitbee.user.set({ source: "contentgenius.io" });

  splitbee.track("Subscribe", {
    email: email,
  });
}

export function trackServerIssues(email: string, errorMessage: string): void {
  splitbee.user.set({ email: email });
  splitbee.user.set({ source: "contentgenius.io" });

  splitbee.track("Server Error", {
    email: email,
    error: errorMessage,
  });
}
