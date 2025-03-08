import { Injectable } from '@nestjs/common';
import { SolanaRpcService } from '../solana-rpc/solana-rpc.service';
import {
  LAMPORTS_PER_SOL,
  Message,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import bs58 from 'bs58';

@Injectable()
export class TransferService {
  constructor(private readonly solanaRpcService: SolanaRpcService) {}

  async transferSol(to: string, sol: number) {
    const signer = this.solanaRpcService.getSigner();
    const connection = this.solanaRpcService.getConnection();

    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: signer.publicKey,
        toPubkey: new PublicKey(to),
        lamports: LAMPORTS_PER_SOL * sol,
      }),
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transferTransaction,
      [signer],
    );

    return {
      data: {
        signature,
      },
    };
  }
}
