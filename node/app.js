const express = require('express')
const app = express()
const Client = require('coinbase').Client

const ALLOWED_ORIGINS = ['http://localhost:2000', 'http://erikvorkink.com']
const COINBASE_API_KEY = '5fevWX8TOz5wKJcN'
const COINBASE_API_SECRET = 'TiVVCKrgbZFFQJOPzku8jyrQBDo5Xxdx'
const INVESTMENT = 100.00

const client = new Client({ 'apiKey': COINBASE_API_KEY, 'apiSecret': COINBASE_API_SECRET })

app.get('/', (req, res) => {
	fetchBalance().then(balance =>{
		setHeaders(req, res)
		res.send(JSON.stringify({
			success: true,
			investment: parseFloat(INVESTMENT.toFixed(2)),
			balance: parseFloat(balance.toFixed(2))
		}))
	})
})

app.listen(3000, () => console.log('App listening on port 3000'))

function setHeaders(req, res) {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

	let origin = req.headers.origin
	if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
		res.header('Access-Control-Allow-Origin', origin)
	}
}

function fetchBalance() {
	return new Promise((resolve, reject) => {
		client.getAccounts({}, (err, accounts) => {
			if (err) {
				reject(err)
			} else {
				let balance = 0
				accounts.forEach(acct => {
					balance += parseFloat(acct.native_balance.amount) // assuming USD
				})
				resolve(balance)
			}
		})
	})
}