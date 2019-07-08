const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/7bc3250b95194b04b89d7ca9284d4e5a')

const account1 = "0x1c47ab2738e07114450F8a1B58a5DaFed1c01026"
const account2 = "0x909c183ce8F35634e94b899C6Ae96243cc3fD976"

const privateKey1 = Buffer.from(
    'DF4D030ABEF8A8978D3769580C003AC0F4BBFAD8C45A68930ACE2842307E6F7D',
    'hex'
  )

const privateKey2 = Buffer.from(
'20264AB8A8922BEB9A70CF9E61B011328E7A7BC9BF2F0101A4BA38BAE1970E9D',
'hex'
)

// const privateKey1 = 'DF4D030ABEF8A8978D3769580C003AC0F4BBFAD8C45A68930ACE2842307E6F7D'
// const privateKey2 = '20264AB8A8922BEB9A70CF9E61B011328E7A7BC9BF2F0101A4BA38BAE1970E9D'


console.log("Block")



web3.eth.getTransactionCount(account1,(err,txCount) =>{
    console.log("In the Block")
    console.log("Error",err)
   
    const txObject = {
        nonce:web3.utils.toHex(txCount),
        to:account2,
        value:web3.utils.toHex(web3.utils.toWei('0.1','ether')),
        gasLimit:web3.utils.toHex(21000),
        gasPrice:web3.utils.toHex(web3.utils.toWei('10','gwei'))
    }

    console.log("Transaction Object",txObject)
    
    const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' },)
    console.log("tx obj",tx)
    tx.sign(privateKey1)
    const serializedTransaction = tx.serialize()

    console.log("serialized Transaction",serializedTransaction)
    const raw = '0x'+ serializedTransaction.toString('hex')
    console.log("Raw Transaction",raw)
    web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
        console.log("Error",err)
        console.log('txHash:',txHash)
    })

})