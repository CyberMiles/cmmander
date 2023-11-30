const path = require('path')
const KeyEthereum = require('keythereum')
const Tx =  require('ethereumjs-tx')
const Web3 = require('web3-cmt')

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.CMMANDER_WEB3_PROVIDER || 'http://localhost:8545'))

const ChainId = Number(process.env.CMMANDER_WEB3_CHAINID || 1234)

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
		value: '0x'+dec2hex(value),
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

function abort(params) {
    const from = params.from
    const password = params.password

	let cmtInput = {
		type: 'stake/withdrawCandidacy',
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

function compRate(params) {
    const from = params.from
    const password = params.password
    const delegator = params.delegator
    const compRate = params.compRate

	let cmtInput = {
		type: 'stake/setCompRate',
		data: {
			delegator_address: delegator,
			comp_rate: compRate
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

function update(params) {
    const from = params.from
    const password = params.password
    const pubKey = params.pubKey
	const compRate = params.compRate
	const maxAmount = params.maxAmount
	const name = params.name
	const website = params.website
	const email = params.email
	const location = params.location
	const profile = params.profile

	let cmtInput = {
		type: 'stake/updateCandidacy',
		data: {
			description: {
				name: name,
				email: email,
				website: website,
				location: location,
				profile: profile
			}
		}
	}
	if (pubKey) {
		cmtInput.data.pub_key = pubKey
	}
	if (compRate) {
		cmtInput.data.comp_rate = compRate
	}
	if (maxAmount) {
		cmtInput.data.max_amount = maxAmount
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

function shift(params) {
    const from = params.from
    const password = params.password
    const candidate = params.candidate

	let cmtInput = {
		type: 'stake/updateCandidacyAccount',
		data: {
			new_candidate_account: candidate
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

function accept(params) {
    const from = params.from
    const password = params.password
    const requestId = params.requestId

	let cmtInput = {
		type: 'stake/acceptCandidacyAccountUpdate',
		data: {
			account_update_request_id: Number(requestId)
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

function retire(params) {
    const from = params.from
    const password = params.password
    const preservedValidators = params.preservedValidators
		const reason = params.reason
		const retiredBlockHeight = params.retiredBlockHeight

	let cmtInput = {
		type: 'governance/propose/retire_program',
		data: {
			preserved_validators: preservedValidators,
			reason,
			retired_block_height: Number(retiredBlockHeight),
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

function vote(params) {
  const from = params.from
  const password = params.password
	const proposalId = params.proposalId
	const answer = params.answer

	let cmtInput = {
		type: 'governance/vote',
		data: {
			proposal_id: proposalId,
			answer
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

function dec2hex(str){ // .toString(16) only works up to 2^53
	var dec = str.toString().split(''), sum = [], hex = [], i, s
	while(dec.length){
		s = 1 * dec.shift()
		for(i = 0; s || i < sum.length; i++){
			s += (sum[i] || 0) * 10
			sum[i] = s % 16
			s = (s - sum[i]) / 16
		}
	}
	while(sum.length){
		hex.push(sum.pop().toString(16))
	}
	return hex.join('')
}

module.exports = {transfer, verify, activate, deactivate, abort, withdraw, compRate, update, shift, accept, retire, vote, getCmtTx}