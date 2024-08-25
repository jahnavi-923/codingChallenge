const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000' // Allow only the frontend's origin
}));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

let lastSubmittedData = null; // Variable to store the last submitted data

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: 'Invalid input format' });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercase = '';

  data.forEach(item => {
      if (!isNaN(item)) {
          numbers.push(item);
      } else if (typeof item === 'string') {
          alphabets.push(item);
          if (item >= 'a' && item <= 'z' && item > highestLowercase) {
              highestLowercase = item;
          }
      }
  });

  lastSubmittedData = {
      is_success: true,
      user_id: "your_full_name_ddmmyyyy",
      email: "jahnavi.21BCE7037@vitapstudent.ac.in",
      roll_number: "21BCE7037",
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
  };

  res.json(lastSubmittedData);
});

// GET route to return both operation_code and last submitted data
app.get('/bfhl', (req, res) => {
  if (lastSubmittedData){
    res.json({
        operation_code: 1,
        last_submitted_data: lastSubmittedData || "No data has been submitted yet."
    });
  }
  else{
    res.json({
      operation_code: 1,
  });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
