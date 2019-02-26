const express = require('express')
const bodyParser = require('body-parser')
const web3Cmt = require('./web3cmt')

const app = express()
const port = 3000

var options = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['js', 'html', 'css'],
	// index: false,
	redirect: false,
	setHeaders: function (res, path, stat) {
	  res.set('x-timestamp', Date.now())
	}
}
  
app.use(express.static('dist', options))

app.use(bodyParser.json())

app.post('/transfer', (req, res) => {
	try {
		let tx = web3Cmt.transfer(req.body)
		res.send(tx)
	} catch (e) {
		console.log(e)
		res.status(500).send(e.message)
	}
})

app.post('/verify', (req, res) => {
	try {
		let tx = web3Cmt.verify(req.body)
		res.send(tx)
	} catch (e) {
		console.log(e)
		res.status(500).send(e.message)
	}
})

app.post('/activate', (req, res) => {
	try {
		let tx = web3Cmt.activate(req.body)
		res.send(tx)
	} catch (e) {
		console.log(e)
		res.status(500).send(e.message)
	}
})

app.post('/deactivate', (req, res) => {
	try {
		let tx = web3Cmt.deactivate(req.body)
		res.send(tx)
	} catch (e) {
		console.log(e)
		res.status(500).send(e.message)
	}
})

app.post('/withdraw', (req, res) => {
	try {
		let tx = web3Cmt.withdraw(req.body)
		res.send(tx)
	} catch (e) {
		console.log(e)
		res.status(500).send(e.message)
	}
})

app.post('/comprate', (req, res) => {
	try {
		let tx = web3Cmt.compRate(req.body)
		res.send(tx)
	} catch (e) {
		console.log(e)
		res.status(500).send(e.message)
	}
})

app.post('/update', (req, res) => {
	try {
		let tx = web3Cmt.update(req.body)
		res.send(tx)
	} catch (e) {
		console.log(e)
		res.status(500).send(e.message)
	}
})

app.post('/shift', (req, res) => {
	try {
		let tx = web3Cmt.shift(req.body)
		res.send(tx)
	} catch (e) {
		console.log(e)
		res.status(500).send(e.message)
	}
})

app.post('/accept', (req, res) => {
	try {
		let tx = web3Cmt.accept(req.body)
		res.send(tx)
	} catch (e) {
		console.log(e)
		res.status(500).send(e.message)
	}
})

app.get('/getcmttx', (req, res) => {
	try {
		let tx = web3Cmt.getCmtTx(req.query.hash)
		res.send(tx)
	} catch (e) {
		console.log(e)
		res.status(500).send(e.message)
	}
})

app.listen(port, () => console.log(`App listening on port ${port}!`))