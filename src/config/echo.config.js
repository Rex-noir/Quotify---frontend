import Echo from "laravel-echo";
import Pusher from "pusher-js";
import api from "./api.config";

window.Pusher = Pusher;

const isProd = import.meta.env.VITE_ENV === 'production';

window.Echo = new Echo({
  broadcaster: "reverb",
  key: isProd ? import.meta.env.VITE_REVERB_APP_KEY_PROD : import.meta.env.VITE_REVERB_APP_KEY_DEV,
  wsHost: isProd ? import.meta.env.VITE_REVERB_HOST_PROD : import.meta.env.VITE_REVERB_HOST_DEV,
  wsPort: isProd ? import.meta.env.VITE_REVERB_PORT_PROD : import.meta.env.VITE_REVERB_PORT_DEV,
  wssPort: isProd ? import.meta.env.VITE_REVERB_PORT_PROD : import.meta.env.VITE_REVERB_PORT_DEV,
  forceTLS: isProd ? (import.meta.env.VITE_REVERB_SCHEME_PROD === "https") : (import.meta.env.VITE_REVERB_SCHEME_DEV === "https"),
  enabledTransports: ["ws", "wss"],
  authEndpoint: `${isProd ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_DEV}/broadcasting/auth`,

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