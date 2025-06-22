"use client"

// Complete course content exactly as uploaded
export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
}

export interface CourseModule {
  id: string
  track: string
  title: string
  objective: string
  lesson: string
  quiz: QuizQuestion[]
  zkCert: string
  skills: string[]
}

export const courseContent: CourseModule[] = [
  // BEGINNER TRACK
  {
    id: "module-1",
    track: "beginner",
    title: "What is Bitcoin?",
    objective: "Understand Bitcoin's creation, economic philosophy, and why it matters.",
    lesson: `Bitcoin was born from a deep dissatisfaction with the legacy financial system, particularly in the wake of the 2008 global financial crisis. At its core, Bitcoin is decentralized digital money—a peer-to-peer electronic cash system proposed by a pseudonymous figure known as Satoshi Nakamoto. Unlike fiat currencies controlled by central banks, Bitcoin operates without a central authority. It is governed by code, consensus, and cryptographic proof, offering global, permissionless access to financial sovereignty.

Bitcoin introduces a fixed supply—capped at 21 million coins—making it inherently deflationary. This contrasts with the inflationary nature of fiat systems. Its open, borderless network allows anyone to store and transfer value securely without censorship. Bitcoin's underlying blockchain technology ensures immutability, transparency, and verifiability of all transactions. Through proof-of-work mining and a decentralized node network, Bitcoin has maintained an unprecedented level of resilience and security for over a decade.`,
    quiz: [
      {
        question: "What is the core problem that Bitcoin was created to solve?",
        options: [
          "The need for a central authority in financial systems",
          "Dissatisfaction with the legacy financial system and lack of financial sovereignty",
          "The desire to create a new form of entertainment",
          "To replace all forms of physical currency",
        ],
        correct: 1,
      },
      {
        question: "How does Bitcoin achieve decentralization?",
        options: [
          "Through government regulation",
          "By using a single powerful server",
          "Through code, consensus, and cryptographic proof with a decentralized node network",
          "By relying on banks to validate transactions",
        ],
        correct: 2,
      },
      {
        question: "What makes Bitcoin a deflationary currency?",
        options: [
          "Its value always decreases over time",
          "It has an unlimited supply",
          "It has a fixed supply capped at 21 million coins",
          "Central banks control its supply",
        ],
        correct: 2,
      },
      {
        question: "What is the role of miners in the Bitcoin ecosystem?",
        options: [
          "They create new Bitcoin rules",
          "They maintain network security through proof-of-work and validate transactions",
          "They control the price of Bitcoin",
          "They decide who can use Bitcoin",
        ],
        correct: 1,
      },
      {
        question: "Why is Bitcoin often compared to 'digital gold'?",
        options: [
          "Because it's yellow in color",
          "Because it's only used for jewelry",
          "Because it has a fixed supply and serves as a store of value",
          "Because it's mined underground",
        ],
        correct: 2,
      },
    ],
    zkCert: "Bitcoin Origins Scholar",
    skills: ["Bitcoin History", "Decentralization", "Digital Scarcity"],
  },
  {
    id: "module-2",
    track: "beginner",
    title: "Wallets & Custody",
    objective: "Learn how wallets work, the types available, and best security practices.",
    lesson: `Bitcoin wallets are applications or devices that allow users to manage their private keys—the cryptographic credentials needed to access and spend Bitcoin. Private keys are what confer ownership; without them, you do not control your funds.

Wallets come in several forms:

1. **Custodial wallets** (e.g., wallets hosted by exchanges like Binance or Coinbase): Easy to use, but the provider controls your keys.

2. **Non-custodial wallets** (e.g., Sparrow, BlueWallet, Electrum): You own your private keys, giving you full control and responsibility.

3. **Hardware wallets** (e.g., Trezor, Ledger): Physical devices designed to securely store keys offline.

4. **Paper wallets & brain wallets**: Less common but highlight the versatility of Bitcoin custody.

A key concept is the seed phrase, a set of 12 or 24 words that can regenerate your wallet. This phrase must be stored securely offline and never shared.`,
    quiz: [
      {
        question: "What is a private key and why is it important?",
        options: [
          "A password for your email account",
          "The cryptographic credential needed to access and spend Bitcoin - it confers ownership",
          "A public address that others can see",
          "A type of Bitcoin wallet",
        ],
        correct: 1,
      },
      {
        question: "What is the difference between a custodial and non-custodial wallet?",
        options: [
          "There is no difference",
          "Custodial wallets are always better",
          "Custodial wallets: provider controls keys (easy but less control), Non-custodial: you control keys (full control and responsibility)",
          "Non-custodial wallets don't work with Bitcoin",
        ],
        correct: 2,
      },
      {
        question: "What are some benefits of using a hardware wallet?",
        options: [
          "They're free to use",
          "They store keys offline securely on a physical device",
          "They automatically trade Bitcoin for you",
          "They don't require any setup",
        ],
        correct: 1,
      },
      {
        question: "What is a seed phrase and what is its purpose?",
        options: [
          "A random collection of words with no meaning",
          "A set of 12 or 24 words that can regenerate your wallet",
          "A password for your computer",
          "A phrase you use to remember Bitcoin prices",
        ],
        correct: 1,
      },
      {
        question: "Why is it dangerous to share your wallet seed phrase?",
        options: [
          "It's not dangerous at all",
          "It might confuse other people",
          "Anyone with your seed phrase can access and control your Bitcoin funds",
          "It will slow down your internet connection",
        ],
        correct: 2,
      },
    ],
    zkCert: "Wallet Guardian",
    skills: ["Private Keys", "Seed Phrases", "Hardware Wallets"],
  },
  {
    id: "module-3",
    track: "beginner",
    title: "Avoiding Scams & Fake Investments",
    objective: "Develop critical thinking to identify and avoid scams in the crypto space.",
    lesson: `With Bitcoin's rise has come a parallel wave of scams, including fake investment platforms, rug pulls, phishing emails, Ponzi schemes, and impersonators. Scammers often promise unrealistic returns, ask for upfront payments, or trick users into revealing private information.

Best practices include:

1. **Never share your seed phrase, passwords, or private keys.**

2. **Verify URLs and official sources before interacting with platforms.**

3. **Use two-factor authentication (2FA).**

4. **Be skeptical of unsolicited messages or giveaways.**

5. **Avoid platforms that don't allow withdrawal or display earnings that seem too good to be true.**`,
    quiz: [
      {
        question: "What is a Ponzi scheme and how does it operate?",
        options: [
          "A legitimate investment strategy",
          "A fraudulent scheme that pays returns to earlier investors using money from new investors",
          "A type of Bitcoin wallet",
          "A government program",
        ],
        correct: 1,
      },
      {
        question: "Why should you never share your seed phrase, even with support?",
        options: [
          "It's considered rude",
          "Anyone with your seed phrase can access and steal your Bitcoin",
          "It will break your wallet",
          "Support teams already know your seed phrase",
        ],
        correct: 1,
      },
      {
        question: "What are red flags in fake Bitcoin investment platforms?",
        options: [
          "They require identity verification",
          "They have customer support",
          "They promise unrealistic returns, don't allow withdrawals, or ask for upfront payments",
          "They charge transaction fees",
        ],
        correct: 2,
      },
      {
        question: "What role does FOMO play in crypto scams?",
        options: [
          "FOMO helps people make better decisions",
          "Fear of Missing Out causes people to make hasty decisions without proper research",
          "FOMO is a type of cryptocurrency",
          "FOMO protects against scams",
        ],
        correct: 1,
      },
      {
        question: "What are three actions you can take to protect yourself online?",
        options: [
          "Share all your information freely",
          "Never use two-factor authentication",
          "Verify URLs, use 2FA, and be skeptical of unsolicited messages",
          "Trust all investment opportunities",
        ],
        correct: 2,
      },
    ],
    zkCert: "Bitcoin Safety Advocate",
    skills: ["Scam Detection", "Security Practices", "Risk Management"],
  },
  {
    id: "module-4",
    track: "beginner",
    title: "Using Bitcoin in Real Life",
    objective: "Understand how Bitcoin transactions work and their real-world applications.",
    lesson: `Bitcoin is not just an asset; it's a functional currency used around the world for:

1. **Remittances**
2. **Online payments**
3. **Micropayments via the Lightning Network**
4. **Savings and hedge against inflation (especially in unstable economies)**

Every Bitcoin transaction is a digital message that gets broadcast to the network. It includes sender/receiver addresses, the amount, and a cryptographic signature proving ownership. Transactions are grouped into blocks, confirmed by miners, and permanently recorded on the blockchain.

Bitcoin addresses can follow different formats:

1. **Legacy (P2PKH): starts with a 1**
2. **SegWit (P2SH): starts with a 3**
3. **Native SegWit (Bech32): starts with bc1**

Transaction fees are paid in satoshis per byte and influence how fast your transaction is confirmed.`,
    quiz: [
      {
        question: "What components make up a Bitcoin transaction?",
        options: [
          "Sender/receiver addresses, the amount, and a cryptographic signature proving ownership",
          "Only the amount and recipient address",
          "Just the sender's wallet balance",
          "The transaction ID and timestamp only",
        ],
        correct: 0,
      },
      {
        question: "How are transactions confirmed on the Bitcoin network?",
        options: [
          "By the sender's wallet automatically",
          "By miners grouping them into blocks and recording them on the blockchain",
          "By the Bitcoin company's servers",
          "By government financial institutions",
        ],
        correct: 1,
      },
      {
        question: "What are the three main address types and how can you distinguish them?",
        options: [
          "All addresses look the same",
          "Legacy (starts with 1), SegWit (starts with 3), Native SegWit (starts with bc1)",
          "Only two types: old and new",
          "They are distinguished by length only",
        ],
        correct: 1,
      },
      {
        question: "What is the role of miners in confirming transactions?",
        options: [
          "They create Bitcoin addresses",
          "They group transactions into blocks and confirm them through mining",
          "They set Bitcoin prices",
          "They decide which transactions are valid based on personal preference",
        ],
        correct: 1,
      },
      {
        question: "What factors influence transaction fees?",
        options: [
          "The color of your wallet",
          "Transaction fees are paid in satoshis per byte and influence confirmation speed",
          "The day of the week",
          "Your location in the world",
        ],
        correct: 1,
      },
    ],
    zkCert: "BTC Explorer",
    skills: ["Transaction Structure", "Address Types", "Fee Estimation"],
  },

  // INTERMEDIATE TRACK
  {
    id: "module-5",
    track: "intermediate",
    title: "UTXOs & Transactions",
    objective:
      "Understand the role of unspent transaction outputs (UTXOs) and how they form the basis of Bitcoin's transaction model.",
    lesson: `Bitcoin does not use account balances like traditional banking systems. Instead, it uses a model based on **Unspent Transaction Outputs** or **UTXOs**. Every Bitcoin transaction consumes existing UTXOs and creates new ones, allowing Bitcoin to operate without a central ledger.

A UTXO represents a chunk of Bitcoin that is available to be spent. When you send BTC, your wallet gathers the necessary UTXOs to cover the amount and creates new UTXOs as outputs—one to the recipient and one back to yourself as "change."

This model enhances privacy (no single balance to track) and security (only valid signatures can spend a UTXO). Each transaction must satisfy the cryptographic condition encoded in the UTXO being spent.

**Key Concepts:**
1. Inputs: UTXOs being spent
2. Outputs: New UTXOs created
3. Each UTXO can only be spent once
4. Transactions must be validly signed to be accepted into a block

UTXOs must also conform to consensus rules such as:
1. Locktime or timelocks
2. Size and fee constraints
3. Dust limits (minimum value thresholds)

Wallet software handles UTXO management automatically, but developers and power users benefit from understanding how UTXOs flow through the system.`,
    quiz: [
      {
        question: "What is a UTXO and why is it important in Bitcoin?",
        options: [
          "A type of Bitcoin wallet",
          "An Unspent Transaction Output that represents a chunk of Bitcoin available to be spent",
          "A Bitcoin mining algorithm",
          "A government regulation for Bitcoin",
        ],
        correct: 1,
      },
      {
        question: "How does Bitcoin differ from account-based models?",
        options: [
          "Bitcoin uses UTXOs instead of account balances, operating without a central ledger",
          "Bitcoin is exactly the same as traditional banking",
          "Bitcoin only works with credit cards",
          "Bitcoin requires government approval for each transaction",
        ],
        correct: 0,
      },
      {
        question: "What happens to the leftover amount when you send BTC?",
        options: [
          "It disappears forever",
          "It goes to the miners",
          "It's returned to you as 'change' in a new UTXO",
          "It's donated to charity automatically",
        ],
        correct: 2,
      },
      {
        question: "What conditions must a transaction meet to spend a UTXO?",
        options: [
          "No conditions are required",
          "It must satisfy the cryptographic condition encoded in the UTXO and be validly signed",
          "It must be approved by a bank",
          "It must wait 24 hours",
        ],
        correct: 1,
      },
      {
        question: "What are potential constraints that can affect UTXO usage?",
        options: [
          "The weather conditions",
          "Locktime/timelocks, size and fee constraints, and dust limits",
          "The user's age",
          "The brand of computer used",
        ],
        correct: 1,
      },
    ],
    zkCert: "Transaction Architect",
    skills: ["UTXO Model", "Transaction Inputs/Outputs", "Cryptographic Conditions"],
  },
  {
    id: "module-6",
    track: "intermediate",
    title: "Lightning Network & Privacy",
    objective: "Understand how Bitcoin can scale and maintain privacy using the Lightning Network.",
    lesson: `The Lightning Network (LN) is a Layer 2 protocol built on top of Bitcoin. It enables fast, low-cost, off-chain transactions by creating payment channels between users. Once a channel is funded with an on-chain transaction, users can send BTC instantly within the channel without touching the blockchain until they close it.

LN solves the scalability problem by removing congestion from the base layer. It also enhances **privacy**: only opening and closing channel transactions are visible on-chain, while intermediate transactions are private.

LN uses HTLCs (Hashed Time-Locked Contracts) to ensure funds are only released when certain conditions are met—providing trustless transactions across multiple hops.

Privacy on Bitcoin itself is limited, as the blockchain is transparent. Tools like CoinJoin, PayJoin, and wallet fingerprinting avoidance help users protect their financial history.`,
    quiz: [
      {
        question: "What problem does the Lightning Network solve?",
        options: [
          "It makes Bitcoin more expensive",
          "It solves Bitcoin's scalability problem by enabling fast, low-cost off-chain transactions",
          "It eliminates the need for private keys",
          "It centralizes Bitcoin control",
        ],
        correct: 1,
      },
      {
        question: "How does a Lightning channel differ from a regular Bitcoin transaction?",
        options: [
          "Lightning channels are slower and more expensive",
          "Lightning channels allow instant transactions within the channel without touching the blockchain until closure",
          "Lightning channels require government approval",
          "There is no difference",
        ],
        correct: 1,
      },
      {
        question: "What does an HTLC do?",
        options: [
          "It's a type of Bitcoin wallet",
          "Hashed Time-Locked Contracts ensure funds are only released when certain conditions are met",
          "It's a government regulation",
          "It slows down transactions",
        ],
        correct: 1,
      },
      {
        question: "Why is Lightning more private than the base layer?",
        options: [
          "It's not more private",
          "Only opening and closing channel transactions are visible on-chain, intermediate transactions are private",
          "It requires more personal information",
          "It's controlled by banks",
        ],
        correct: 1,
      },
      {
        question: "What are two tools that can increase privacy on Bitcoin's main chain?",
        options: [
          "CoinJoin and PayJoin",
          "Credit cards and bank accounts",
          "Government ID and social security numbers",
          "Email and phone verification",
        ],
        correct: 0,
      },
    ],
    zkCert: "Lightning Privacy Adept",
    skills: ["Lightning Network", "Payment Channels", "Privacy Techniques"],
  },
  {
    id: "module-7",
    track: "intermediate",
    title: "Fees, Mempools, and Confirmation Times",
    objective: "Grasp how Bitcoin transactions are prioritized and the economics behind them.",
    lesson: `Bitcoin's transaction fees are market-driven. Users pay miners to include their transactions in a block. These fees are measured in **satoshis per byte**, and higher fees increase your chance of faster inclusion.

The **mempool** is a waiting room for unconfirmed transactions. Each node has its own mempool, holding transactions in order of fee rate. During network congestion, users must pay more to outbid others.

Block space is limited to ~1MB every ~10 minutes. Miners select high-fee transactions to maximize revenue. Once a transaction is included in a block and that block is mined, the transaction gains one confirmation. More confirmations mean more security, especially for large payments.`,
    quiz: [
      {
        question: "What determines how quickly your Bitcoin transaction gets confirmed?",
        options: [
          "The time of day you send it",
          "The transaction fee you pay - higher fees get priority from miners",
          "Your location in the world",
          "The amount of Bitcoin you're sending",
        ],
        correct: 1,
      },
      {
        question: "What is the mempool?",
        options: [
          "A type of Bitcoin wallet",
          "A waiting room for unconfirmed transactions, held by each node in order of fee rate",
          "A government database",
          "A Bitcoin exchange",
        ],
        correct: 1,
      },
      {
        question: "How are Bitcoin transaction fees calculated?",
        options: [
          "As a percentage of the amount sent",
          "In satoshis per byte of transaction data",
          "As a fixed amount regardless of transaction size",
          "Based on your account balance",
        ],
        correct: 1,
      },
      {
        question: "Why are multiple confirmations important?",
        options: [
          "They make transactions faster",
          "More confirmations mean more security, especially for large payments",
          "They reduce transaction fees",
          "They're not important at all",
        ],
        correct: 1,
      },
      {
        question: "What happens during a fee spike?",
        options: [
          "All transactions become free",
          "During network congestion, users must pay higher fees to outbid others for block space",
          "Bitcoin stops working",
          "Transactions become instant",
        ],
        correct: 1,
      },
    ],
    zkCert: "Fee Strategist",
    skills: ["Fee Estimation", "Mempool Analysis", "Transaction Priority"],
  },

  // BUILDER TRACK
  {
    id: "module-8",
    track: "builder",
    title: "Bitcoin Scripts & PSBT",
    objective: "Understand Bitcoin Script and the role of partially signed transactions (PSBT).",
    lesson: `Bitcoin Script is a stack-based, Forth-like language used to define conditions under which a Bitcoin UTXO can be spent. It is not Turing-complete, but powerful enough to support multi-sig, timelocks, and more.

Standard scripts include:

1. **P2PKH** (Pay to Public Key Hash)
2. **P2SH** (Pay to Script Hash)  
3. **P2WSH** (Pay to Witness Script Hash)

**PSBT (Partially Signed Bitcoin Transactions)** allow multiple parties or devices to collaborate on signing a transaction. This is useful for multi-sig wallets and hardware wallets.`,
    quiz: [
      {
        question: "What is Bitcoin Script and why isn't it Turing complete?",
        options: [
          "A programming language that's intentionally limited to prevent infinite loops and ensure predictable execution",
          "A type of Bitcoin wallet",
          "A government regulation",
          "A mining algorithm",
        ],
        correct: 0,
      },
      {
        question: "What are examples of standard Bitcoin scripts?",
        options: [
          "P2PKH, P2SH, and P2WSH",
          "HTML, CSS, and JavaScript",
          "Windows, Mac, and Linux",
          "Visa, Mastercard, and PayPal",
        ],
        correct: 0,
      },
      {
        question: "How does PSBT help with wallet security?",
        options: [
          "It doesn't help with security",
          "Partially Signed Bitcoin Transactions allow multiple parties or devices to collaborate on signing",
          "It makes wallets slower",
          "It requires internet connection",
        ],
        correct: 1,
      },
      {
        question: "What is the benefit of using P2SH or P2WSH?",
        options: [
          "They make transactions free",
          "They allow for more complex spending conditions while keeping addresses shorter",
          "They eliminate the need for private keys",
          "They make Bitcoin centralized",
        ],
        correct: 1,
      },
      {
        question: "Why might you use timelocks in a script?",
        options: [
          "To make transactions faster",
          "To prevent funds from being spent until a certain time or block height",
          "To increase transaction fees",
          "To make Bitcoin more centralized",
        ],
        correct: 1,
      },
    ],
    zkCert: "Bitcoin Script Coder",
    skills: ["Bitcoin Script", "PSBT", "Multi-signature"],
  },
  {
    id: "module-9",
    track: "builder",
    title: "Wallet Development & APIs",
    objective: "Learn how to build a simple Bitcoin wallet and use public APIs.",
    lesson: `A Bitcoin wallet has two core tasks: key management and transaction creation. To build one, developers interact with Bitcoin Core via RPC or use libraries such as \`bitcoinjs-lib\` or \`BDK\` (Bitcoin Dev Kit).

Public APIs (like Blockstream, Mempool.space, ElectrumX) offer access to blockchain data:

1. Check balances
2. Broadcast transactions  
3. Track mempool activity

Building a wallet involves creating keys, tracking UTXOs, forming transactions, and signing. Security must be baked into every layer: input validation, fee estimation, and proper key storage.`,
    quiz: [
      {
        question: "What are the basic components of a Bitcoin wallet?",
        options: [
          "Key management and transaction creation",
          "Only a user interface",
          "Just a database",
          "Only an internet connection",
        ],
        correct: 0,
      },
      {
        question: "Which APIs can you use to check blockchain data?",
        options: [
          "Facebook and Twitter APIs",
          "Blockstream, Mempool.space, and ElectrumX APIs",
          "Google and Amazon APIs",
          "Banking APIs only",
        ],
        correct: 1,
      },
      {
        question: "Why is UTXO management important in a wallet?",
        options: [
          "It's not important",
          "Wallets need to track UTXOs to know available funds and create valid transactions",
          "It makes wallets slower",
          "It's only needed for mining",
        ],
        correct: 1,
      },
      {
        question: "What is the role of a hardware wallet in signing?",
        options: [
          "Hardware wallets store private keys securely offline and sign transactions without exposing keys",
          "They make transactions faster",
          "They eliminate transaction fees",
          "They're not involved in signing",
        ],
        correct: 0,
      },
      {
        question: "What are common pitfalls when building wallets?",
        options: [
          "Making them too secure",
          "Poor key storage, inadequate input validation, and incorrect fee estimation",
          "Making them too fast",
          "Using too many APIs",
        ],
        correct: 1,
      },
    ],
    zkCert: "Wallet Engineer",
    skills: ["Wallet Architecture", "API Integration", "Key Management"],
  },

  // CITREA ZK TRACK
  {
    id: "module-10",
    track: "citrea",
    title: "Intro to ZK Rollups & Citrea",
    objective: "Understand the fundamentals of zk rollups and Citrea's value for Bitcoin scalability.",
    lesson: `ZK Rollups allow batching of many transactions off-chain with a single proof verifying correctness on-chain. Citrea brings zk rollups to Bitcoin by anchoring proofs and data commitments into Bitcoin blocks.

Benefits include:

1. Massive scalability (process 1000s of txs off-chain)
2. Lower fees
3. Privacy via zero-knowledge proofs

Citrea leverages modular architectures and recursive STARKs. It is designed to extend Bitcoin's utility while preserving its decentralization and security ethos.`,
    quiz: [
      {
        question: "What is a zk-rollup?",
        options: [
          "A type of Bitcoin wallet",
          "A scaling solution that batches many transactions off-chain with a single proof verifying correctness on-chain",
          "A mining algorithm",
          "A government regulation",
        ],
        correct: 1,
      },
      {
        question: "How does Citrea use Bitcoin's base layer?",
        options: [
          "It replaces Bitcoin entirely",
          "Citrea anchors proofs and data commitments into Bitcoin blocks",
          "It has no connection to Bitcoin",
          "It only works with other cryptocurrencies",
        ],
        correct: 1,
      },
      {
        question: "What makes Citrea different from Layer 2s like Lightning?",
        options: [
          "Citrea uses zk-rollups for scalability while Lightning uses payment channels",
          "There is no difference",
          "Citrea is slower than Lightning",
          "Citrea doesn't work with Bitcoin",
        ],
        correct: 0,
      },
      {
        question: "What are STARKs?",
        options: [
          "A type of cryptocurrency",
          "Scalable Transparent Arguments of Knowledge - a type of zero-knowledge proof",
          "A Bitcoin mining pool",
          "A government agency",
        ],
        correct: 1,
      },
      {
        question: "What is the role of proofs in zk rollups?",
        options: [
          "They slow down transactions",
          "Proofs verify the correctness of many off-chain transactions with a single on-chain verification",
          "They increase transaction fees",
          "They're not important",
        ],
        correct: 1,
      },
    ],
    zkCert: "ZK Rollup Novice",
    skills: ["ZK Rollups", "STARKs", "Layer 2 Scaling"],
  },
  {
    id: "module-11",
    track: "citrea",
    title: "zkApps, Education Proofs & Micropayments",
    objective: "Learn how to build educational use cases on Citrea.",
    lesson: `Citrea enables smart contract-like capabilities. With zkApps, platforms can:

1. Issue zkProof-based certificates (e.g., "This wallet completed course X" without revealing identity)
2. Design pay-per-lesson models using zkAuth
3. Prove knowledge (e.g., quiz completions) without exposing answers

Micropayments can be powered by Lightning bridges or native stablecoins, enabling frictionless user experience.`,
    quiz: [
      {
        question: "What are zkApps?",
        options: [
          "Regular mobile applications",
          "Zero-knowledge applications that enable privacy-preserving smart contract functionality",
          "A type of Bitcoin wallet",
          "A government program",
        ],
        correct: 1,
      },
      {
        question: "How can a learner prove course completion with zero-knowledge?",
        options: [
          "By sharing all their personal information",
          "By using zkProofs to prove completion without revealing identity or specific answers",
          "By getting government approval",
          "It's not possible",
        ],
        correct: 1,
      },
      {
        question: "How do micropayments work on Citrea?",
        options: [
          "They don't work on Citrea",
          "Through Lightning bridges or native stablecoins for frictionless payments",
          "Only through traditional banks",
          "By mailing cash",
        ],
        correct: 1,
      },
      {
        question: "What are examples of zk use cases in education?",
        options: [
          "Sharing all student data publicly",
          "zkProof-based certificates, pay-per-lesson models, and proving knowledge without exposing answers",
          "Eliminating all privacy",
          "Making education more expensive",
        ],
        correct: 1,
      },
      {
        question: "What is zkAuth?",
        options: [
          "A traditional password system",
          "Zero-knowledge authentication that proves identity or credentials without revealing sensitive information",
          "A type of Bitcoin mining",
          "A government ID system",
        ],
        correct: 1,
      },
    ],
    zkCert: "Citrea Pioneer",
    skills: ["zkApps", "Zero-Knowledge Proofs", "Micropayments"],
  },
]

export const getModuleById = (moduleId: string): CourseModule | undefined => {
  return courseContent.find((module) => module.id === moduleId)
}

export const getModulesByTrack = (track: string): CourseModule[] => {
  return courseContent.filter((module) => module.track === track)
}

export const getAllTracks = () => {
  const tracks = Array.from(new Set(courseContent.map((module) => module.track)))
  return tracks.map((track) => ({
    id: track,
    title: getTrackTitle(track),
    description: getTrackDescription(track),
    modules: getModulesByTrack(track),
  }))
}

const getTrackTitle = (track: string): string => {
  const titles: Record<string, string> = {
    beginner: "Beginner Track",
    intermediate: "Intermediate Track",
    builder: "Builder Track",
    citrea: "Citrea ZK Track",
  }
  return titles[track] || track
}

const getTrackDescription = (track: string): string => {
  const descriptions: Record<string, string> = {
    beginner: "Introduction to Bitcoin: Digital Money for Everyone",
    intermediate: "Deepening Knowledge: Bitcoin's Inner Workings",
    builder: "Building on Bitcoin: Tools for Technical Learners",
    citrea: "Zero Knowledge on Bitcoin: Citrea-Powered Futures",
  }
  return descriptions[track] || ""
}
