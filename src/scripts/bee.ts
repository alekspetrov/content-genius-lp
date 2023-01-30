import splitbee from "@splitbee/web";

splitbee.init({
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

export function trackServerIssues(email: string, error: Error): void {
  splitbee.user.set({ email: email });
  splitbee.user.set({ source: "contentgenius.io" });

  splitbee.track("Server Error", {
    email: email,
    error: error.message,
  });
}
