const PORT = process.env.APP_PORT || 3000
const express = require('express')
const app = express()

app.use(express.json())

app.post('/hello', (req, res) => {
    const name = req.body.name;
    res.json({"greeting": `hello ${name}`});
})

app.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`)
})
