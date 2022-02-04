import React, { useEffect, useState } from 'react';
import './App.css';
import UserGrid from './components/UserGrid/UserGrid';
import * as anchor from '@project-serum/anchor';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from './assets/idl.json';
// import { useAnchorWallet } from '@solana/wallet-adapter-react';

const TEST_USERS = [
  {
    img: "https://media.giphy.com/media/IL4iTvQH0MjS/giphy.gif", 
    name: "stella wang", 
    description: "hi my name is stella", 
    github: "stellaw1", 
    linkedin: "stellaw1"
  },
  {
    img: "https://media.giphy.com/media/x7gybOmE9zBmw/giphy.gif", 
    name: "arnold", 
    description: "hi my name is arnold", 
    github: "arnoldying", 
    linkedin: "arnoldying12"
  },
  {
    img: "https://media.giphy.com/media/x7gybOmE9zBmw/giphy.gif", 
    name: "arnold 2123123", 
    description: "hi my name is arnold", 
    github: "arnoldying", 
    linkedin: "arnoldying12"
  },
];

const { SystemProgram, Keypair } = web3;

// Create a keypair for the account that will hold the GIF data.
let user = Keypair.generate();

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: "processed"
}

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [nameValue, setNameValue] = useState('');
  const [imgValue, setImgValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [githubValue, setGithubValue] = useState('');
  const [linkedinValue, setLinkedinValue] = useState('');
  const [instagramValue, setInstagramValue] = useState('');
  const [userList, setUserList] = useState([]);

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection, window.solana, opts.preflightCommitment,
    );
    return provider;
  }

  const getUserList = async() => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      console.log(program.account)
      const account = await program.account.card.all();
      
      console.log("Got the account", account)
      setUserList(account.card)
  
    } catch (error) {
      console.log("Error in getGifList: ", error)
      setUserList(null);
    }
  }

  /*
  * This function holds the logic for deciding if a Phantom Wallet is
  * connected or not
  */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');

          /*
          * The solana object gives us a function that will allow us to connect
          * directly with the user's wallet!
          */
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );

          /*
          * Set the user's publicKey in state to be used later!
          */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  /*
  * Let's define this method so our code doesn't break.
  * We will write the logic for this next!
  */
  const connectWallet = async () => {
    const { solana } = window;
  
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  /*
  * We want to render this UI when the user hasn't connected
  * their wallet to our app yet.
  */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
    <div className="form-box">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addUser();
        }}
      >
        <input 
            type="text" 
            placeholder="Enter name"
            value={nameValue}
            onChange={onNameChange}
        />
        <input 
          type="text" 
          placeholder="Enter profile picture link"
          value={imgValue}
          onChange={onImgChange}
        />
        <input 
          type="text" 
          placeholder="Enter GitHub username"
          value={githubValue}
          onChange={onGithubChange}
        />

        <input 
          type="text" 
          placeholder="Enter LinkedIn username"
          value={linkedinValue}
          onChange={onLinkedinChange}
        />

        <input 
          type="text" 
          placeholder="Enter Instagram username"
          value={instagramValue}
          onChange={onInstagramChange}
        />

        <textarea  
          type="text" 
          placeholder="Tell us about yourself!"
          value={descValue}
          onChange={onDescChange}
        />
        <button type="submit" className="cta-button submit-gif-button">Submit</button>
      </form>
      </div>
      <UserGrid data={userList}/>
    </div>
  );

  const onNameChange = (event) => {
    const { value } = event.target;
    setNameValue(value);
  };

  const onImgChange = (event) => {
    const { value } = event.target;
    setImgValue(value);
  };

  const onDescChange = (event) => {
    const { value } = event.target;
    setDescValue(value);
  };

  const onGithubChange = (event) => {
    const { value } = event.target;
    setGithubValue(value);
  };

  const onLinkedinChange = (event) => {
    const { value } = event.target;
    setLinkedinValue(value);
  };

  const onInstagramChange = (event) => {
    const { value } = event.target;
    setInstagramValue(value);
  };

  const addUser = async () => {
    const newUser = {
      img: imgValue, 
      name: nameValue, 
      description: descValue, 
      github: githubValue, 
      linkedin: linkedinValue,
      instagram: instagramValue
    };
    setUserList([...userList, newUser]);

    setNameValue('');
    setImgValue('');
    setDescValue('');
    setGithubValue('');
    setLinkedinValue('');
    setInstagramValue('');
  }

  /*
    * When our component first mounts, let's check to see if we have a connected
    * Phantom Wallet
    */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Initial dummy users list...');
      setUserList(TEST_USERS);
      getUserList().then(()=>{console.log(userList);});
    }
  }, [walletAddress]);

  return (
    <div className="App">
			<div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">Fellows meet fellows</p>
          <p className="sub-text">
            Let's connect!
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
      </div>
    </div>
  );
};

export default App;
