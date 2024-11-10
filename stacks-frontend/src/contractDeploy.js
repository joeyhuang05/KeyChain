import { makeContractDeploy, broadcastTransaction } from '@stacks/transactions';
//import { StacksTestnet } from '@stacks/network'

import fs from 'fs';
import pkg from '@stacks/network';
const { StacksTestnet } = pkg;

const network = StacksTestnet;
const clarityCode = fs.readFileSync('../../KeyChain/contracts/KeyIssuance2.clar', 'utf-8');


async function deployContract(){
    const senderKey = 'your-private-key';
    const txOptions = {
        contractName: 'your-contract-name',
        codeBody: clarityCode,
        senderKey: senderKey,
        network: network,
    };

    try {
        const transaction = await makeContractDeploy(txOptions);
        const response = await broadcastTransaction(transaction, network);
        console.log('Trasanction ID:', response.txid);
        console.log('Contract Addresses:', response.contract_address)
    } catch (error) {
        console.error('Error deploying contract:', error);
    }
}

await deployContract()
