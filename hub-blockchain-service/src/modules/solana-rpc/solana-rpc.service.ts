import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Connection,
  SignaturesForAddressOptions,
  Keypair,
  Transaction,
} from '@solana/web3.js';
import bs58 from 'bs58';

@Injectable()
export class SolanaRpcService {
  private connections: Connection[];
  private keyPair: Keypair;

  constructor(private readonly configService: ConfigService) {
    const rpcUrls = this.configService
      .get('SOLANA_RPC_URLS')
      .split(',') as string[];

    const privateKey = this.configService.get('SOLANA_PRIVATE_KEY');
    const keyPair = Keypair.fromSecretKey(bs58.decode(privateKey));
    this.connections = rpcUrls.map(
      (rpcUrl) => new Connection(rpcUrl, 'confirmed'),
    );

    this.keyPair = keyPair;
  }

  async getSignaturesForAddress(options?: SignaturesForAddressOptions) {
    return this.getRandomConnection().getSignaturesForAddress(
      this.keyPair.publicKey,
      options,
    );
  }

  async getTransactions(signatures: string[]) {
    return this.getRandomConnection().getParsedTransactions(signatures, {
      maxSupportedTransactionVersion: 0,
    });
  }

  async sendRawTransaction(transaction: Transaction) {
    return this.getRandomConnection().sendRawTransaction(
      transaction.serialize(),
    );
  }

  getSigner() {
    return this.keyPair;
  }

  getConnection() {
    return this.getRandomConnection();
  }

  private getRandomConnection() {
    return this.connections[
      Math.floor(Math.random() * this.connections.length)
    ];
  }
}
