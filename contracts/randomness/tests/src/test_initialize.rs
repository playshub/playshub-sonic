use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_lang::solana_program::sysvar;
use anchor_client::solana_sdk::signature::Keypair;
use solana_program_test::*;
use solana_sdk::{signer::Signer, transaction::Transaction};
use randomness::program::Randomness;
use randomness::state::RandomnessState;
use anchor_client::anchor_lang::solana_program::hash::hash;

#[tokio::test]
async fn test_initialize() {
    // Start a Solana program test environment
    let mut program_test = ProgramTest::new("randomness", randomness::ID, processor!(randomness::entry));

    // Create test client
    let (mut banks_client, payer, recent_blockhash) = program_test.start().await;

    // Generate a new Keypair for random_state
    let random_state = Keypair::new();
    let user = Keypair::new();

    // Create transaction to initialize randomness state
    let ix = randomness::instruction::initialize(random_state.pubkey(), user.pubkey());
    let tx = Transaction::new_signed_with_payer(
        &[ix],
        Some(&payer.pubkey()),
        &[&payer, &random_state],
        recent_blockhash,
    );

    banks_client.process_transaction(tx).await.expect("Initialize failed");

    // Fetch account data
    let account = banks_client
        .get_account(random_state.pubkey())
        .await
        .expect("Account fetch failed")
        .expect("Account not found");

    let randomness_state: RandomnessState = RandomnessState::try_from_slice(&account.data).unwrap();
    assert_eq!(randomness_state.authority, user.pubkey());
    assert_eq!(randomness_state.counter, 0);
    println!("✅ Randomness state initialized successfully!");
}

#[tokio::test]
async fn test_generate_random() {
    let mut program_test = ProgramTest::new("randomness", randomness::ID, processor!(randomness::entry));

    let (mut banks_client, payer, recent_blockhash) = program_test.start().await;

    let random_state = Keypair::new();
    let user = Keypair::new();

    // Initialize the randomness state first
    let init_ix = randomness::instruction::initialize(random_state.pubkey(), user.pubkey());
    let init_tx = Transaction::new_signed_with_payer(
        &[init_ix],
        Some(&payer.pubkey()),
        &[&payer, &random_state],
        recent_blockhash,
    );

    banks_client.process_transaction(init_tx).await.expect("Initialize failed");

    // Generate a random number
    let max_value: u64 = 100;
    let random_ix = randomness::instruction::generate_random(random_state.pubkey(), user.pubkey(), max_value);
    let random_tx = Transaction::new_signed_with_payer(
        &[random_ix],
        Some(&payer.pubkey()),
        &[&payer, &random_state],
        recent_blockhash,
    );

    banks_client.process_transaction(random_tx).await.expect("Random generation failed");

    // Fetch updated account
    let account = banks_client
        .get_account(random_state.pubkey())
        .await
        .expect("Account fetch failed")
        .expect("Account not found");

    let randomness_state: RandomnessState = RandomnessState::try_from_slice(&account.data).unwrap();

    assert!(randomness_state.last_random_value < max_value, "Random value should be within bounds");
    assert!(randomness_state.counter > 0, "Counter should increment");
    println!("✅ Random number generated successfully: {}", randomness_state.last_random_value);
}