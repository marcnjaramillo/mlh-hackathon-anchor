import * as anchor from '@project-serum/anchor';
import { Accounts, Program } from '@project-serum/anchor';
import { SolanaProject } from '../target/types/solana_project';

describe('solana-project', () => {

  const { Keypair, SystemProgram } = anchor.web3;
  
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaProject as Program<SolanaProject>;
  const gifCounter = Keypair.generate();


  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({
      accounts: {
        gifCounter: gifCounter.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [gifCounter],
    });

    console.log("Your transaction signature", tx);
    
    let account = await program.account.gifCounter.fetch(gifCounter.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString());

    await program.rpc.addGif("insert_a_giphy_link_here", {
      accounts: {
        gifCounter: gifCounter.publicKey,
        user: provider.wallet.publicKey,
      },
    });

    account = await program.account.gifCounter.fetch(gifCounter.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString());

    console.log('👀 GIF List', account.gifList)
  });
});
