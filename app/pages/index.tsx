import React, { useEffect, useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Program, Provider } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Grid from '@mui/material/Grid';

import UserCard from '../components/UserCard/UserCard';
import idl from '../../target/idl/solana_project.json';

type cardState = {
  program: any
  connection: any
}

export default function Home() {
  const wallet = useAnchorWallet();

  const [cardState, setCardState] = useState({} as cardState);
  const [nameValue, setNameValue] = useState('');
  const [imgValue, setImgValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [githubValue, setGithubValue] = useState('');
  const [linkedinValue, setLinkedinValue] = useState('');
  const [instagramValue, setInstagramValue] = useState('');
  const [cards, setCards] = useState([] as any);
  const [userCards, setUserCards] = useState([] as any);
  const [selectedCard, setSelectedCard] = useState(null as any);



  const init = async () => {
    const opts = {
      preflightCommitment: 'processed' as anchor.web3.ConfirmOptions,
    }

    const endpoint = 'https://api.devnet.solana.com';
    const connection = new anchor.web3.Connection(
      endpoint,
      opts.preflightCommitment
    ) 
    
    const provider = new Provider(connection, wallet!, opts.preflightCommitment);
    const cardIdl = idl as anchor.Idl;
    const allCards = new anchor.web3.PublicKey('C4eDSJ3RAoXonEtaWePkYjtkPFfn63mtimnv23AUNGRk');
  
    const program = new Program(cardIdl, allCards, provider);
    setCardState({
      program,
      connection
    });
  }

  const getUserCards = async () => {
    try {
  
      // const userCards = await cardState.program.account.card.all([
      //   {
      //     memcmp: {
      //       offset: 8, // Discriminator.
      //       bytes: wallet!.publicKey.toBase58(),
      //     },
      //   },
      // ])
  

        
      // console.log("User cards:", userCards);
      // if (userCards.length > 0) {

      //   setUserCards(userCards)
      //   setSelectedCard(userCards[0])
      // }

      const cards = await cardState.program.account.card.all()
      // console.log('tracks', tracks)
      setCards(cards)
      // console.log('myTrack', myTrack)
      

    } catch (error) {
      console.log("Could not get app state:", error)
      //setUserList(null);      
    }
  }

  const onNameChange = (event: any) => {
    const { value } = event.target;
    setNameValue(value);
  };

  const onImgChange = (event: any) => {
    const { value } = event.target;
    setImgValue(value);
  };

  const onDescChange = (event: any) => {
    const { value } = event.target;
    setDescValue(value);
  };

  const onGithubChange = (event: any) => {
    const { value } = event.target;
    setGithubValue(value);
  };

  const onLinkedinChange = (event: any) => {
    const { value } = event.target;
    setLinkedinValue(value);
  };

  const onInstagramChange = (event: any) => {
    const { value } = event.target;
    setInstagramValue(value);
  };

  const addUser = async () => {
    // const [newCard] =
    // await anchor.web3.PublicKey.findProgramAddress(
    //   [wallet!.publicKey.toBuffer()],
    //   cardState.program.programId
    // )

    // console.log(newCard);
    const newCard = anchor.web3.Keypair.generate();

    const newUser = {
      imgUrl: imgValue, 
      name: nameValue, 
      description: descValue, 
      github: githubValue, 
      linkedin: linkedinValue,
      instagram: instagramValue
    };

    await cardState.program.rpc.addCard(
      imgValue, 
      nameValue, 
      descValue, 
      githubValue, 
      linkedinValue, 
      instagramValue, 
      {
      accounts: {
        user: wallet!.publicKey,
        card: newCard.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [newCard]
    });  

    //setUserList([...userList, newUser]);
    await getUserCards();

    setNameValue('');
    setImgValue('');
    setDescValue('');
    setGithubValue('');
    setLinkedinValue('');
    setInstagramValue('');
  }

  useEffect(() => {
    if (wallet?.publicKey) {
      init()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet])
  
  useEffect(() => {
    if (cardState.program && wallet?.publicKey) {
      getUserCards()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardState])

  return (
    <div className="App">
      <div>
        <div className="header-container">
          <p className="header">Fellows meet fellows</p>
          <p className="sub-text">Let's connect!</p>
          <WalletMultiButton/>

          {wallet?.publicKey ? (
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
                placeholder="Tell us about yourself!"
                value={descValue}
                onChange={onDescChange}
              />
              <button type="submit" className="cta-button submit-gif-button">Submit</button>
            </form>
            </div>
            <Grid container 
              direction="row"
              spacing={3}>
              {cards.map((card: any, i: any) => (
                <Grid item xs={3} md={4} key = {i}>
                  <UserCard
                    imageUrl={card.account.imageUrl}
                    name={card.account.name}
                    description={card.account.description}
                    github={card.account.github}
                    linkedin={card.account.linkedin}
                    instagram={card.account.instagram}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
            ) : (
              <div className="mb-4 text-center">
                <p>Please connect your wallet above to use the app.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};