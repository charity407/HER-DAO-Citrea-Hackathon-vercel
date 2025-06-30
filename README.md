#  Proof of Learn - Bitcoin Education Platform

**Learn Bitcoin. Earn Sats. Get zkCertificates.**

A modular, open-source Bitcoin education platform that delivers verifiable learning credentials using zkCerts on Citrea and enhances learning with quizzes, indexed progress, and a responsive, inclusive UI. Built for the HER DAO Citrea Hackathon.

---
## WEB APP LINK
https://v0-use-uploaded-assets-359yuj654.vercel.app/

##  Features

###  Interactive Learning

* **Course Tracks**: Beginner, Intermediate, Builder
* **On-Chain Quizzes**: Interactive, auto-graded assessments
* **Progress Tracker**: Dashboards per wallet

###  zkCertificates

* **Verifiable zkCerts**: Proof of learning stored via mock zkProofs
* **Shareable**: QR-code enabled, social media ready

### Rewards System

* **Earned Sats (Mock)**: Learners earn sats and gift others after completing modules

###  Learning Analytics

* **Subquery/Envio Integration**: Tracks user completion stats
* **Indexed zkCerts**: Allows proof without revealing full identity

### Citrea Features Used

* **zkRollup Layer**: Enables scalable and low-cost transactions
* **Smart Contract Deployment**: Mock zkCert contract deployed
* **Citrea Faucet**: Used to fund Core Wallet addresses for testing
* **Citrea RPC**: Interactions routed through Citrea Testnet endpoint

###  HER DAO Inspired Design

* **Responsive UI**: Feminine palette, accessible design
* **Mobile-First**: Optimized for mobile learners

---

##  Quick Start

### Prerequisites

* Node.js 18+
* Supabase account
* Git
* Bitcoin testnet wallet (Xverse, Hiro, or Core Wallet)
* Citrea Faucet access (for funding testnet interactions)

### Installation

```bash
git clone https://github.com/your-username/proof-of-learn.git
cd proof-of-learn
npm install
cp .env.example .env.local
```

### Configure `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_CITREA_RPC_URL=https://rpc.testnet.citrea.xyz
NEXT_PUBLIC_CITREA_CONTRACT_ADDRESS=your_citrea_contract_address
```

### Run the App

```bash
npm run dev
```

Visit `http://localhost:3000`

---

##  Citrea Integration Guide

### 1. Fund Wallet with Citrea Faucet

* Use the **Citrea Faucet** at [https://faucet.testnet.citrea.xyz](https://faucet.testnet.citrea.xyz)
* Paste your **Core Wallet** address to receive test BTC

### 2. Deploy Smart Contract (zkCertificate Logic)

* Use `forge` or `Foundry` to deploy contracts to Citrea Testnet
* Record deployed contract address and update your `.env.local`

### 3. Integrate with zkApp SDK (coming soon)

* Store and verify course completion as zkProof
* Simulate with mock proofs for now

### 4. Read/Write to Citrea

* Use `citrea-sdk.ts` to interact with the deployed smart contract
* Ensure proper gas usage and test data integrity

---

##  Architecture

### Tech Stack

* **Frontend**: Next.js 14, React, TypeScript
* **Backend**: Supabase
* **Styling**: Tailwind CSS, shadcn/ui
* **Blockchain**: Citrea (zk-rollup Bitcoin L2)
* **Data Indexing**: Subquery, Envio
* **Storage**: IPFS for certificates

### Project Structure

```
proof-of-learn/
├── app/
│   ├── dashboard/
│   ├── courses/
│   ├── zkcerts/
│   └── settings/
├── components/
│   ├── ui/
│   ├── quiz-generator.tsx
│   ├── certificate-viewer.tsx
│   └── dashboard.tsx
├── lib/
│   ├── citrea-sdk.ts
│   ├── supabase.ts
│   └── oracles.ts
└── hooks/
```

---

##  Next Steps

### zkCertificates

* Finalize zkProof generation with Citrea zkApp SDK
* Add IPFS hash validation and viewer enhancements
* Enable NFT-style shareable certificates per course

### Indexing & Subgraphs

* Enable Subquery/Envio for quiz completions, cert issuance

### Curriculum Sources

* **Mi Primer Bitcoin** – Use for structured beginner content

### Real-Time BTC Price Feeds

* **Blocksense Oracle** – Fetch live BTC/USD price feeds to show value of earned sats

### UX & Functionality Enhancements

* Progress dashboard filters
* Mobile UX refinements
* Add quiz-to-certificate conversion flow
* Enable course gating by prior completion
* Integrate Lightning payments for sats reward claims (future phase)

---

##  Acknowledgments

* **HER DAO** – for empowering the community
* **Citrea** – for zk-rollup infrastructure and faucet support

---

##  License

MIT

---

**Built with ❤️ for the Bitcoin community**

*Learn Bitcoin. Earn Sats. Get Certified.*

