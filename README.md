# 🎓 Proof of Learn - Bitcoin Education Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/charleyshiks-gmailcoms-projects/v0-use-uploaded-assets)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/AC5047UKBb0)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**Learn Bitcoin. Earn Sats. Get zkCertificates.**

A comprehensive Bitcoin education platform that rewards learning with real Bitcoin and issues verifiable zkCertificates on the Citrea network. Built for the HER DAO Citrea Hackathon.

## 🌟 Features

### 📚 **Interactive Learning**
- **11 Comprehensive Courses** covering Bitcoin fundamentals to advanced topics
- **Interactive Quizzes** with immediate feedback and explanations
- **Progress Tracking** with XP points and learning streaks
- **Skill Mastery System** tracking 9+ unique Bitcoin competencies

### 💰 **Bitcoin Rewards**
- **Earn Real Sats** for completing courses and quizzes
- **Lightning Network Integration** for instant micropayments
- **Wallet Integration** with Alby Wallet support
- **Auto-claim Rewards** with customizable settings

### 🏆 **zkCertificates**
- **Verifiable Credentials** minted on Citrea (Bitcoin L2)
- **Zero-Knowledge Proofs** for privacy-preserving verification
- **IPFS Storage** for decentralized certificate metadata
- **Shareable Certificates** with unique verification links

### 🔐 **Wallet & Security**
- **Multi-wallet Support** (Alby, hardware wallets)
- **Citrea Network Integration** for L2 transactions
- **Bridge Functionality** between Bitcoin and Citrea
- **Secure Key Management** with best practices

### ⚙️ **Advanced Features**
- **Responsive Design** optimized for all devices
- **Dark Theme** with Bitcoin-inspired color scheme
- **Real-time Sync** with Supabase backend
- **Privacy Controls** for profile and progress visibility

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account for database
- Alby Wallet or compatible Bitcoin wallet

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
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Citrea Network
   NEXT_PUBLIC_CITREA_RPC_URL=https://rpc.citrea.xyz
   NEXT_PUBLIC_CITREA_CONTRACT_ADDRESS=your_contract_address

   # Lightning Network (LNbits)
   NEXT_PUBLIC_LNBITS_URL=your_lnbits_instance
   NEXT_PUBLIC_LNBITS_API_KEY=your_api_key
   \`\`\`

4. **Set up the database**
   \`\`\`bash
   # Run the database migration
   npm run db:setup
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
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
│   ├── dashboard.tsx     # Main dashboard
│   ├── course-page.tsx   # Course interface
│   └── wallet-panel.tsx  # Wallet management
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Database client
│   ├── citrea-sdk.ts     # Citrea integration
│   ├── lightning.ts      # Lightning Network
│   └── course-content.ts # Course data
├── hooks/                # Custom React hooks
└── api/                  # API routes
\`\`\`

## 📖 Course Content

### Available Tracks
1. **Beginner Track** (5 courses)
   - Bitcoin Origins & Philosophy
   - Wallets & Custody
   - Security & Scam Prevention
   - Lightning Network Basics
   - Bitcoin Economics

2. **Intermediate Track** (4 courses)
   - Technical Deep Dive
   - Mining & Consensus
   - Privacy & Fungibility
   - DeFi on Bitcoin

3. **Advanced Track** (2 courses)
   - Bitcoin Development
   - Layer 2 Solutions

### Learning Objectives
- Understand Bitcoin's history and philosophy
- Master wallet security and custody practices
- Learn about Lightning Network and scaling
- Explore Bitcoin's economic principles
- Develop technical Bitcoin knowledge

## 🔧 Configuration

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

### Lightning Network
1. Set up LNbits instance or use hosted service
2. Configure wallet and API keys
3. Test payment flows
4. Set up webhook endpoints

## 🎯 Usage

### For Learners
1. **Connect Wallet**: Link your Alby or compatible Bitcoin wallet
2. **Start Learning**: Choose a course track and begin your journey
3. **Take Quizzes**: Test your knowledge and earn sats
4. **Earn Certificates**: Complete courses to mint zkCertificates
5. **Track Progress**: Monitor your XP, streaks, and achievements

### For Educators
1. **Content Management**: Add new courses and quiz questions
2. **Progress Monitoring**: Track learner engagement and completion
3. **Certificate Verification**: Verify issued zkCertificates
4. **Analytics**: View learning analytics and insights

## 🔐 Security

### Best Practices Implemented
- **Private Key Security**: Never store private keys on servers
- **Environment Variables**: Sensitive data in environment variables
- **Input Validation**: All user inputs validated and sanitized
- **Rate Limiting**: API endpoints protected against abuse
- **HTTPS Only**: All communications encrypted
- **Row-Level Security**: Database access controlled by policies

### Wallet Security
- **Hardware Wallet Support**: Integration with Ledger, Trezor
- **Seed Phrase Education**: Teaching proper backup practices
- **Multi-signature Options**: Support for advanced security setups
- **Cold Storage Guidance**: Best practices for long-term storage

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow the existing code style
- Use Prettier for formatting
- Write meaningful commit messages

## 📊 Analytics & Metrics

### Learning Analytics
- Course completion rates
- Quiz performance metrics
- Time spent learning
- Popular content areas
- User engagement patterns

### Bitcoin Metrics
- Sats earned and distributed
- Certificate minting statistics
- Wallet connection rates
- Lightning payment success rates

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with automatic CI/CD

### Manual Deployment
\`\`\`bash
# Build the application
npm run build

# Start production server
npm start
\`\`\`

### Environment Setup
- Production database configuration
- SSL certificate setup
- CDN configuration for assets
- Monitoring and logging setup

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Core learning platform
- ✅ Bitcoin wallet integration
- ✅ zkCertificate minting
- ✅ Lightning Network rewards

### Phase 2 (Q2 2024)
- 🔄 Advanced course content
- 🔄 Social learning features
- 🔄 Mobile app development
- 🔄 Multi-language support

### Phase 3 (Q3 2024)
- 📋 Corporate training modules
- 📋 API for third-party integrations
- 📋 Advanced analytics dashboard
- 📋 Gamification features

### Phase 4 (Q4 2024)
- 📋 AI-powered learning paths
- 📋 VR/AR learning experiences
- 📋 Advanced DeFi integrations
- 📋 Global expansion

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **HER DAO** for organizing the Citrea Hackathon
- **Citrea Team** for the innovative Bitcoin L2 solution
- **Bitcoin Community** for the educational content and inspiration
- **Open Source Contributors** who made this project possible

## 📞 Support

### Community
- **Discord**: [Join our community](https://discord.gg/proof-of-learn)
- **Twitter**: [@ProofOfLearn](https://twitter.com/ProofOfLearn)
- **Telegram**: [Proof of Learn Group](https://t.me/ProofOfLearn)

### Technical Support
- **GitHub Issues**: Report bugs and request features
- **Documentation**: [docs.proofoflearn.com](https://docs.proofoflearn.com)
- **Email**: support@proofoflearn.com

### Educational Resources
- **Bitcoin Whitepaper**: [bitcoin.org/bitcoin.pdf](https://bitcoin.org/bitcoin.pdf)
- **Lightning Network**: [lightning.network](https://lightning.network)
- **Citrea Documentation**: [docs.citrea.xyz](https://docs.citrea.xyz)

---

**Built with ❤️ for the Bitcoin community**

*Learn Bitcoin. Earn Sats. Get Certified.*
