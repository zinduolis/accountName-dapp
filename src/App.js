import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Contacts from './artifacts/Contacts.json';

const contactsAddress = "0xCdb0B80B74C62d329f7B0b344f05E48ebdf0DC36";

function App() {
  const [account, setAccount] = useState();
  const [counter, setCounter] = useState();
  // const [contacts, setContacts] = useState();

  async function fetchContacts() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
    const contactsContract = new web3.eth.Contract(Contacts.abi, contactsAddress);
    const counter = await contactsContract.methods.count.call().call();
    console.log('counter: ', counter);
    const contactList = await contactsContract.methods.contacts(accounts[0]).call();
   // console.log('contact list: ', contactList);
    setCounter(counter);
  }

  useEffect(() => {
    console.log("Counter has changed")
  },[counter])

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchContacts}>Fetch Contacts</button>
      </header>
      <h5 className="strong">
        <strong>Your account is: {account}</strong>
        <p>This is how many contacts you have: {counter}</p>

      </h5>
    </div>
  );
}

export default App;
