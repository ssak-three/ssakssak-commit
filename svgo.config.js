module.exports = {
  multipass: true,
  floatPrecision: 2,
  plugins: [
    "removeDoctype",
    "removeComments",
    "removeMetadata",
    "cleanupAttrs",
    { name: "removeDimensions", active: true },
    { name: "mergePaths", active: true },
  ],
};
