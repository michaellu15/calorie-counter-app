import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();

const rawData = fs.readFileSync('./food_data.json','utf-8');
const parsedData = JSON.parse(rawData);
const initialFoodData = parsedData.Food_Display_Table;
const validFoodData = initialFoodData.filter(item => item && item.Food_Code);
const uniqueFoodMap = new Map();
validFoodData.forEach(item => {
    uniqueFoodMap.set(item.Food_Code, item);
});
const foodData = Array.from(uniqueFoodMap.values());

app.use(cors());

app.get('/api/foods', (req, res) => {
    const { query = '', limit = 25, offset = 0 } = req.query;
    const filtered = foodData.filter((item) => {
        return item.Display_Name.toLowerCase().includes(query.toLowerCase());
    });
    const topRes = filtered.slice(Number(offset), Number(offset) + Number(limit));
    res.status(200).json({ results: topRes, total: filtered.length })
});

app.listen(5000, () => {
    console.log(`Server listening on https://localhost:5000`)
})