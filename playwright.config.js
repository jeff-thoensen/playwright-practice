module.exports = {
    use: {
      baseURL: 'https://the-internet.herokuapp.com',
      headless: true,
    },
    projects: [
      {
        name: 'chromium',
        use: { browserName: 'chromium' },
      },
    ],
  };