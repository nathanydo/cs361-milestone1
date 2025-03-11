const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

app.get("/", (req, res) => {
    res.json({data: "Email validation services working"});
});


app.post('/validate-email', (req, res) => {
    console.log("Email Verification microservice is working")
    const { email } = req.body;
    const isValid = validateEmail(email);
    res.json({ isValid });
});

app.listen(port, () => {
    console.log(`Email Validation service running at http://localhost:${port}`);
});