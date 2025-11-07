/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/jupiter.json`.
 */
export type Jupiter = {
  "address": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4",
  "metadata": {
    "name": "jupiter",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Jupiter aggregator program"
  },
  "instructions": [
    {
      "name": "claim",
      "discriminator": [
        62,
        198,
        214,
        193,
        213,
        159,
        108,
        210
      ],
      "accounts": [
        {
          "name": "wallet",
          "writable": true,
          "address": "7JQeyNK55fkUPUmEotupBFpiBGpgEQYLe8Ht1VdSfxcP"
        },
        {
          "name": "programAuthority",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        }
      ],
      "returns": "u64"
    },
    {
      "name": "claimToken",
      "discriminator": [
        116,
        206,
        27,
        191,
        166,
        19,
        0,
        73
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "wallet",
          "address": "7JQeyNK55fkUPUmEotupBFpiBGpgEQYLe8Ht1VdSfxcP"
        },
        {
          "name": "programAuthority"
        },
        {
          "name": "programTokenAccount",
          "writable": true
        },
        {
          "name": "destinationTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "wallet"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "mint"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        }
      ],
      "returns": "u64"
    },
    {
      "name": "closeToken",
      "discriminator": [
        26,
        74,
        236,
        151,
        104,
        64,
        183,
        249
      ],
      "accounts": [
        {
          "name": "operator",
          "signer": true,
          "address": "9RAufBfjGQjDfrwxeyKmZWPADHSb8HcoqCdrmpqvCr1g"
        },
        {
          "name": "wallet",
          "writable": true,
          "address": "7JQeyNK55fkUPUmEotupBFpiBGpgEQYLe8Ht1VdSfxcP"
        },
        {
          "name": "programAuthority"
        },
        {
          "name": "programTokenAccount",
          "writable": true
        },
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "tokenProgram"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "burnAll",
          "type": "bool"
        }
      ]
    },
    {
      "name": "createTokenLedger",
      "discriminator": [
        232,
        242,
        197,
        253,
        240,
        143,
        129,
        52
      ],
      "accounts": [
        {
          "name": "tokenLedger",
          "writable": true,
          "signer": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createTokenAccount",
      "discriminator": [
        147,
        241,
        123,
        100,
        244,
        132,
        174,
        118
      ],
      "accounts": [
        {
          "name": "tokenAccount",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "exactOutRoute",
      "discriminator": [
        208,
        51,
        239,
        151,
        123,
        43,
        237,
        92
      ],
      "accounts": [
        {
          "name": "tokenProgram"
        },
        {
          "name": "userTransferAuthority",
          "signer": true
        },
        {
          "name": "userSourceTokenAccount",
          "writable": true
        },
        {
          "name": "userDestinationTokenAccount",
          "writable": true
        },
        {
          "name": "destinationTokenAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "sourceMint"
        },
        {
          "name": "destinationMint"
        },
        {
          "name": "platformFeeAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "token2022Program",
          "optional": true
        },
        {
          "name": "eventAuthority",
          "address": "D8cy77BBepLMngZx6ZukaTff5hCt1HrWyKk3Hnd9oitf"
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "routePlan",
          "type": {
            "vec": {
              "defined": {
                "name": "routePlanStep"
              }
            }
          }
        },
        {
          "name": "outAmount",
          "type": "u64"
        },
        {
          "name": "quotedInAmount",
          "type": "u64"
        },
        {
          "name": "slippageBps",
          "type": "u16"
        },
        {
          "name": "platformFeeBps",
          "type": "u8"
        }
      ],
      "returns": "u64"
    },
    {
      "name": "route",
      "discriminator": [
        229,
        23,
        203,
        151,
        122,
        227,
        173,
        42
      ],
      "accounts": [
        {
          "name": "tokenProgram"
        },
        {
          "name": "userTransferAuthority",
          "signer": true
        },
        {
          "name": "userSourceTokenAccount",
          "writable": true
        },
        {
          "name": "userDestinationTokenAccount",
          "writable": true
        },
        {
          "name": "destinationTokenAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "destinationMint"
        },
        {
          "name": "platformFeeAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "eventAuthority",
          "address": "D8cy77BBepLMngZx6ZukaTff5hCt1HrWyKk3Hnd9oitf"
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "routePlan",
          "type": {
            "vec": {
              "defined": {
                "name": "routePlanStep"
              }
            }
          }
        },
        {
          "name": "inAmount",
          "type": "u64"
        },
        {
          "name": "quotedOutAmount",
          "type": "u64"
        },
        {
          "name": "slippageBps",
          "type": "u16"
        },
        {
          "name": "platformFeeBps",
          "type": "u8"
        }
      ],
      "returns": "u64"
    },
    {
      "name": "routeWithTokenLedger",
      "discriminator": [
        150,
        86,
        71,
        116,
        167,
        93,
        14,
        104
      ],
      "accounts": [
        {
          "name": "tokenProgram"
        },
        {
          "name": "userTransferAuthority",
          "signer": true
        },
        {
          "name": "userSourceTokenAccount",
          "writable": true
        },
        {
          "name": "userDestinationTokenAccount",
          "writable": true
        },
        {
          "name": "destinationTokenAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "destinationMint"
        },
        {
          "name": "platformFeeAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "tokenLedger"
        },
        {
          "name": "eventAuthority",
          "address": "D8cy77BBepLMngZx6ZukaTff5hCt1HrWyKk3Hnd9oitf"
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "routePlan",
          "type": {
            "vec": {
              "defined": {
                "name": "routePlanStep"
              }
            }
          }
        },
        {
          "name": "quotedOutAmount",
          "type": "u64"
        },
        {
          "name": "slippageBps",
          "type": "u16"
        },
        {
          "name": "platformFeeBps",
          "type": "u8"
        }
      ],
      "returns": "u64"
    },
    {
      "name": "setTokenLedger",
      "discriminator": [
        228,
        85,
        185,
        112,
        78,
        79,
        77,
        2
      ],
      "accounts": [
        {
          "name": "tokenLedger",
          "writable": true
        },
        {
          "name": "tokenAccount"
        }
      ],
      "args": []
    },
    {
      "name": "sharedAccountsExactOutRoute",
      "discriminator": [
        176,
        209,
        105,
        168,
        154,
        125,
        69,
        62
      ],
      "accounts": [
        {
          "name": "tokenProgram"
        },
        {
          "name": "programAuthority"
        },
        {
          "name": "userTransferAuthority",
          "signer": true
        },
        {
          "name": "sourceTokenAccount",
          "writable": true
        },
        {
          "name": "programSourceTokenAccount",
          "writable": true
        },
        {
          "name": "programDestinationTokenAccount",
          "writable": true
        },
        {
          "name": "destinationTokenAccount",
          "writable": true
        },
        {
          "name": "sourceMint"
        },
        {
          "name": "destinationMint"
        },
        {
          "name": "platformFeeAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "token2022Program",
          "optional": true
        },
        {
          "name": "eventAuthority",
          "address": "D8cy77BBepLMngZx6ZukaTff5hCt1HrWyKk3Hnd9oitf"
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "routePlan",
          "type": {
            "vec": {
              "defined": {
                "name": "routePlanStep"
              }
            }
          }
        },
        {
          "name": "outAmount",
          "type": "u64"
        },
        {
          "name": "quotedInAmount",
          "type": "u64"
        },
        {
          "name": "slippageBps",
          "type": "u16"
        },
        {
          "name": "platformFeeBps",
          "type": "u8"
        }
      ],
      "returns": "u64"
    },
    {
      "name": "sharedAccountsRoute",
      "discriminator": [
        193,
        32,
        155,
        51,
        65,
        214,
        156,
        129
      ],
      "accounts": [
        {
          "name": "tokenProgram"
        },
        {
          "name": "programAuthority"
        },
        {
          "name": "userTransferAuthority",
          "signer": true
        },
        {
          "name": "sourceTokenAccount",
          "writable": true
        },
        {
          "name": "programSourceTokenAccount",
          "writable": true
        },
        {
          "name": "programDestinationTokenAccount",
          "writable": true
        },
        {
          "name": "destinationTokenAccount",
          "writable": true
        },
        {
          "name": "sourceMint"
        },
        {
          "name": "destinationMint"
        },
        {
          "name": "platformFeeAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "token2022Program",
          "optional": true
        },
        {
          "name": "eventAuthority",
          "address": "D8cy77BBepLMngZx6ZukaTff5hCt1HrWyKk3Hnd9oitf"
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "routePlan",
          "type": {
            "vec": {
              "defined": {
                "name": "routePlanStep"
              }
            }
          }
        },
        {
          "name": "inAmount",
          "type": "u64"
        },
        {
          "name": "quotedOutAmount",
          "type": "u64"
        },
        {
          "name": "slippageBps",
          "type": "u16"
        },
        {
          "name": "platformFeeBps",
          "type": "u8"
        }
      ],
      "returns": "u64"
    },
    {
      "name": "sharedAccountsRouteWithTokenLedger",
      "discriminator": [
        230,
        121,
        143,
        80,
        119,
        159,
        106,
        170
      ],
      "accounts": [
        {
          "name": "tokenProgram"
        },
        {
          "name": "programAuthority"
        },
        {
          "name": "userTransferAuthority",
          "signer": true
        },
        {
          "name": "sourceTokenAccount",
          "writable": true
        },
        {
          "name": "programSourceTokenAccount",
          "writable": true
        },
        {
          "name": "programDestinationTokenAccount",
          "writable": true
        },
        {
          "name": "destinationTokenAccount",
          "writable": true
        },
        {
          "name": "sourceMint"
        },
        {
          "name": "destinationMint"
        },
        {
          "name": "platformFeeAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "token2022Program",
          "optional": true
        },
        {
          "name": "tokenLedger"
        },
        {
          "name": "eventAuthority",
          "address": "D8cy77BBepLMngZx6ZukaTff5hCt1HrWyKk3Hnd9oitf"
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "routePlan",
          "type": {
            "vec": {
              "defined": {
                "name": "routePlanStep"
              }
            }
          }
        },
        {
          "name": "quotedOutAmount",
          "type": "u64"
        },
        {
          "name": "slippageBps",
          "type": "u16"
        },
        {
          "name": "platformFeeBps",
          "type": "u8"
        }
      ],
      "returns": "u64"
    },
    {
      "name": "exactOutRouteV2",
      "discriminator": [
        157,
        138,
        184,
        82,
        21,
        244,
        243,
        36
      ],
      "accounts": [
        {
          "name": "userTransferAuthority",
          "signer": true
        },
        {
          "name": "userSourceTokenAccount",
          "writable": true
        },
        {
          "name": "userDestinationTokenAccount",
          "writable": true
        },
        {
          "name": "sourceMint"
        },
        {
          "name": "destinationMint"
        },
        {
          "name": "sourceTokenProgram"
        },
        {
          "name": "destinationTokenProgram"
        },
        {
          "name": "destinationTokenAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "eventAuthority",
          "address": "D8cy77BBepLMngZx6ZukaTff5hCt1HrWyKk3Hnd9oitf"
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "outAmount",
          "type": "u64"
        },
        {
          "name": "quotedInAmount",
          "type": "u64"
        },
        {
          "name": "slippageBps",
          "type": "u16"
        },
        {
          "name": "platformFeeBps",
          "type": "u16"
        },
        {
          "name": "positiveSlippageBps",
          "type": "u16"
        },
        {
          "name": "routePlan",
          "type": {
            "vec": {
              "defined": {
                "name": "routePlanStepV2"
              }
            }
          }
        }
      ],
      "returns": "u64"
    },
    {
      "name": "routeV2",
      "discriminator": [
        187,
        100,
        250,
        204,
        49,
        196,
        175,
        20
      ],
      "accounts": [
        {
          "name": "userTransferAuthority",
          "signer": true
        },
        {
          "name": "userSourceTokenAccount",
          "writable": true
        },
        {
          "name": "userDestinationTokenAccount",
          "writable": true
        },
        {
          "name": "sourceMint"
        },
        {
          "name": "destinationMint"
        },
        {
          "name": "sourceTokenProgram"
        },
        {
          "name": "destinationTokenProgram"
        },
        {
          "name": "destinationTokenAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "eventAuthority",
          "address": "D8cy77BBepLMngZx6ZukaTff5hCt1HrWyKk3Hnd9oitf"
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "inAmount",
          "type": "u64"
        },
        {
          "name": "quotedOutAmount",
          "type": "u64"
        },
        {
          "name": "slippageBps",
          "type": "u16"
        },
        {
          "name": "platformFeeBps",
          "type": "u16"
        },
        {
          "name": "positiveSlippageBps",
          "type": "u16"
        },
        {
          "name": "routePlan",
          "type": {
            "vec": {
              "defined": {
                "name": "routePlanStepV2"
              }
            }
          }
        }
      ],
      "returns": "u64"
    },
    {
      "name": "sharedAccountsExactOutRouteV2",
      "discriminator": [
        53,
        96,
        229,
        202,
        216,
        187,
        250,
        24
      ],
      "accounts": [
        {
          "name": "programAuthority"
        },
        {
          "name": "userTransferAuthority",
          "signer": true
        },
        {
          "name": "sourceTokenAccount",
          "writable": true
        },
        {
          "name": "programSourceTokenAccount",
          "writable": true
        },
        {
          "name": "programDestinationTokenAccount",
          "writable": true
        },
        {
          "name": "destinationTokenAccount",
          "writable": true
        },
        {
          "name": "sourceMint"
        },
        {
          "name": "destinationMint"
        },
        {
          "name": "sourceTokenProgram"
        },
        {
          "name": "destinationTokenProgram"
        },
        {
          "name": "eventAuthority",
          "address": "D8cy77BBepLMngZx6ZukaTff5hCt1HrWyKk3Hnd9oitf"
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "outAmount",
          "type": "u64"
        },
        {
          "name": "quotedInAmount",
          "type": "u64"
        },
        {
          "name": "slippageBps",
          "type": "u16"
        },
        {
          "name": "platformFeeBps",
          "type": "u16"
        },
        {
          "name": "positiveSlippageBps",
          "type": "u16"
        },
        {
          "name": "routePlan",
          "type": {
            "vec": {
              "defined": {
                "name": "routePlanStepV2"
              }
            }
          }
        }
      ],
      "returns": "u64"
    },
    {
      "name": "sharedAccountsRouteV2",
      "discriminator": [
        209,
        152,
        83,
        147,
        124,
        254,
        216,
        233
      ],
      "accounts": [
        {
          "name": "programAuthority"
        },
        {
          "name": "userTransferAuthority",
          "signer": true
        },
        {
          "name": "sourceTokenAccount",
          "writable": true
        },
        {
          "name": "programSourceTokenAccount",
          "writable": true
        },
        {
          "name": "programDestinationTokenAccount",
          "writable": true
        },
        {
          "name": "destinationTokenAccount",
          "writable": true
        },
        {
          "name": "sourceMint"
        },
        {
          "name": "destinationMint"
        },
        {
          "name": "sourceTokenProgram"
        },
        {
          "name": "destinationTokenProgram"
        },
        {
          "name": "eventAuthority",
          "address": "D8cy77BBepLMngZx6ZukaTff5hCt1HrWyKk3Hnd9oitf"
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "inAmount",
          "type": "u64"
        },
        {
          "name": "quotedOutAmount",
          "type": "u64"
        },
        {
          "name": "slippageBps",
          "type": "u16"
        },
        {
          "name": "platformFeeBps",
          "type": "u16"
        },
        {
          "name": "positiveSlippageBps",
          "type": "u16"
        },
        {
          "name": "routePlan",
          "type": {
            "vec": {
              "defined": {
                "name": "routePlanStepV2"
              }
            }
          }
        }
      ],
      "returns": "u64"
    }
  ],
  "accounts": [
    {
      "name": "tokenLedger",
      "discriminator": [
        156,
        247,
        9,
        188,
        54,
        108,
        85,
        77
      ]
    }
  ],
  "events": [
    {
      "name": "feeEvent",
      "discriminator": [
        73,
        79,
        78,
        127,
        184,
        213,
        13,
        220
      ]
    },
    {
      "name": "swapEvent",
      "discriminator": [
        64,
        198,
        205,
        232,
        38,
        8,
        113,
        226
      ]
    },
    {
      "name": "swapsEvent",
      "discriminator": [
        152,
        47,
        78,
        235,
        192,
        96,
        110,
        106
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "emptyRoute",
      "msg": "Empty route"
    },
    {
      "code": 6001,
      "name": "slippageToleranceExceeded",
      "msg": "Slippage tolerance exceeded"
    },
    {
      "code": 6002,
      "name": "invalidCalculation",
      "msg": "Invalid calculation"
    },
    {
      "code": 6003,
      "name": "missingPlatformFeeAccount",
      "msg": "Missing platform fee account"
    },
    {
      "code": 6004,
      "name": "invalidSlippage",
      "msg": "Invalid slippage"
    },
    {
      "code": 6005,
      "name": "notEnoughPercent",
      "msg": "Not enough percent to 100"
    },
    {
      "code": 6006,
      "name": "invalidInputIndex",
      "msg": "Token input index is invalid"
    },
    {
      "code": 6007,
      "name": "invalidOutputIndex",
      "msg": "Token output index is invalid"
    },
    {
      "code": 6008,
      "name": "notEnoughAccountKeys",
      "msg": "Not Enough Account keys"
    },
    {
      "code": 6009,
      "name": "nonZeroMinimumOutAmountNotSupported",
      "msg": "Non zero minimum out amount not supported"
    },
    {
      "code": 6010,
      "name": "invalidRoutePlan",
      "msg": "Invalid route plan"
    },
    {
      "code": 6011,
      "name": "invalidReferralAuthority",
      "msg": "Invalid referral authority"
    },
    {
      "code": 6012,
      "name": "ledgerTokenAccountDoesNotMatch",
      "msg": "Token account doesn't match the ledger"
    },
    {
      "code": 6013,
      "name": "invalidTokenLedger",
      "msg": "Invalid token ledger"
    },
    {
      "code": 6014,
      "name": "incorrectTokenProgramId",
      "msg": "Token program ID is invalid"
    },
    {
      "code": 6015,
      "name": "tokenProgramNotProvided",
      "msg": "Token program not provided"
    },
    {
      "code": 6016,
      "name": "swapNotSupported",
      "msg": "Swap not supported"
    },
    {
      "code": 6017,
      "name": "exactOutAmountNotMatched",
      "msg": "Exact out amount doesn't match"
    },
    {
      "code": 6018,
      "name": "sourceAndDestinationMintCannotBeTheSame",
      "msg": "Source mint and destination mint cannot the same"
    },
    {
      "code": 6019,
      "name": "invalidMint",
      "msg": "Invalid mint"
    },
    {
      "code": 6020,
      "name": "invalidProgramAuthority",
      "msg": "Invalid program authority"
    },
    {
      "code": 6021,
      "name": "invalidOutputTokenAccount",
      "msg": "Invalid output token account"
    },
    {
      "code": 6022,
      "name": "invalidFeeWallet",
      "msg": "Invalid fee wallet"
    },
    {
      "code": 6023,
      "name": "invalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6024,
      "name": "insufficientFunds",
      "msg": "Insufficient funds"
    },
    {
      "code": 6025,
      "name": "invalidTokenAccount",
      "msg": "Invalid token account"
    },
    {
      "code": 6026,
      "name": "bondingCurveAlreadyCompleted",
      "msg": "Bonding curve already completed"
    }
  ],
  "types": [
    {
      "name": "feeEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "account",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "remainingAccountsInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "slices",
            "type": {
              "vec": {
                "defined": {
                  "name": "remainingAccountsSlice"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "remainingAccountsSlice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accountsType",
            "type": "u8"
          },
          {
            "name": "length",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "accountsType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "transferHookA"
          },
          {
            "name": "transferHookB"
          },
          {
            "name": "transferHookReward"
          },
          {
            "name": "transferHookInput"
          },
          {
            "name": "transferHookIntermediate"
          },
          {
            "name": "transferHookOutput"
          },
          {
            "name": "supplementalTickArrays"
          },
          {
            "name": "supplementalTickArraysOne"
          },
          {
            "name": "supplementalTickArraysTwo"
          }
        ]
      }
    },
    {
      "name": "defiTunaAccountsType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "transferHookA"
          },
          {
            "name": "transferHookB"
          },
          {
            "name": "transferHookInput"
          },
          {
            "name": "transferHookIntermediate"
          },
          {
            "name": "transferHookOutput"
          },
          {
            "name": "supplementalTickArrays"
          },
          {
            "name": "supplementalTickArraysOne"
          },
          {
            "name": "supplementalTickArraysTwo"
          }
        ]
      }
    },
    {
      "name": "routePlanStep",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swap",
            "type": {
              "defined": {
                "name": "swap"
              }
            }
          },
          {
            "name": "percent",
            "type": "u8"
          },
          {
            "name": "inputIndex",
            "type": "u8"
          },
          {
            "name": "outputIndex",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "routePlanStepV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swap",
            "type": {
              "defined": {
                "name": "swap"
              }
            }
          },
          {
            "name": "bps",
            "type": "u16"
          },
          {
            "name": "inputIndex",
            "type": "u8"
          },
          {
            "name": "outputIndex",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "side",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "bid"
          },
          {
            "name": "ask"
          }
        ]
      }
    },
    {
      "name": "swap",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "saber"
          },
          {
            "name": "saberAddDecimalsDeposit"
          },
          {
            "name": "saberAddDecimalsWithdraw"
          },
          {
            "name": "tokenSwap"
          },
          {
            "name": "sencha"
          },
          {
            "name": "step"
          },
          {
            "name": "cropper"
          },
          {
            "name": "raydium"
          },
          {
            "name": "crema",
            "fields": [
              {
                "name": "aToB",
                "type": "bool"
              }
            ]
          },
          {
            "name": "lifinity"
          },
          {
            "name": "mercurial"
          },
          {
            "name": "cykura"
          },
          {
            "name": "serum",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": {
                    "name": "side"
                  }
                }
              }
            ]
          },
          {
            "name": "marinadeDeposit"
          },
          {
            "name": "marinadeUnstake"
          },
          {
            "name": "aldrin",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": {
                    "name": "side"
                  }
                }
              }
            ]
          },
          {
            "name": "aldrinV2",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": {
                    "name": "side"
                  }
                }
              }
            ]
          },
          {
            "name": "whirlpool",
            "fields": [
              {
                "name": "aToB",
                "type": "bool"
              }
            ]
          },
          {
            "name": "invariant",
            "fields": [
              {
                "name": "xToY",
                "type": "bool"
              }
            ]
          },
          {
            "name": "meteora"
          },
          {
            "name": "gooseFx"
          },
          {
            "name": "deltaFi",
            "fields": [
              {
                "name": "stable",
                "type": "bool"
              }
            ]
          },
          {
            "name": "balansol"
          },
          {
            "name": "marcoPolo",
            "fields": [
              {
                "name": "xToY",
                "type": "bool"
              }
            ]
          },
          {
            "name": "dradex",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": {
                    "name": "side"
                  }
                }
              }
            ]
          },
          {
            "name": "lifinityV2"
          },
          {
            "name": "raydiumClmm"
          },
          {
            "name": "openbook",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": {
                    "name": "side"
                  }
                }
              }
            ]
          },
          {
            "name": "phoenix",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": {
                    "name": "side"
                  }
                }
              }
            ]
          },
          {
            "name": "symmetry",
            "fields": [
              {
                "name": "fromTokenId",
                "type": "u64"
              },
              {
                "name": "toTokenId",
                "type": "u64"
              }
            ]
          },
          {
            "name": "tokenSwapV2"
          },
          {
            "name": "heliumTreasuryManagementRedeemV0"
          },
          {
            "name": "stakeDexStakeWrappedSol"
          },
          {
            "name": "stakeDexSwapViaStake",
            "fields": [
              {
                "name": "bridgeStakeSeed",
                "type": "u32"
              }
            ]
          },
          {
            "name": "gooseFxv2"
          },
          {
            "name": "perps"
          },
          {
            "name": "perpsAddLiquidity"
          },
          {
            "name": "perpsRemoveLiquidity"
          },
          {
            "name": "meteoraDlmm"
          },
          {
            "name": "openBookV2",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": {
                    "name": "side"
                  }
                }
              }
            ]
          },
          {
            "name": "raydiumClmmV2"
          },
          {
            "name": "StakeDexPrefundWithdrawStakeAndDepositStake",
            "fields": [
              {
                "name": "bridgeStakeSeed",
                "type": "u32"
              }
            ]
          },
          {
            "name": "clone",
            "fields": [
              {
                "name": "poolIndex",
                "type": "u8"
              },
              {
                "name": "quantityIsInput",
                "type": "bool"
              },
              {
                "name": "quantityIsCollateral",
                "type": "bool"
              }
            ]
          },
          {
            "name": "sanctumS",
            "fields": [
              {
                "name": "srcLstValueCalcAccs",
                "type": "u8"
              },
              {
                "name": "dstLstValueCalcAccs",
                "type": "u8"
              },
              {
                "name": "srcLstIndex",
                "type": "u32"
              },
              {
                "name": "dstLstIndex",
                "type": "u32"
              }
            ]
          },
          {
            "name": "sanctumSAddLiquidity",
            "fields": [
              {
                "name": "lstValueCalcAccs",
                "type": "u8"
              },
              {
                "name": "lstIndex",
                "type": "u32"
              }
            ]
          },
          {
            "name": "sanctumSRemoveLiquidity",
            "fields": [
              {
                "name": "lstValueCalcAccs",
                "type": "u8"
              },
              {
                "name": "lstIndex",
                "type": "u32"
              }
            ]
          },
          {
            "name": "raydiumCp"
          },
          {
            "name": "whirlpoolSwapV2",
            "fields": [
              {
                "name": "aToB",
                "type": "bool"
              },
              {
                "name": "remainingAccountsInfo",
                "type": {
                  "option": {
                    "defined": {
                      "name": "remainingAccountsInfo"
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "oneIntro"
          },
          {
            "name": "pumpWrappedBuy"
          },
          {
            "name": "pumpWrappedSell"
          },
          {
            "name": "perpsV2"
          },
          {
            "name": "perpsV2AddLiquidity"
          },
          {
            "name": "perpsV2RemoveLiquidity"
          },
          {
            "name": "moonshotWrappedBuy"
          },
          {
            "name": "moonshotWrappedSell"
          },
          {
            "name": "stabbleStableSwap"
          },
          {
            "name": "stabbleWeightedSwap"
          },
          {
            "name": "obric",
            "fields": [
              {
                "name": "xToY",
                "type": "bool"
              }
            ]
          },
          {
            "name": "foxBuyFromEstimatedCost"
          },
          {
            "name": "foxClaimPartial",
            "fields": [
              {
                "name": "isY",
                "type": "bool"
              }
            ]
          },
          {
            "name": "solFi",
            "fields": [
              {
                "name": "isQuoteToBase",
                "type": "bool"
              }
            ]
          },
          {
            "name": "solayerDelegateNoInit"
          },
          {
            "name": "solayerUndelegateNoInit"
          },
          {
            "name": "tokenMill",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": {
                    "name": "side"
                  }
                }
              }
            ]
          },
          {
            "name": "daosFunBuy"
          },
          {
            "name": "daosFunSell"
          },
          {
            "name": "zeroFi"
          },
          {
            "name": "stakeDexWithdrawWrappedSol"
          },
          {
            "name": "virtualsBuy"
          },
          {
            "name": "virtualsSell"
          },
          {
            "name": "perena",
            "fields": [
              {
                "name": "inIndex",
                "type": "u8"
              },
              {
                "name": "outIndex",
                "type": "u8"
              }
            ]
          },
          {
            "name": "pumpSwapBuy"
          },
          {
            "name": "pumpSwapSell"
          },
          {
            "name": "gamma"
          },
          {
            "name": "meteoraDlmmSwapV2",
            "fields": [
              {
                "name": "remainingAccountsInfo",
                "type": {
                  "defined": {
                    "name": "remainingAccountsInfo"
                  }
                }
              }
            ]
          },
          {
            "name": "woofi"
          },
          {
            "name": "meteoraDammV2"
          },
          {
            "name": "meteoraDynamicBondingCurveSwap"
          },
          {
            "name": "stabbleStableSwapV2"
          },
          {
            "name": "stabbleWeightedSwapV2"
          },
          {
            "name": "raydiumLaunchlabBuy",
            "fields": [
              {
                "name": "shareFeeRate",
                "type": "u64"
              }
            ]
          },
          {
            "name": "raydiumLaunchlabSell",
            "fields": [
              {
                "name": "shareFeeRate",
                "type": "u64"
              }
            ]
          },
          {
            "name": "boopdotfunWrappedBuy"
          },
          {
            "name": "boopdotfunWrappedSell"
          },
          {
            "name": "plasma",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": {
                    "name": "side"
                  }
                }
              }
            ]
          },
          {
            "name": "goonFi",
            "fields": [
              {
                "name": "isBid",
                "type": "bool"
              },
              {
                "name": "blacklistBump",
                "type": "u8"
              }
            ]
          },
          {
            "name": "humidiFi",
            "fields": [
              {
                "name": "swapId",
                "type": "u64"
              },
              {
                "name": "isBaseToQuote",
                "type": "bool"
              }
            ]
          },
          {
            "name": "meteoraDynamicBondingCurveSwapWithRemainingAccounts"
          },
          {
            "name": "tesseraV",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": {
                    "name": "side"
                  }
                }
              }
            ]
          },
          {
            "name": "pumpWrappedBuyV2"
          },
          {
            "name": "pumpWrappedSellV2"
          },
          {
            "name": "pumpSwapBuyV2"
          },
          {
            "name": "pumpSwapSellV2"
          },
          {
            "name": "heaven",
            "fields": [
              {
                "name": "aToB",
                "type": "bool"
              }
            ]
          },
          {
            "name": "solFiV2",
            "fields": [
              {
                "name": "isQuoteToBase",
                "type": "bool"
              }
            ]
          },
          {
            "name": "aquifer"
          },
          {
            "name": "pumpWrappedBuyV3"
          },
          {
            "name": "pumpWrappedSellV3"
          },
          {
            "name": "pumpSwapBuyV3"
          },
          {
            "name": "pumpSwapSellV3"
          },
          {
            "name": "jupiterLendDeposit"
          },
          {
            "name": "jupiterLendRedeem"
          },
          {
            "name": "defiTuna",
            "fields": [
              {
                "name": "aToB",
                "type": "bool"
              },
              {
                "name": "remainingAccountsInfo",
                "type": {
                  "option": {
                    "defined": {
                      "name": "remainingAccountsInfo"
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "alphaQ",
            "fields": [
              {
                "name": "aToB",
                "type": "bool"
              }
            ]
          },
          {
            "name": "raydiumV2"
          },
          {
            "name": "sarosDlmm",
            "fields": [
              {
                "name": "swapForY",
                "type": "bool"
              }
            ]
          },
          {
            "name": "futarchy",
            "fields": [
              {
                "name": "side",
                "type": {
                  "defined": {
                    "name": "side"
                  }
                }
              }
            ]
          },
          {
            "name": "meteoraDammV2WithRemainingAccounts"
          }
        ]
      }
    },
    {
      "name": "swapEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amm",
            "type": "pubkey"
          },
          {
            "name": "inputMint",
            "type": "pubkey"
          },
          {
            "name": "inputAmount",
            "type": "u64"
          },
          {
            "name": "outputMint",
            "type": "pubkey"
          },
          {
            "name": "outputAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "swapEventV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "inputMint",
            "type": "pubkey"
          },
          {
            "name": "inputAmount",
            "type": "u64"
          },
          {
            "name": "outputMint",
            "type": "pubkey"
          },
          {
            "name": "outputAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "swapsEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "swapEvents",
            "type": {
              "vec": {
                "defined": {
                  "name": "swapEventV2"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "tokenLedger",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenAccount",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
