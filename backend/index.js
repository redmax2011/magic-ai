const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
    });
    res.json({ url: response.data.data[0].url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'فشل إنشاء الصورة' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});