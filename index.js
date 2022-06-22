const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const wallet = new Keypair();
const publicKey = new PublicKey(wallet.publicKey);
const secretKey = wallet.secretKey;

// console.log("Public key: " + publicKey);
// console.log("secret key: " + secretKey);

const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const walletBalance = await connection.getBalance(publicKey);
        console.log("Wallet balance:" + walletBalance + "Lamport");
    } catch(err) {
        console.error(err);
    }
}

const airDropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirDropSignature);
    } catch(error) {
        console.log(error);
    }
}

const main = async() => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

main();