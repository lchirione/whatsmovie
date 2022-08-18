const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "c61d3fbfafe75c1c1e9c9afe0ba19eb3",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
