
var express =  require('express');
var async = require('async');
var Web3 = require('web3');
var eth = require('web3-eth')
const stringify = require('json-stringify-safe')
var HookedWeb3Provider = require('hooked-web3-provider');
const await = require('await');
const app = express();
const bodyParser = require('body-parser');


const port = 3003;
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true,
// }))



// Ropsten Blockchain node Url  
var url = 'http://ropsten.infura.io/v3/7bc3250b95194b04b89d7ca9284d4e5a'

var web3 = new Web3(new Web3.providers.HttpProvider(url));


// This will generate new address and private Key 
app.get('/api/genNewAddress',(req,res) => {
    var data = web3.eth.accounts.create()
    console.log(data)
    res.send(stringify({"address":data.address,"PrivateKey":data.privateKey}))
  })
  


// This will encrypt the privateKey and throws the corresponding address
// Kindly store the data somewhere because that will be used to decrypt the api
app.post('/api/encryptPrivateKey',(req,res)=>{
    var privateKey = req.body.privateKey
    var password = req.body.password
    console.log(privateKey,password)
    var data = web3.eth.accounts.encrypt(privateKey, password)
    console.log(data)
    res.send(data)
})

// This will decrypt the data and throws the address and PrivateKey
app.post('/api/decryptPrivateKey',(req,res)=>{
    var keystore = req.body.keystore
    var password = req.body.password
    console.log(keystore,password)
    var data = web3.eth.accounts.decrypt(keystore, password)
    console.log(data)
    res.send(stringify({"address":data.address,"PrivateKey":data.privateKey}))
})

// Generates one or more accounts in the wallet. If wallets already exist they will not be overridden.
app.post('/api/multipleAccountCreation',(req,res)=>{
    var numOfAccounts = req.body.numOfAccounts
    console.log(numOfAccounts)
    var data = web3.eth.accounts.wallet.create(numOfAccounts)
    console.log(data)
    // res.send(data)
    res.send(stringify({"address":data}))
})


// Adds an account using a private key or account object to the wallet
app.post('/api/addAccountToWallet',(req,res)=>{
    var privateKey = req.body.privateKey
    console.log(privateKey)
    var data =web3.eth.accounts.wallet.add(privateKey);
    console.log(data)
    res.send(stringify({"address":data}))
})


// Removes an account from the wallet.
// It will return the boolean true if it was removed, else false if it cannot be found
app.post('/api/removeAccountToWallet',(req,res)=>{
    var accountAddress = req.body.accountAddress
    console.log(accountAddress)
    var data =web3.eth.accounts.wallet.remove(accountAddress)
    console.log(data)
    res.send(data)
})


// Securely empties the wallet and removes all its accounts.
app.get('/api/clearWallet',(req,res) => {
    var data = web3.eth.accounts.wallet.clear()
    console.log(data)
    // res.send(data)
    res.send(stringify({"address":data}))
  })

//Encrypts all wallet accounts to an array of encrypted keystore v3 objects.
app.post('/api/encryptWallet',(req,res)=>{
    var password = req.body.password
    console.log(password)
    var data = web3.eth.accounts.wallet.encrypt(password);
    console.log(data)
    res.send(data)
})

// Decrypts keystore v3 objects.
app.post('/api/decryptWallet',(req,res)=>{
    var keystore = req.body.keystore
    var password = req.body.password
    console.log(password)
    var data = web3.eth.accounts.wallet.decrypt(keystore,password);
    console.log(data)
    // res.send(data)
    res.send(stringify({"address":data}))
})


app.post('/api/walletSave',(req,res)=>{
    var password = req.body.password
    console.log(password)
    var data = web3.eth.accounts.wallet.save(password)
    console.log(data)
    res.send(data)
})







  // Start the server
  const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
})


