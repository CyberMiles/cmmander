let path = require('path')
let KeyEthereum = require('keythereum')
let Tx =  require('ethereumjs-tx')
let Web3 = require('web3-cmt')

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))

function sign(address, password) {
	let keyObject = KeyEthereum.importFromFile(address, process.cwd())
	let privateKey = KeyEthereum.recover(password, keyObject)

	var cmtInput = {
		type: 'stake/verifyCandidacy',
		data: {
			candidate_address: address,
			verified: true
		}
	}

	const nonce = web3.cmt.getTransactionCount(address)

	let rawTx = {
		nonce: nonce,
		from: address,
		/*
		to: '0x0123456789012345678901234567890123456789',
		value: '0x2',
		gasPrice: '0x00',
		gasLimit: '0x5208',
		*/
		chainId: Number(1234),
		data: '0x' + Buffer.from(JSON.stringify(cmtInput)).toString('hex')
	}

	let tx = new Tx(rawTx)
	tx.sign(privateKey)
	let signedTx = "0x" + tx.serialize().toString("hex")

	return signedTx
}

let signedTx = sign('0x7eFf122b94897EA5b0E2A9abf47B86337FAfebdC', '1234')
try {
	let r = web3.cmt.sendRawTx(signedTx)
	console.log(r.hash)
} catch (e) {
	console.log(e.message)
}
