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

    // Create test items
    let items = vec![
        Item { id: 1, weight: 10 },
        Item { id: 2, weight: 80 },
        Item { id: 3, weight: 10 },
    ];

    // Generate a random item based on weight
    let random_ix = randomness::instruction::generate_random(random_state.pubkey(), user.pubkey(), items);
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

    println!("✅ Selected Item: {}", randomness_state.last_random_value);
}