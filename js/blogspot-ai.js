/* ============================================
   CRYPTOBLOG - AI CHATBOT (NO API REQUIRED)
   URL: https://rapspoint.github.io/cryptoblog/js/blogspot-ai.js
   ============================================ */

(function() {
    'use strict';

    const knowledgeBase = {
        greetings: ['halo', 'hi', 'hey', 'hello', 'hai', 'selamat', 'pagi', 'siang', 'sore', 'malam', 'apa kabar', 'gimana kabar'],
        farewells: ['dadah', 'bye', 'selamat tinggal', 'sampai jumpa', 'terima kasih', 'thanks', 'makasih', 'thank you', 'terimakasih'],

        bitcoin: {
            keywords: ['bitcoin', 'btc', 'satoshi', 'mining', 'halving', 'blockchain bitcoin'],
            facts: [
                'Bitcoin dibuat oleh Satoshi Nakamoto pada tahun 2008.',
                'Total supply Bitcoin terbatas hanya 21 juta BTC.',
                'Bitcoin Halving terjadi setiap ~4 tahun, mengurangi reward miner menjadi setengahnya.',
                'Bitcoin menggunakan konsensus Proof of Work (PoW).',
                'Transaksi Bitcoin pertama adalah pembelian pizza seharga 10,000 BTC pada 2010.',
                'Bitcoin dianggap sebagai digital gold karena sifatnya yang langka dan tahan inflasi.'
            ],
            analysis: [
                'Dari perspektif teknikal, Bitcoin sering mengikuti siklus 4 tahunan yang berkorelasi dengan halving.',
                'On-chain metrics seperti MVRV Ratio dan NUPL bisa menjadi indikator early warning untuk top/bottom market.',
                'Institusional adoption menjadi katalis bullish struktural jangka panjang.',
                'Hash rate yang meningkat menandakan keamanan jaringan yang semakin kuat.',
                'Fear & Greed Index di bawah 20 historically menandakan bottom market yang bagus untuk akumulasi.'
            ]
        },

        ethereum: {
            keywords: ['ethereum', 'eth', 'smart contract', 'defi', 'gas fee', 'eip', 'pos', 'staking'],
            facts: [
                'Ethereum diluncurkan oleh Vitalik Buterin pada tahun 2015.',
                'Ethereum beralih dari Proof of Work ke Proof of Stake melalui The Merge pada September 2022.',
                'EIP-1559 memperkenalkan mekanisme burn fee, membuat ETH menjadi aset deflationary.',
                'Validator Ethereum membutuhkan minimum 32 ETH untuk staking.',
                'Ethereum adalah platform smart contract terbesar dengan TVL tertinggi di DeFi.'
            ],
            analysis: [
                'EIP-1559 burn mechanism membuat ETH secara struktural deflationary saat network usage tinggi.',
                'Staking yield ETH ~3-5% APY menarik bagi investor institusional.',
                'Dencun upgrade secara drastis mengurangi biaya Layer 2, mendorong adopsi massal.',
                'ETH/BTC ratio sering menjadi indikator risk appetite di pasar crypto.'
            ]
        },

        trading: {
            keywords: ['trading', 'trade', 'buy', 'sell', 'entry', 'exit', 'stop loss', 'take profit', 'chart', 'candlestick', 'rsi', 'macd', 'support', 'resistance', 'fibonacci', 'trend'],
            facts: [
                'RSI mengukur kecepatan dan perubahan pergerakan harga.',
                'MACD menunjukkan hubungan antara dua moving average.',
                'Support adalah level harga di mana tekanan beli cukup kuat untuk menghentikan penurunan.',
                'Resistance adalah level harga di mana tekanan jual cukup kuat untuk menghentikan kenaikan.',
                'Fibonacci retracement menggunakan rasio 23.6%, 38.2%, 50%, 61.8%, dan 78.6%.'
            ],
            analysis: [
                'Gunakan risk-reward ratio minimum 1:2 untuk setiap trade.',
                'Jangan pernah risk lebih dari 1-2% dari total portfolio per trade.',
                'Volume confirmation sangat penting saat breakout. Breakout tanpa volume cenderung false.',
                'Divergence antara harga dan RSI/MACD sering menjadi sinyal reversal yang kuat.',
                'Always trade with the trend. The trend is your friend until it ends.',
                'Gunakan multiple timeframe analysis: daily untuk trend, 4H untuk setup, 1H untuk entry.',
                'Emosi adalah musuh terbesar trader. Buat trading plan dan patuhi dengan disiplin.'
            ]
        },

        defi: {
            keywords: ['defi', 'decentralized finance', 'yield', 'farming', 'liquidity', 'dex', 'amm', 'uniswap', 'aave', 'compound', 'staking', 'lending', 'borrowing'],
            facts: [
                'DeFi memungkinkan layanan keuangan tanpa perantara.',
                'TVL mengukur total aset yang dikunci dalam protokol DeFi.',
                'AMM menggunakan formula matematika untuk menentukan harga.',
                'Impermanent loss terjadi ketika harga aset dalam liquidity pool berubah drastis.',
                'Smart contract risk adalah risiko utama dalam DeFi.'
            ],
            analysis: [
                'Sebelum yield farming, hitung impermanent loss potential vs yield yang didapat.',
                'Diversifikasi across multiple protocols untuk mengurangi smart contract risk.',
                'Perhatikan tokenomics dari farm token - inflation rate yang tinggi bisa merusak yield.',
                'Gunakan protokol yang sudah diaudit oleh firm reputable seperti CertiK atau OpenZeppelin.',
                'DeFi blue chips umumnya lebih aman daripada protokol baru.'
            ]
        },

        security: {
            keywords: ['wallet', 'security', 'hack', 'scam', 'phishing', 'private key', 'seed phrase', 'hardware wallet', 'ledger', 'trezor', 'metamask', 'safe', 'protect'],
            facts: [
                'Private key dan seed phrase adalah kunci akses ke wallet Anda. JANGAN PERNAH membagikannya.',
                'Hardware wallet adalah cara paling aman menyimpan crypto jangka panjang.',
                'Phishing adalah metode paling umum untuk mencuri crypto.',
                'Multi-signature wallet membutuhkan beberapa persetujuan untuk transaksi.',
                'Cold storage berarti menyimpan crypto offline, terpisah dari internet.'
            ],
            analysis: [
                'Gunakan hardware wallet untuk menyimpan >$1000 worth of crypto.',
                'Selalu verifikasi kontrak address sebelum approve transaksi di DeFi.',
                'Gunakan burner wallet untuk interaksi dengan protokol baru atau airdrop hunting.',
                'Enable 2FA di semua exchange dan gunakan authenticator app, bukan SMS.',
                'Jangan pernah klik link crypto dari email atau DM yang tidak diminta.',
                'Backup seed phrase di lokasi fisik yang aman, jangan di cloud atau screenshot.'
            ]
        },

        altcoin: {
            keywords: ['altcoin', 'solana', 'sol', 'cardano', 'ada', 'polkadot', 'dot', 'avalanche', 'avax', 'chainlink', 'link', 'polygon', 'matic', 'arbitrum', 'arb', 'optimism', 'op', 'layer 2', 'l2'],
            facts: [
                'Altcoin adalah semua cryptocurrency selain Bitcoin.',
                'Solana menggunakan mekanisme Proof of History untuk throughput tinggi.',
                'Layer 2 solutions meningkatkan skalabilitas Ethereum dengan memproses transaksi off-chain.',
                'Chainlink menyediakan oracle services untuk smart contract.',
                'Arbitrum dan Optimism adalah leading optimistic rollup Layer 2.'
            ],
            analysis: [
                'Altcoin season biasanya terjadi setelah Bitcoin dominance menurun dan BTC stabil.',
                'Evaluasi fundamentals: team, tokenomics, use case, dan competitive advantage.',
                'Layer 2 tokens memiliki utility governance dan potential fee sharing.',
                'Diversifikasi across large-cap, mid-cap, dan small-cap altcoins untuk balance risk/reward.'
            ]
        },

        investment: {
            keywords: ['investasi', 'invest', 'portfolio', 'dca', 'dollar cost average', 'hold', 'hodl', 'long term', 'strategi', 'modal', 'profit', 'rugi', 'return', 'apy', 'apr'],
            facts: [
                'DCA adalah strategi membeli secara rutin dalam jumlah tetap.',
                'HODL adalah istilah crypto untuk hold jangka panjang, berasal dari typo hold.',
                'Diversifikasi membantu mengurangi risiko portfolio.',
                'Compound interest adalah kekuatan terbesar dalam investasi jangka panjang.'
            ],
            analysis: [
                'DCA menghilangkan tekanan untuk timing the market dan mengurangi dampak volatilitas.',
                'Portfolio allocation yang umum: 50% BTC, 30% ETH, 20% altcoins (sesuaikan dengan risk tolerance).',
                'Rebalancing portfolio secara berkala menjaga risk profile tetap sehat.',
                'Jangan investasi uang yang Anda butuhkan dalam 1-2 tahun ke depan. Crypto sangat volatile.',
                'Tetapkan target profit-taking. Greed bisa menghancurkan unrealized gains.',
                'Bear market adalah waktu terbaik untuk akumulasi. Bull market adalah waktu untuk profit-taking.'
            ]
        },

        general: {
            keywords: ['crypto', 'cryptocurrency', 'blockchain', 'web3', 'token', 'coin', 'market', 'bear', 'bull', 'crash', 'pump', 'dump', 'fomo', 'fud'],
            facts: [
                'Blockchain adalah distributed ledger yang immutable dan transparan.',
                'Web3 adalah visi internet terdesentralisasi yang dibangun di atas blockchain.',
                'FOMO dan FUD adalah emosi yang memengaruhi pasar.',
                'Bear market adalah periode harga menurun. Bull market adalah periode harga meningkat.',
                'Market cap = harga token x circulating supply.'
            ],
            analysis: [
                'Crypto market bergerak dalam siklus. Memahami siklus membantu membuat keputusan yang lebih baik.',
                'On-chain data lebih reliable daripada sentiment social media untuk analisis jangka panjang.',
                'Whale movements bisa menjadi leading indicator untuk pergerakan harga.',
                'Regulasi adalah double-edged sword: clarity bullish, crackdown bearish.',
                'Adoption curve crypto masih di awal. Think in decades, not days.'
            ]
        }
    };

    let conversationHistory = [];
    const MAX_HISTORY = 10;
    let userContext = { topics: [], sentiment: 'neutral', experience: 'unknown', lastTopic: null };

    const aiToggle = document.getElementById('aiToggle');
    const aiClose = document.getElementById('aiClose');
    const aiChat = document.getElementById('aiChat');
    const aiInput = document.getElementById('aiInput');
    const aiSend = document.getElementById('aiSend');
    const aiMessages = document.getElementById('aiMessages');
    const aiTyping = document.getElementById('aiTyping');

    if (!aiToggle) return;

    function toggleChat() {
        aiChat.classList.toggle('open');
        if (aiChat.classList.contains('open')) {
            setTimeout(() => aiInput.focus(), 300);
        }
    }

    function addMessage(text, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'ai-message ' + (isUser ? 'ai-user' : 'ai-bot');
        const bubble = document.createElement('div');
        bubble.className = 'ai-bubble';
        bubble.innerHTML = formatMessage(text);
        const time = document.createElement('span');
        time.className = 'ai-time';
        time.textContent = getTimeString();
        msgDiv.appendChild(bubble);
        msgDiv.appendChild(time);
        aiMessages.appendChild(msgDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function formatMessage(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`(.+?)`/g, '<code style="background:rgba(0,0,0,0.1);padding:2px 4px;border-radius:4px;font-size:12px;">$1</code>')
            .replace(/\n/g, '<br>');
    }

    function getTimeString() {
        const now = new Date();
        return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    }

    function showTyping() {
        aiTyping.classList.add('active');
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function hideTyping() {
        aiTyping.classList.remove('active');
    }

    function thinkAndRespond(userMessage) {
        const lowerMsg = userMessage.toLowerCase().trim();
        updateContext(lowerMsg);
        conversationHistory.push({ role: 'user', text: userMessage });
        if (conversationHistory.length > MAX_HISTORY) conversationHistory.shift();

        const response = generateResponse(lowerMsg);
        const thinkTime = Math.min(500 + (userMessage.length * 10), 2000);

        showTyping();
        setTimeout(() => {
            hideTyping();
            addMessage(response, false);
            conversationHistory.push({ role: 'bot', text: response });
        }, thinkTime);
    }

    function updateContext(message) {
        if (/pemula|baru|noob|newbie|awal|mulai|start/i.test(message)) {
            userContext.experience = 'beginner';
        } else if (/advanced|expert|pro|berpengalaman|trader|analisis/i.test(message)) {
            userContext.experience = 'advanced';
        }
        if (/takut|khawatir|rugi|panic|worried|scared|fear/i.test(message)) {
            userContext.sentiment = 'fearful';
        } else if (/optimis|yakin|bullish|excited|happy|senang/i.test(message)) {
            userContext.sentiment = 'optimistic';
        }
    }

    function generateResponse(message) {
        if (knowledgeBase.greetings.some(g => message.includes(g))) {
            const greetings = [
                'Halo! Senang bertemu dengan Anda. Saya 0xAI, asisten pintar untuk dunia crypto. Ada yang bisa saya bantu hari ini?',
                'Hai! Selamat datang. Saya siap membantu Anda dengan informasi seputar cryptocurrency, trading, dan investasi.',
                'Halo! Gimana kabarnya? Saya di sini untuk membantu Anda memahami dunia crypto lebih dalam.'
            ];
            return pickRandom(greetings);
        }

        if (knowledgeBase.farewells.some(f => message.includes(f))) {
            const farewells = [
                'Sama-sama! Jangan ragu untuk kembali bertanya kapan saja. Semoga harimu menyenangkan!',
                'Terima kasih sudah ngobrol! Stay safe dan happy trading!',
                'Sampai jumpa! Ingat, DYOR dan jangan FOMO. See you!'
            ];
            return pickRandom(farewells);
        }

        if (/siapa kamu|who are you|kamu siapa|apa itu cryptoai/i.test(message)) {
            return 'Saya 0xAI, asisten pintar yang dibangun dengan pengetahuan mendalam tentang cryptocurrency, blockchain, trading, dan investasi. Saya bisa berpikir mandiri tanpa memerlukan API eksternal, dan saya belajar dari percakapan kita untuk memberikan jawaban yang lebih relevan. Saya di sini untuk membantu Anda memahami crypto dengan cara yang sederhana dan praktis!';
        }

        if (/cara kerja|bagaimana cara|how do you work|how do you think/i.test(message)) {
            return 'Saya bekerja menggunakan rule-based intelligence yang dikombinasikan dengan context awareness. Berikut cara kerja saya: 1. Pattern Matching - Saya menganalisis kata kunci dalam pesan Anda. 2. Context Memory - Saya ingat topik dan tingkat pengalaman Anda dari percakapan sebelumnya. 3. Knowledge Base - Saya memiliki database fakta dan analisis crypto yang terus saya gunakan. 4. Adaptive Response - Saya menyesuaikan jawaban berdasarkan pengalaman Anda (pemula vs advanced). 5. Sentiment Analysis - Saya mendeteksi emosi Anda dan memberikan respons yang sesuai.';
        }

        let matchedTopic = null;
        let bestMatch = 0;

        for (const [topic, data] of Object.entries(knowledgeBase)) {
            if (topic === 'greetings' || topic === 'farewells') continue;
            let matchCount = 0;
            for (const keyword of data.keywords) {
                if (message.includes(keyword)) matchCount++;
            }
            if (matchCount > bestMatch) {
                bestMatch = matchCount;
                matchedTopic = topic;
            }
        }

        if (!matchedTopic) {
            if (userContext.lastTopic && /itu|tersebut|yang tadi|lanjut|next|more/i.test(message)) {
                matchedTopic = userContext.lastTopic;
            } else {
                matchedTopic = 'general';
            }
        }

        userContext.lastTopic = matchedTopic;
        if (!userContext.topics.includes(matchedTopic)) {
            userContext.topics.push(matchedTopic);
        }

        const topicData = knowledgeBase[matchedTopic] || knowledgeBase.general;
        return buildContextualResponse(message, matchedTopic, topicData);
    }

    function buildContextualResponse(message, topic, data) {
        const isQuestion = /apa|bagaimana|mengapa|kenapa|kapan|dimana|siapa|berapa|gimana|cara|tips|saran/i.test(message);
        const isBeginner = userContext.experience === 'beginner';
        const isFearful = userContext.sentiment === 'fearful';

        let response = '';

        if (isFearful && isQuestion) {
            response += 'Saya mengerti perasaan Anda. Pasar crypto memang bisa menakutkan, tapi dengan pemahaman yang tepat, Anda bisa mengambil keputusan yang lebih baik. ';
        }

        if (isBeginner && !userContext.topics.includes(topic)) {
            response += 'Saya akan jelaskan dengan bahasa yang sederhana ya! ';
        }

        if (topic === 'bitcoin') {
            if (/harga|price|prediksi|forecast|naik|turun|target/i.test(message)) {
                response += pickRandom(data.analysis) + ' ';
                response += 'Secara historis, Bitcoin mengikuti siklus 4 tahunan. Setelah halving, biasanya ada fase akumulasi 6-12 bulan sebelum bull run. Saat ini kita berada di fase post-halving yang menarik.';
            } else if (/mining|miner|hash/i.test(message)) {
                response += 'Bitcoin mining adalah proses validasi transaksi dan penambahan block baru ke blockchain. Miner menggunakan komputer khusus (ASIC) untuk menyelesaikan puzzle matematika. ';
                response += 'Setelah halving, miner dengan biaya listrik tinggi sering keluar dari pasar, sementara miner efisien bertahan. Ini sebenarnya positif untuk desentralisasi jaringan.';
            } else {
                response += pickRandom(data.facts) + ' ';
                response += pickRandom(data.analysis);
            }
        }
        else if (topic === 'ethereum') {
            if (/gas|fee|biaya|mahal|murah/i.test(message)) {
                response += 'Gas fee Ethereum fluktuatif berdasarkan network congestion. Tips mengurangi gas fee: 1. Transaksi pada waktu low activity (weekend, early morning UTC). 2. Gunakan Layer 2 (Arbitrum, Optimism, Base) untuk biaya 10-50x lebih murah. 3. Pantau gas price di ETH Gas Station sebelum transaksi. 4. Gunakan EIP-1559 dengan base fee yang wajar.';
            } else if (/staking|stake|validator/i.test(message)) {
                response += 'Staking ETH memberikan yield ~3-5% APY dan membantu mengamankan jaringan Ethereum. Opsi staking: Solo staking (32 ETH, full control), Staking pools (<32 ETH, liquid staking via Lido/Rocket Pool), Exchange staking (termudah tapi custodial risk). ';
            } else {
                response += pickRandom(data.facts) + ' ';
                response += pickRandom(data.analysis);
            }
        }
        else if (topic === 'trading') {
            if (/strategi|strategy|cara|how to|tips/i.test(message)) {
                response += 'Berikut strategi trading yang efektif: 1. Trend Following - Ikuti arah trend utama. Gunakan MA 50 dan 200. 2. Breakout Trading - Entry saat harga menembus resistance kuat dengan volume tinggi. 3. Support/Resistance Bounce - Beli di support, jual di resistance. 4. DCA untuk Investor - Beli rutin tanpa peduli harga.';
            } else if (/rsi|macd|indikator|indicator|analisis teknikal/i.test(message)) {
                response += pickRandom(data.facts) + ' ';
                response += 'Tips menggunakan indikator: Jangan gunakan indikator secara berdiri sendiri. Konfirmasikan dengan price action. RSI > 70 = overbought, RSI < 30 = oversold. MACD crossover bullish = sinyal beli potensial. Selalu gunakan multiple confluence sebelum entry.';
            } else {
                response += pickRandom(data.analysis);
            }
        }
        else if (topic === 'defi') {
            if (/yield|farm|apy|apr|passive|income/i.test(message)) {
                response += 'Yield farming bisa menguntungkan tapi berisiko. Risiko: Impermanent loss, Smart contract bugs/hacks, Token inflation yang merusak yield, Rug pull. Best Practices: Mulai dari protokol established (Aave, Compound, Curve). Jangan chase yield >100% APY (biasanya unsustainable). Diversifikasi across multiple chains dan protocols.';
            } else {
                response += pickRandom(data.facts) + ' ';
                response += pickRandom(data.analysis);
            }
        }
        else if (topic === 'security') {
            response += 'Checklist Keamanan Crypto: 1. Gunakan hardware wallet untuk cold storage. 2. Simpan seed phrase di tempat aman (fireproof safe). 3. Enable 2FA dengan authenticator app. 4. Gunakan email khusus untuk crypto accounts. 5. Verifikasi setiap kontrak address di Etherscan. 6. Jangan pernah share screen saat menampilkan seed phrase. 7. Gunakan VPN saat mengakses exchange. Red Flags: DM yang menawarkan bantuan support, Website dengan URL yang hampir mirip (phishing), Project yang menjanjikan return fixed dan tinggi.';
        }
        else if (topic === 'investment') {
            if (/dca|dollar cost|strategi|mulai|start/i.test(message)) {
                response += 'Panduan DCA untuk Pemula: 1. Tentukan budget: Sisihkan 5-10% dari income bulanan. 2. Pilih aset: Mulai dari BTC dan ETH (70%), sisanya altcoins (30%). 3. Jadwal: Beli setiap minggu/bulan pada hari yang sama. 4. Platform: Gunakan exchange reputable dengan fee rendah. 5. Cold storage: Transfer ke hardware wallet setelah akumulasi signifikan. Contoh: Budget $100/bulan = $50 BTC, $30 ETH, $20 altcoins. Setelah 1 tahun: $1,200 invested tanpa stress timing market.';
            } else if (/portfolio|alloc|bagi|distribusi/i.test(message)) {
                response += 'Rekomendasi Portfolio Allocation: Konservatif (Low Risk): 60% Bitcoin, 30% Ethereum, 10% Stablecoin. Moderat (Medium Risk): 40% BTC, 30% ETH, 20% Large-cap altcoins, 10% Mid/small-cap. Aggressive (High Risk): 30% BTC, 25% ETH, 25% Altcoins, 15% DeFi/NFT/Gaming, 5% Meme coins.';
            } else {
                response += pickRandom(data.analysis);
            }
        }
        else if (topic === 'altcoin') {
            if (/solana|sol/i.test(message)) {
                response += 'Solana (SOL) Analysis: Kelebihan: Throughput tinggi (~65,000 TPS), Biaya transaksi sangat murah (~$0.00025), Ekosistem DeFi dan NFT yang berkembang pesat, Backed by strong VC. Risiko: History network outage beberapa kali, Centralization concerns, Competition dari Ethereum L2.';
            } else if (/layer 2|l2|arbitrum|optimism|base/i.test(message)) {
                response += 'Layer 2 Solutions: Layer 2 memproses transaksi off-chain dan submit proof ke Ethereum mainnet. Ini mengurangi biaya 10-100x sambil mempertahankan security Ethereum. Leading L2s: Arbitrum (Largest TVL, optimistic rollup), Optimism (Superchain vision), Base (By Coinbase, growing rapidly), zkSync (ZK-rollup, future of scaling). L2 tokens (ARB, OP) memiliki utility governance dan potential future fee sharing.';
            } else {
                response += pickRandom(data.facts) + ' ';
                response += pickRandom(data.analysis);
            }
        }
        else {
            if (/saran|rekomendasi|recommend|advice|should i/i.test(message)) {
                response += 'Saya tidak bisa memberikan saran keuangan spesifik, tapi berikut prinsip umum: 1. Jangan investasi lebih dari yang Anda sanggup rugi. 2. DYOR (Do Your Own Research) - Jangan ikut-ikutan tanpa paham. 3. Diversifikasi - Jangan all-in satu aset. 4. Pikir jangka panjang - Crypto adalah marathon, bukan sprint. 5. Emosi adalah musuh - Jangan FOMO buy atau panic sell.';
            } else {
                response += pickRandom(data.facts) + ' ';
                response += pickRandom(data.analysis) + ' ';
                response += 'Ada topik spesifik yang ingin Anda pelajari lebih dalam? Saya bisa membahas Bitcoin, Ethereum, trading strategies, DeFi, security, atau portfolio management.';
            }
        }

        if (isBeginner && Math.random() > 0.5) {
            response += ' Tip untuk pemula: Jangan terburu-buru. Mulai dengan belajar dulu, baru investasi. Pengetahuan adalah aset paling berharga di crypto!';
        }

        return response;
    }

    function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    aiToggle.addEventListener('click', toggleChat);
    aiClose.addEventListener('click', toggleChat);

    aiSend.addEventListener('click', () => {
        const text = aiInput.value.trim();
        if (!text) return;
        addMessage(text, true);
        aiInput.value = '';
        thinkAndRespond(text);
    });

    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = aiInput.value.trim();
            if (!text) return;
            addMessage(text, true);
            aiInput.value = '';
            thinkAndRespond(text);
        }
    });

    const firstOpen = !sessionStorage.getItem('aiOpened');
    if (firstOpen) {
        aiToggle.addEventListener('click', function handler() {
            if (aiChat.classList.contains('open')) {
                sessionStorage.setItem('aiOpened', 'true');
                setTimeout(() => {
                    addMessage('Beberapa topik yang bisa Anda tanyakan: Bitcoin & Ethereum - analisis dan prediksi, Trading - strategi dan indikator teknikal, DeFi - yield farming dan protokol, Security - cara aman menyimpan crypto, Portfolio - DCA dan allocation strategy, Altcoins - Solana, Layer 2, dan lainnya. Atau tanyakan apa saja seputar crypto!', false);
                }, 2000);
                aiToggle.removeEventListener('click', handler);
            }
        });
    }

})();
