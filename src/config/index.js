
const port = parseInt(process.env.PORT, 10) || 3000;

module.exports = {
    apiUrl: `http://localhost:${port}`,
    port
};

