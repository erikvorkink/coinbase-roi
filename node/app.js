const express = require('express')
const app = express()
const Client = require('coinbase').Client

const ALLOWED_ORIGINS = [process.env.ROI_ALLOWED_ORIGIN]
const COINBASE_API_KEY = process.env.ROI_COINBASE_API_KEY;
const COINBASE_API_SECRET = process.env.ROI_COINBASE_API_SECRET;
const INVESTMENT = parseFloat(process.env.ROI_INVESTMENT);

const client = new Client({ 'apiKey': COINBASE_API_KEY, 'apiSecret': COINBASE_API_SECRET })

app.get('/roi', (req, res) => {
	fetchBalance().then(balance => {
		setHeaders(req, res)
		let profit = balance - INVESTMENT
		let roi = (INVESTMENT > 0) ? (profit / INVESTMENT) : 0; // .5 = 50%
		res.send(JSON.stringify({
			success: true,
			investment: INVESTMENT,
			balance: balance,
			profit: profit,
			roi: roi
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
