const path = require('path')
const KeyEthereum = require('keythereum')
const Tx =  require('ethereumjs-tx')
const Web3 = require('web3-cmt')

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.CMMANDER_WEB3_PROVIDER || 'http://localhost:8545'))

const ChainId = Number(1234)

function sendRawTx(from, password, rawTx) {
	let keyObject = KeyEthereum.importFromFile(from, process.cwd())
	let privateKey = KeyEthereum.recover(password, keyObject)
	let tx = new Tx(rawTx)
	tx.sign(privateKey)
	let signedTx = "0x" + tx.serialize().toString("hex")

    let r = web3.cmt.sendRawTx(signedTx)
    return r.hash
}

function transfer(params) {
    const from = params.from
    const password = params.password
    const to = params.to
    const value = params.value

	const nonce = web3.cmt.getTransactionCount(from)

	let rawTx = {
		nonce: nonce,
		from: from,
		to: to,
		value: value,
		gasPrice: '0x00',
		gasLimit: '0x5208',
		chainId: ChainId
	}

	return sendRawTx(from, password, rawTx)
}

function verify(params) {
    const from = params.from
    const password = params.password
    const candidate = params.candidate
    const verified = params.verified

	let cmtInput = {
		type: 'stake/verifyCandidacy',
		data: {
			candidate_address: candidate,
			verified: verified
		}
	}

	const nonce = web3.cmt.getTransactionCount(from)

	let rawTx = {
		nonce: nonce,
		from: from,
		chainId: ChainId,
		data: '0x' + Buffer.from(JSON.stringify(cmtInput)).toString('hex')
	}

	return sendRawTx(from, password, rawTx)
}

function activate(params) {
    const from = params.from
    const password = params.password

	let cmtInput = {
		type: 'stake/activateCandidacy',
		data: {}
	}

	const nonce = web3.cmt.getTransactionCount(from)

	let rawTx = {
		nonce: nonce,
		from: from,
		chainId: ChainId,
		data: '0x' + Buffer.from(JSON.stringify(cmtInput)).toString('hex')
	}

	return sendRawTx(from, password, rawTx)
}

function deactivate(params) {
    const from = params.from
    const password = params.password

	let cmtInput = {
		type: 'stake/deactivateCandidacy',
		data: {}
	}

	const nonce = web3.cmt.getTransactionCount(from)

	let rawTx = {
		nonce: nonce,
		from: from,
		chainId: ChainId,
		data: '0x' + Buffer.from(JSON.stringify(cmtInput)).toString('hex')
	}

	return sendRawTx(from, password, rawTx)
}

function withdraw(params) {
    const from = params.from
    const password = params.password
    const validator = params.validator
    const amount = params.amount

	let cmtInput = {
		type: 'stake/withdraw',
		data: {
			validator_address: validator,
			amount: amount
		}
	}

	const nonce = web3.cmt.getTransactionCount(from)

	let rawTx = {
		nonce: nonce,
		from: from,
		chainId: ChainId,
		data: '0x' + Buffer.from(JSON.stringify(cmtInput)).toString('hex')
	}

	return sendRawTx(from, password, rawTx)
}

function getCmtTx(hash) {
    return web3.cmt.getCmtTransaction(hash)
}

module.exports = {transfer, verify, activate, deactivate, withdraw, getCmtTx}