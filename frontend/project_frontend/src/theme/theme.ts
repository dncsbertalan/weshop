import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    theme: {
        breakpoints: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1220px",
            "max-screen-width": "1440px",
        },
        semanticTokens: {
            colors: {
                primary: { value: { _light: "#0FEE0F", _dark: "#0FEE0F" } },
                secondary: { value: "#EE0F0F" },
                "bg-color": { value: { _light: "white", _dark: "purple" } },
                "bg-color-footer": { value: { _light: "rgb(242, 242, 247)", _dark: "purple" } },
                //"global-navbar-bg-color": { value: { _light: "rgba(255, 255, 255, 0.8)", _dark: "rgba(22, 22, 23, 0.8)" } },
                "global-navbar-bg-color": { value: { _light: "rgba(250, 250, 252, 0.8)", _dark: "rgba(22, 22, 23, 0.8)" } },
                "global-navbar-bottom-color": { value: { _light: "rgba(255, 255, 255, 0.8)", _dark: "rgba(22, 22, 23, 0.8)" } },
                //"bg-color-product-card": { value: { _light: "rgb(245, 245, 247)", _dark: "rgba(22, 22, 23, 0.8)" } },
                "bg-color-product-card": { value: { _light: "white", _dark: "rgba(22, 22, 23, 0.8)" } },
                "backdrop-color": { value: "rgba(22, 22, 23, 0.5)" },

                "separator-color": { value: { _light: "rgb(220, 220, 220)", _dark: "pink" } },
                "footer-separator-color": { value: { _light: "rgb(220, 220, 220)", _dark: "pink" } },
                //"bg-color": { value: { _light: "#EAEAEA", _dark: "purple" } },
            },
            fonts: {
                body: { value: "system-ui, sans-serif" },
            },
        },
        tokens: {
            colors: {
                "button-color-primary": { value: "#0071e3;" },
                "button-color-primary-hover": { value: "#2997ff;" },
                "button-color-secondary": { value: "pink" },
                "button-color-tetriary": { value: "#2997ff" },
            },
            sizes: {
                "global-navbar-height": { value: "60px" },
                "global-max-window-size": { value: "1440px" },
            },
            zIndex: {
                "global-navbar-z-index": { value: "1000" },
                "filter-panel-z-index": { value: "1" },
                "scrool-to-top-button-z-index": { value: "10" },
            },
            animations: {
                "bg-animation": { value: "bg-animation 5s infinite alternate" },
                "filter-checkbox-hover-animation": { value: "filter-checkbox-hover-animation 5s ease-in-out" },
            },
        },
        keyframes: {
            "bg-animation": {
                "0%": { backgroundPosition: "left" },
                "100%": { backgroundPosition: "right" },
            },
            "filter-checkbox-hover-animation": {
                "0%": { backgroundImage: "linear-gradient(135deg, #f4fff6 0%, #e2f5e7 0%, #cfe9d8 0%)" },
                "100%": { backgroundImage: "linear-gradient(135deg, #f4fff6 0%, #e2f5e7 40%, #cfe9d8 100%)" },
            },
        },
    },
    globalCss: {
        ":root": {
            fontFamily: `"Comic Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
        }
    },
})

export const system = createSystem(defaultConfig, config)