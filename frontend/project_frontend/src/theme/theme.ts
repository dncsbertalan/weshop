import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    theme: {
        semanticTokens: {
            colors: {
                primary: { value: { _light: "#0FEE0F", _dark: "#0FEE0F" } },
                secondary: { value: "#EE0F0F" },
                "bg-color": { value: { _light: "#EAEAEA", _dark: "purple" } },
            },
            fonts: {
                body: { value: "system-ui, sans-serif" },
            },
        },
        tokens: {
            sizes: {
                "global-navbar-height": { value: "77px" },
                "global-max-window-size": { value: "1440px" },
            }
        },
    },
})

export const system = createSystem(defaultConfig, config)