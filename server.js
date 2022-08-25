require('dotenv').config();
const app = require('./src/app');

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
