const express = require('express')
const cors = require('cors');
const app = express()
const router = require('./routes')


app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.use('/', router) 
async function main(){
    app.listen(3000, ()=> {
        console.log('Backend running in port 3000')
    })
}
main()
