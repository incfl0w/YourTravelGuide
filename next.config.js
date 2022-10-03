const withPlugins = require("next-compose-plugins")

const reactSvg = require("next-react-svg")
const path = require("path")

module.exports = withPlugins(
  [
    [
      reactSvg,
      {
        include: path.resolve(__dirname, "src/assets/svg"),
        
      },
    ],
  ],
  {
    images: {
      domains: ['127.0.0.1','http://127.0.0.1:8000/', '0.0.0.0','http://0.0.0.0:8000/' ], 
      deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      // loader: "imgix", // Uncomment this line for STATIC EXPORT
      // path: "", // Uncomment this line for STATIC EXPORT
    },
    env: {
      production_type: "server", // Change variable to "static" for STATIC EXPORT
    },
    // trailingSlash: true // Uncomment this line for STATIC EXPORT
  }
)
