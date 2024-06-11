module.exports = {
    plugins: [
        // PostCSS plugin to handle @import statements in CSS
        require("postcss-import")({
            // Plugin configuration for postcss-import
            plugins: [
                // Additional plugins to use with postcss-import
                require("stylelint") // Using stylelint with postcss-import
            ],
        }),
        // Tailwind CSS plugin for PostCSS
        require("tailwindcss")("tailwind.config.js"),
        // PostCSS preset for modern CSS features and autoprefixing
        require("postcss-preset-env")({
            // Autoprefixer configuration
            autoprefixer: { grid: true },
            // Enable nesting rules feature
            features: {
                "nesting-rules": true,
            },
            // Browser support configuration
            browsers: ["> 1%", "last 2 versions", "Firefox ESR"],
        }),
    ],
};