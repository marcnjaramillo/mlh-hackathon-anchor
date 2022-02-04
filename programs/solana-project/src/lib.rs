use anchor_lang::prelude::*;

declare_id!("C4eDSJ3RAoXonEtaWePkYjtkPFfn63mtimnv23AUNGRk");

#[program]
pub mod solana_project {
  use super::*;
  pub fn add_card(
    ctx: Context<AddCard>,
    image_url: String,
    name: String,
    description: String,
    github: String,
    linkedin: String,
    instagram: String,
  ) -> ProgramResult {
    let card = &mut ctx.accounts.card;
    let user: &Signer = &ctx.accounts.user;

    if name.chars().count() > 50 {
      return Err(ErrorCode::NameError.into());
    }

    if description.chars().count() > 100 {
      return Err(ErrorCode::DescError.into());
    }

    if github.chars().count() > 100 {
      return Err(ErrorCode::GithubError.into());
    }

    if linkedin.chars().count() > 100 {
      return Err(ErrorCode::LinkedinError.into());
    }

    if instagram.chars().count() > 100 {
      return Err(ErrorCode::InstagramError.into());
    }

    if image_url.chars().count() > 300 {
      return Err(ErrorCode::ImageError.into());
    }

    card.user = *user.key;
    card.name = name;
    card.image_url = image_url;
    card.description = description;
    card.github = github;
    card.linkedin = linkedin;
    card.instagram = instagram;
    Ok(())
  }
}

#[derive(Accounts)]
pub struct AddCard<'info> {
  #[account(init, payer = user, space = Card::LEN)]
  pub card: Account<'info, Card>,
  #[account(mut)]
  pub user: Signer<'info>,
  pub system_program: Program<'info, System>,
}

#[account]
pub struct Card {
  pub user: Pubkey,
  pub image_url: String,
  pub name: String,
  pub description: String,
  pub github: String,
  pub linkedin: String,
  pub instagram: String,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const IMAGE_URL_LENGTH: usize = 300 * 4;
const PUBLIC_KEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4;
const MAX_NAME_LENGTH: usize = 50 * 4;
const MAX_DESCRIPTION_LENGTH: usize = 100 * 4;
const MAX_GITHUB_LENGTH: usize = 100 * 4;
const MAX_LINKEDIN_LENGTH: usize = 100 * 4;
const MAX_INSTAGRAM_LENGTH: usize = 100 * 4;

impl Card {
  const LEN: usize = DISCRIMINATOR_LENGTH
    + PUBLIC_KEY_LENGTH
    + STRING_LENGTH_PREFIX
    + IMAGE_URL_LENGTH
    + STRING_LENGTH_PREFIX
    + MAX_NAME_LENGTH
    + STRING_LENGTH_PREFIX
    + MAX_DESCRIPTION_LENGTH
    + STRING_LENGTH_PREFIX
    + MAX_GITHUB_LENGTH
    + STRING_LENGTH_PREFIX
    + MAX_LINKEDIN_LENGTH
    + STRING_LENGTH_PREFIX
    + MAX_INSTAGRAM_LENGTH;
}

#[error]
pub enum ErrorCode {
  #[msg("Name cannot exceed 50 characters.")]
  NameError,
  #[msg("Description cannot exceed 100 characters.")]
  DescError,
  #[msg("GitHub URL cannot exceed 100 characters.")]
  GithubError,
  #[msg("LinkedIn URL cannot exceed 100 characters.")]
  LinkedinError,
  #[msg("Instagram URL cannot exceed 100 characters.")]
  InstagramError,
  #[msg("Image URL cannot exceed 300 characters.")]
  ImageError,
}
