const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

/*
    id : Number
    created_at: DateTime
    text: String
 */
let snsFeeds = [
    {
        id: 1,
        created_at: Date.parse('2020-12-13'),
        text: 'ㅎㅇ'
    },
    {
        id: 2,
        created_at: Date.parse('2021-02-23'),
        text: '앙 기무띠'
    }
];

app.get('/', (req, res) => {
    res.send(snsFeeds);
});

app.post('/', (req, res) => {
    snsFeeds.push({
        id: snsFeeds.length + 1,
        created_at: Date.now(),
        text: req.body.text,
    });
    res.send(200);
});

app.put('/', (req, res) => {
    const targetId = req.body.id;
    const idx = snsFeeds.findIndex(feed => feed.id === targetId);
    if (idx < 0) {
        //TODO: ID not found error
    }

    snsFeeds[idx].text = req.body.text;
    res.sendStatus(200);
});

app.delete('/', (req, res) => {
    const targetId = req.body.id;
    snsFeeds = snsFeeds.filter(feed => feed.id !== targetId);
    res.sendStatus(200);
});

app.listen(3001, () => {
    console.log('SNS Listening...');
});