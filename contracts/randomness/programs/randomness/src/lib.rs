use anchor_lang::prelude::*;

declare_id!("A1k4A8cRkBsDfhEonA2adZCBtDwexDQfVCDigCWtm6NW");

#[program]
pub mod randomness {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
