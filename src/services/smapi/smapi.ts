import {ILayer} from "./layer"
import {IProvider} from "./provider"

export interface IUtils {
    version: string;
}

export interface ITransaction {
    // serielized transaction data - hex
    txData: string;

    // signed txData when tx is sigend
    signature?: string;
}


export enum TransactionStatus {
    Pending, // not on mesh yet
    OnMesh, // on a mesh layer that might be reversed
    Conirmed, // updated the state in an irreverisble layer
}

export class TransactionResult {
    public txHash: string;
    public result: boolean;
}

export interface ISpacemeshApi {

    // API version
    Version(): Promise<string>;

    // API Utils object
    Utils(): Promise<IUtils>;

    // Set a provider. A provider provides the api
    SetProvider(IProvider): Promise<boolean>;

    // Get the current set provider
    GetProvider(): Promise<IProvider>;

    // For debugging - the protocol version implemented by the provider
    GetProviderVersion(): Promise<string>;

    // Get the provider given by the contexst
    GetGivenProvider(): Promise<IProvider>;

    // Returns true if mesh is not yet ready for queries (syncing)
    IsSyncing(): Promise<boolean>;

    // Current blockmesh layer info
    GetLatestLayerNumber(): Promise<number>;

    // Latest irreverisble blockmesh layer info
    GetLatestIrreversibleLayerNumber(): Promise<number>;

    // Get an account balance
    GetBalance(account: Account, layer: ILayer): Promise<number>;

    // Get the transactions count for this account. e.g. account nonce
    GetTransactionsCount(account: Account, layer: ILayer): Promise<number>;

    // Fiat exchange rate oracle
    GetSMCFiatValue(): Promise<number>;

    // send a signed transaction, returns tx hash
    SendSignedTransaction(tx:ITransaction): Promise<TransactionResult>

    // Get a transaction from the blockmesh (Tx will include layer number and whether it is reversible or not)
    GetTransaction(txHash: string): Promise<TransactionResult>;

    SubscribeToTxStatus(txHash: string, callback: (TransactionStatus) => void ) : Promise<boolean>;

    UnsubscribeFromTxStatus(txHash: string): Promise<boolean>;

}