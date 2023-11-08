export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@sidebase/nuxt-auth"],
    auth: {
        globalAppMiddleware: true,
        origin: 'http://localhost:3000',
    },
});