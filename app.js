let Tx= require('ethereumjs-tx').Transaction;
const util = require('ethereumjs-util');
const Web3= require('web3');
const url='https://rinkeby.infura.io/v3/d4dbc79ea192404fb42689cc55ce2fc0';
const web3 =new Web3(url);



//const account1= '0x0B872d2A7F3Ca3bD24Ab1A9fe8FBC8059Ec32b5F';
const account2='0x20107D4a4e8BB5D50800288029ad58cE929D2c56';

//web3.eth.getBalance(account1,(err,bal)=>{ console.log(web3.utils.fromWei(bal,"ether"))});

//web3.eth.getBalance(account2,(err,bal)=>{ console.log(web3.utils.fromWei(bal,"ether"))});
const account1 = '0x' + util.privateToAddress('A337E5C704CF4187C0CECF4A6E38AD42182B4D038EB8615E239216C5164FEB40').toString('hex');

const privatekey1 = new Buffer('A337E5C704CF4187C0CECF4A6E38AD42182B4D038EB8615E239216C5164FEB40','hex');
//const privatekey2 = Buffer.from(process.env.PRIVATE_KEY_2,'hex');


web3.eth.getTransactionCount(account1,async (err,txCount)=>{

//console.log(txCount);

//Build the transaction

const txObject ={
  from: account1,
  nonce: web3.utils.toHex(txCount),
  to: account2,
  value: web3.utils.toHex(web3.utils.toWei('1',"ether")),
  gasLimit: web3.utils.toHex(21000),
  gasPrice: web3.utils.toHex(web3.utils.toWei('10',"gwei"))
}
//console.log(txObject);

//sign the transaction
const tx = new Tx(txObject);
tx.sign(privatekey1);

const serializeTransaction = tx.serialize();
const raw= '0x'+ serializeTransaction.toString('hex');





web3.eth.sendSignedTransaction(raw)
    .on('transactionHash', (hash) => {
      console.log('sent tx with hash: ' + hash);
    })
    .on('error', (err) => {
      console.log('errorh: ' + err);
    });

})


