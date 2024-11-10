const mockCodes = [
    "XBZ79QFTJLU9ZA5NE863JWZ71DKFRWHNX58RCML",
    "ZDR13KPTVAD5RB7PD120LMQ92NTCZFMTR05NVJL",
    "VJG62DBWXAR3CD4TG982YXH44DSAVRKPJ76ZYGH",
    "TYB45NYUVZT1QA8YC392MSW17GHKRBNBW94JPXZ",
    "WFD23GJPLMP6UB5EF401JRK28QLTYCPGY03MNSK",
    "BRV98SPHZCT8QR2NE572DQW66TXJMWLFL87VYBK",
    "LMX41RVUCYT2HB3UE683ZWP31VKQLXYJP90CZGF",
    "PQS15XHJVAR9SB7TP502QKW34DRFGWZMV01RYKH"
];

const mocks = mockCodes.map((code, index) => {
    return {name: `Store ${index + 1}`, code: code};
})

export default mocks;


  
