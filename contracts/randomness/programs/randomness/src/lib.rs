use anchor_lang::prelude::*;
use anchor_lang::solana_program::{clock::Clock, hash::hash, pubkey::Pubkey};

declare_id!("AzJ5LJaUWGWUtXjy2N65KSyHjNUmsc8PhtQvjagina5H");

#[program]
pub mod randomness {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let random_seed =
            RandomnessState::new(ctx.accounts.user.key(), ctx.accounts.clock.unix_timestamp);
        ctx.accounts.random_state.set_inner(random_seed);
        msg!("Randomness state initialized");
        Ok(())
    }

    pub fn generate_random(ctx: Context<GenerateRandom>, max: u64) -> Result<()> {
        let random_state = &mut ctx.accounts.random_state;

        // Get current clock for entropy
        let clock = ctx.accounts.clock.unix_timestamp;

        // Update the seed with multiple entropy sources
        let mut seed_data = Vec::new();
        seed_data.extend_from_slice(&random_state.current_seed);
        seed_data.extend_from_slice(&clock.to_le_bytes());
        seed_data.extend_from_slice(&[random_state.counter]);
        seed_data.extend_from_slice(&ctx.accounts.user.key().to_bytes());

        let entropy = hash(&seed_data);

        // Update state
        random_state.current_seed = entropy.to_bytes();
        random_state.counter = random_state.counter.wrapping_add(1);
        random_state.last_timestamp = clock;

        // Calculate random number within range using the first 8 bytes of the hash
        let random_value = u64::from_le_bytes(entropy.to_bytes()[..8].try_into().unwrap());
        let bounded_value = if max > 0 {
            random_value % max
        } else {
            random_value
        };

        random_state.last_random_value = bounded_value;

        msg!("Generated random value: {}", bounded_value);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + RandomnessState::INIT_SPACE
    )]
    pub random_state: Account<'info, RandomnessState>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
    /// CHECK: Using clock for seed entropy
    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct GenerateRandom<'info> {
    #[account(mut)]
    pub random_state: Account<'info, RandomnessState>,
    pub user: Signer<'info>,
    /// CHECK: Using clock for seed entropy
    pub clock: Sysvar<'info, Clock>,
}

#[account]
pub struct RandomnessState {
    pub authority: Pubkey,
    pub current_seed: [u8; 32], // Fix: Store seed as a fixed array
    pub counter: u8,
    pub last_timestamp: i64,
    pub last_random_value: u64,
}

impl RandomnessState {
    const INIT_SPACE: usize = 32 + 32 + 1 + 8 + 8;

    pub fn new(user: Pubkey, timestamp: i64) -> Self {
        // Initialize with a seed derived from multiple sources
        let mut seed_data = Vec::new();
        seed_data.extend_from_slice(&user.to_bytes());
        seed_data.extend_from_slice(&timestamp.to_le_bytes());

        let initial_seed = hash(&seed_data).to_bytes(); // Fix: Convert to [u8; 32]

        Self {
            authority: user,
            current_seed: initial_seed,
            counter: 0,
            last_timestamp: timestamp,
            last_random_value: 0,
        }
    }
}
