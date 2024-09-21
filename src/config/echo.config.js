import Echo from "laravel-echo";

import Pusher from "pusher-js";
import api from "./api.config";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "reverb",
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT,
  wssPort: import.meta.env.VITE_REVERB_PORT,
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
  enabledTransports: ["ws", "wss"],
  authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`, // Updated API endpoint

  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        api
          .post(
            options.authEndpoint,
            {
              socket_id: socketId,
              channel_name: channel.name,
            },
            {
              headers: options.auth.headers,
            },
          )
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
});
