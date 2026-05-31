self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title ?? "Wildbret", {
      body: data.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      data: { link: data.link },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const link = event.notification.data?.link ?? "/";
  event.waitUntil(clients.openWindow(link));
});
