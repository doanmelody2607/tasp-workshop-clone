const { minify } = require('html-minifier');

module.exports = (content, outputPath) => {
  if (!outputPath) return content; //If Draft Mode, skip minifi this page
  if (process.env.NODE_ENV === 'production' && outputPath.endsWith('.html')) {
    return minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    });
  }

  return content;
};
