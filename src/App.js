import { useState } from 'react';
import Web3 from 'web3';
import Contacts from './artifacts/Contacts.json';

const contactAddress = "0x4a12809239c2134265809e36a9B2309201213E6d";

function App() {
  const [account, setAccount] = useState();
  const [name, setName] = useState();
  let accounts;

  async function fetchAccount() { 
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
    console.log(account);
  }
  
  async function getName() {
    await fetchAccount();
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const contactsContract = new web3.eth.Contract(Contacts.abi, contactAddress);
    const whatsName = await contactsContract.methods.retrieveName(accounts[0]).call();
    console.log('Name of the account is: ', whatsName);
    setName(whatsName);
  }

  async function writeName() {
    await fetchAccount();
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const contactContract = new web3.eth.Contract(Contacts.abi, contactAddress);
    await contactContract.methods.setName(accounts[0], name).send({from: accounts[0]});    
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getName}>What is my account's name?</button>
      </header>
      <h5 className="strong">
        <strong>Your account is: {account}</strong>
        <p>Your account's name is: {name}</p>
      </h5>
      <button onClick={writeName}>Change Account Name</button>
      <input onChange={e => setName(e.target.value)} placeholder="new name..." />

    </div>
  );
}

export default App;
