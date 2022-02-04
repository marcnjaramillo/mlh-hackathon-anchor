import * as anchor from '@project-serum/anchor';
import { Accounts, Program } from '@project-serum/anchor';
import { SolanaProject } from '../target/types/solana_project';

describe('solana-project', () => {

  const { Keypair, SystemProgram } = anchor.web3;
  
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaProject as Program<SolanaProject>;
  const card = Keypair.generate();

  it('can create a new card', async () => {
    
    const tx = await program.rpc.addCard('some_image_url', 'name name', 'random description text', 'github_url', 'linkedin_url', 'instagram_url', {
      accounts: {
        card: card.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [card],
    });

    console.log("Your transaction signature", tx);
    
    const account = await program.account.card.fetch(card.publicKey);
    console.log(account);
  });
});
