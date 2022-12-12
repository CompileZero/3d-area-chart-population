module.exports = {
  mode: "development",
  devServer: {
    static: "./dist",
  },
  resolve: {
    fallback: {
      fs: false,
    },
  },
};
