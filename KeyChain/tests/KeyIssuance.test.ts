
import { describe, expect, it } from "vitest";

import { principalCV, cvToJSON , uintCV, PrincipalCV, intCV, cvToString } from '@stacks/transactions';

import { mocks} from "./mocks";

const accounts: Map<string, string> = simnet.getAccounts();
const address1: string = accounts.get("wallet_1")!;
const address2: string = accounts.get("wallet_2")!;

// Test for simple user and 4 businesss
const businessA = mocks[0];
const businessB = mocks[1];
const businessC = mocks[2];
const businessD = mocks[3];



describe("Key Issuance 2 test", () => {

  it("contract deployed", () => {
    const contractSource = simnet.getContractSource("KeyIssuance");
    expect(contractSource).toBeDefined();
  });

  // example recipent
  const recipient: PrincipalCV = principalCV('STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6');

  /**
   * Issue Key Tests
   */

  it ("issue-key: check 1st key", () => {
    const {result} = simnet.callPublicFn(
      "KeyIssuance",    // Contract name
      "issue-key",       // Function name
      [recipient],      // Arguments for the function (recipient)
      address1          // Sender address (contract owner in this case)
    );
    const data = cvToJSON(result);
    const tokenID = data.value.value;

    expect(tokenID).toBe("0");        
  });

  it ("test list content", () => {
    const data1 = simnet.getDataVar(
      "KeyIssuance",
      "live-keys"
    );
    const ignore = simnet.callPublicFn(
      "KeyIssuance",    
      "issue-key",       
      [recipient],      
      address1          
    );
    const data2 = simnet.getDataVar(
      "KeyIssuance",
      "live-keys"
    );
    const ignore2 = simnet.callPublicFn(
      "KeyIssuance",    
      "issue-key",       
      [recipient],      
      address2         
    );
    const data3 = simnet.getDataVar(
      "KeyIssuance",
      "live-keys"
    );

    expect(cvToJSON(data1).value.length).toBe(0);
    expect(cvToJSON(data2).value.length).toBe(1);
    expect(cvToJSON(data3).value.length).toBe(2);
  })
  
  it ("issue-key: check 2nd id", () => {
    const ignore = simnet.callPublicFn(
      "KeyIssuance",    
      "issue-key",       
      [recipient],      
      address1          
    );
    const {result} = simnet.callPublicFn(
      "KeyIssuance",
      "issue-key",
      [recipient],
      address1
    )
    const data = cvToJSON(result);
    const tokenID = data.value.value;
    expect(tokenID).toBe("1");        
  });

  /**
   * Get Key Details Tests
   */

  it ("get-key-details: correct address", () => {
    // Get the key
    const keyData = simnet.callPublicFn(
      "KeyIssuance",    // Contract name
      "issue-key",       // Function name
      [recipient],      // Arguments for the function (recipient)
      address1          // Sender address (contract owner in this case)
    );

    const keyDataJson = cvToJSON(keyData.result);
    const tokenID = keyDataJson.value.value;
    expect(tokenID).toBe("0");

    // Get th key details
    const {result} = simnet.callReadOnlyFn(
      "KeyIssuance",        // Contract name
      "get-key-details",     // Function name
      [uintCV(tokenID)],    // Arguments for the function (recipient)
      address1              // Sender address (contract owner in this case)
    );

    const data = cvToJSON(result);
    const success = data.success;
    const address = data.value.value.value.business.value;
    expect(success).toBe(true);

    // Check that gets the wallet address is correct
    expect(address).toBe(address1);
  });

  /**
   * Is Key Dead Tests
   */

  it ("is-dead: false", () => {
    // issue a key
    const keyData = simnet.callPublicFn(
      "KeyIssuance",    
      "issue-key",      
      [recipient],      
      address1          
    );

    const keyDataJson = cvToJSON(keyData.result);
    const tokenID = Number(keyDataJson.value.value);

    expect(tokenID).toBe(0);
    
    const data = simnet.callPrivateFn(
      "KeyIssuance",
      "is-dead",
      [uintCV(tokenID)],
      address1
    )

    expect(data.result.type).toBe(3);
  });

  /**
   * Test validate key
   */
  it ("Validate Key", () => {

    // 4 wallets give key to user
    const senders = [businessA, businessB, businessC, businessD];

    // user visits all 4 business and gets key
    senders.forEach((sender) => {
      simnet.callPublicFn(
        "KeyIssuance",
        "issue-key",
        [recipient],
        cvToString(sender)
      )
    });
    

    // call function to check on user wallet (recipent) -> 2 matches
    const response = simnet.callReadOnlyFn (
      "KeyIssuance",
      "get-user-map",
      [recipient],
      cvToString(businessA)
    )

    const {result} = response;
 
    const json = cvToJSON(result);

    const visited = json.value.value;


    // check that user has all business keys
    for (let i = 0; i < 4; i++) {
      const principle = visited[i].value;
      const check = cvToString(senders[i]);
      expect(principle).toBe(check);
    }
  })
});
