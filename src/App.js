import { useState } from 'react';
import Web3 from 'web3';
import Contacts from './artifacts/Contacts.json';

const contactsAddress = "0xE090aCc4eAED1F3885C0617FD62a6A79dd76F69A";

function App() {
  const [account, setAccount] = useState();
  const [counter, setCounter] = useState();
  const [contactList, setContactList] = useState();

  async function fetchContacts() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
    const contactsContract = new web3.eth.Contract(Contacts.abi, contactsAddress);
    const counter = await contactsContract.methods.count.call().call();
    console.log('counter: ', counter);
    const contactList = await contactsContract.methods.contacts(1).call();
   // console.log('contact list: ', contactList);
    setCounter(counter);
    setContactList(contactList);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchContacts}>Fetch Contacts</button>
      </header>
      Your account is: {account}
    </div>
  );
}

export default App;
