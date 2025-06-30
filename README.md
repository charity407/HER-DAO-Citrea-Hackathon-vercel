# 🎓 Proof of Learn - Bitcoin Education Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/charleyshiks-gmailcoms-projects/v0-use-uploaded-assets)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/AC5047UKBb0)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Dynamic SDK](https://img.shields.io/badge/Dynamic-SDK-purple?style=for-the-badge)](https://dynamic.xyz/)

**Learn Bitcoin. Earn Sats. Get zkCertificates.**

A comprehensive Bitcoin education platform that rewards learning with real Bitcoin and issues verifiable zkCertificates on the Citrea network. Built for the HER DAO Citrea Hackathon with seamless wallet authentication via Dynamic SDK.

## 🌟 Features

### 🔐 **Dynamic Wallet Authentication**
- **Multi-wallet Support** via Dynamic SDK (Xverse, Hiro, Leather, UniSat)
- **Seamless Connection** with automatic session management
- **Secure Authentication** without exposing private keys
- **Onboarding Flow** for new users with guided setup

### 📚 **Interactive Learning**
- **11 Comprehensive Courses** covering Bitcoin fundamentals to advanced topics
- **Interactive Quizzes** with immediate feedback and explanations
- **Progress Tracking** with XP points and learning streaks
- **Skill Mastery System** tracking 9+ unique Bitcoin competencies

### 💰 **Bitcoin Rewards**
- **Earn Real Sats** for completing courses and quizzes
- **Lightning Network Integration** for instant micropayments
- **Wallet Integration** with connected Bitcoin wallets
- **Auto-claim Rewards** with customizable settings

### 🏆 **zkCertificates**
- **Verifiable Credentials** minted on Citrea (Bitcoin L2)
- **Zero-Knowledge Proofs** for privacy-preserving verification
- **IPFS Storage** for decentralized certificate metadata
- **Shareable Certificates** with unique verification links

### ⚙️ **Advanced Features**
- **Responsive Design** optimized for all devices
- **Dark Theme** with Bitcoin-inspired color scheme
- **Real-time Sync** with Supabase backend
- **Privacy Controls** for profile and progress visibility

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Dynamic SDK account for wallet authentication
- Supabase account for database
- Bitcoin wallet (Xverse, Hiro, etc.)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/proof-of-learn.git
   cd proof-of-learn
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

   Configure the following variables:
   \`\`\`env
   # Dynamic SDK Configuration
   NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=your_dynamic_environment_id

   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Citrea Network
   NEXT_PUBLIC_CITREA_RPC_URL=https://rpc.citrea.xyz
   NEXT_PUBLIC_CITREA_CONTRACT_ADDRESS=your_contract_address
   \`\`\`

4. **Set up Dynamic SDK**
   - Create account at [Dynamic.xyz](https://app.dynamic.xyz)
   - Create new project and get Environment ID
   - Configure Bitcoin wallet connectors
   - Add your domain to allowed origins

5. **Set up the database**
   \`\`\`bash
   # Run the database migration
   npm run db:setup
   \`\`\`

6. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Dynamic SDK Integration

### Wallet Authentication Flow

1. **User clicks "Connect Wallet"**
2. **Dynamic widget appears** with supported Bitcoin wallets
3. **User selects wallet** (Xverse, Hiro, Leather, UniSat)
4. **Wallet connection** is established securely
5. **Session created** and user redirected to dashboard
6. **Onboarding modal** shows for new users

### Supported Wallets

- **Xverse** - Bitcoin & Ordinals wallet
- **Hiro** - Stacks & Bitcoin wallet  
- **Leather** - Bitcoin & Stacks wallet
- **UniSat** - Bitcoin & Ordinals wallet

### Usage Example

\`\`\`tsx
import { DynamicWalletAuth, useWalletAuth } from '@/components/dynamic-wallet-auth'

function MyComponent() {
  const { isConnected, walletAddress, walletType } = useWalletAuth()
  
  return (
    <div>
      {isConnected ? (
        <p>Connected: {walletAddress}</p>
      ) : (
        <DynamicWalletAuth 
          onSuccess={(walletUser) => {
            console.log('Wallet connected:', walletUser)
          }}
          redirectToDashboard={true}
        />
      )}
    </div>
  )
}
\`\`\`

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Wallet Auth**: Dynamic SDK for Bitcoin wallets
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Blockchain**: Citrea (Bitcoin L2), Bitcoin Lightning Network
- **Storage**: IPFS for certificate metadata
- **Deployment**: Vercel

### Project Structure
\`\`\`
proof-of-learn/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── courses/           # Course pages
│   ├── wallet/            # Wallet management
│   ├── zkcerts/           # Certificate viewer
│   └── settings/          # User settings
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── dynamic-wallet-auth.tsx  # Wallet authentication
│   ├── dynamic-provider.tsx     # Dynamic SDK provider
│   ├── dashboard.tsx     # Main dashboard
│   └── course-page.tsx   # Course interface
├── lib/                  # Utility libraries
│   ├── dynamic-config.ts # Dynamic SDK configuration
│   ├── supabase.ts       # Database client
│   ├── citrea-sdk.ts     # Citrea integration
│   └── course-content.ts # Course data
└── hooks/                # Custom React hooks
\`\`\`

## 🔧 Configuration

### Dynamic SDK Setup
1. Create account at [Dynamic.xyz](https://app.dynamic.xyz)
2. Create new project for Bitcoin wallets
3. Configure wallet connectors in dashboard
4. Add environment ID to `.env.local`
5. Customize UI theme and branding

### Supabase Setup
1. Create a new Supabase project
2. Run the provided SQL migrations
3. Configure authentication providers
4. Set up row-level security policies

### Citrea Integration
1. Deploy the zkCertificate smart contract
2. Configure the contract address
3. Set up RPC endpoint
4. Test certificate minting

## 🎯 Usage

### For Learners
1. **Connect Wallet**: Use Dynamic widget to connect Bitcoin wallet
2. **Start Learning**: Choose a course track and begin your journey
3. **Take Quizzes**: Test your knowledge and earn sats
4. **Earn Certificates**: Complete courses to mint zkCertificates
5. **Track Progress**: Monitor your XP, streaks, and achievements

### For Developers
1. **Wallet Integration**: Use Dynamic SDK for seamless wallet auth
2. **Session Management**: Automatic session handling and persistence
3. **Event Tracking**: Built-in analytics for wallet connections
4. **Custom Styling**: HER DAO themed UI components

## 🔐 Security

### Wallet Security
- **Private keys never leave wallet** - only public addresses used
- **Secure session management** with automatic timeout
- **No sensitive data storage** on servers
- **Cryptographic verification** for all transactions

### Best Practices Implemented
- **Environment Variables**: Sensitive data in environment variables
- **Input Validation**: All user inputs validated and sanitized
- **Rate Limiting**: API endpoints protected against abuse
- **HTTPS Only**: All communications encrypted
- **Row-Level Security**: Database access controlled by policies

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables including Dynamic SDK
3. Deploy with automatic CI/CD

### Environment Variables
Make sure to set all required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Other configuration as needed
## Web App Link
https://v0-use-uploaded-assets-359yuj654.vercel.app/

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **HER DAO** for organizing the Citrea Hackathon
- **Citrea Team** for the innovative Bitcoin L2 solution
- **Bitcoin Community** for the educational content and inspiration

---

**Built with ❤️ for the Bitcoin community**

*Learn Bitcoin. Earn Sats. Get Certified.*
