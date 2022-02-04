use anchor_lang::prelude::*;

declare_id!("2HnEuU85pg8GjsnLgmXwcU8XZyYJaransqaQLoHeGzzY");

#[program]
pub mod solana_project {
  use super::*;
  pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
    let gif_counter = &mut ctx.accounts.gif_counter;
    gif_counter.total_gifs = 0;
    Ok(())
  }

  pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> ProgramResult {
    let gif_counter = &mut ctx.accounts.gif_counter;
    let user = &mut ctx.accounts.user;

    let item = ItemStruct {
      gif_link: gif_link.to_string(),
      user_address: *user.to_account_info().key,
    };

    gif_counter.gif_list.push(item);
    gif_counter.total_gifs += 1;
    Ok(())
  }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
  #[account(init, payer = user, space = 9000)]
  pub gif_counter: Account<'info, GifCounter>,
  #[account(mut)]
  pub user: Signer<'info>,
  pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddGif<'info> {
  #[account(mut)]
  pub gif_counter: Account<'info, GifCounter>,
  #[account(mut)]
  pub user: Signer<'info>,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
  pub gif_link: String,
  pub user_address: Pubkey,
}

#[account]
pub struct GifCounter {
  pub total_gifs: u64,
  pub gif_list: Vec<ItemStruct>,
}
