import type { Plugin } from 'vite'
import { WebSocketServer } from 'ws'
import {
  INITIAL_ACCOUNTS,
  BUILTIN_FACTORS,
  FACTOR_CATEGORIES,
  FACTOR_CATEGORY_LABELS,
  CRYPTO_SYMBOLS,
  CRYPTO_PRICES,
  MOCK_POSITIONS,
  MOCK_ORDERS,
  MOCK_TRADES,
  MOCK_AI_DECISIONS,
  INITIAL_SIGNAL_POOLS,
  INITIAL_SIGNAL_DEFINITIONS,
  INITIAL_SIGNAL_LOGS,
  INITIAL_PROMPT_TEMPLATES,
  INITIAL_PROGRAMS,
  INITIAL_PROGRAM_BINDINGS,
  INITIAL_LOGS,
  generateAssetCurves,
} from '../lib/mockBackend'

export function mockApiPlugin(): Plugin {
  return {
    name: 'mock-api-plugin',
    configureServer(server) {
      // 1. HTTP API middleware for /api/*
      server.middlewares.use((req, res, next) => {
        const urlStr = req.url || ''
        if (!urlStr.startsWith('/api/') && urlStr !== '/api') {
          return next()
        }

        const parsedUrl = new URL(urlStr, 'http://localhost:3000')
        const pathname = parsedUrl.pathname
        const params = parsedUrl.searchParams

        const sendJson = (data: any, statusCode = 200) => {
          res.statusCode = statusCode
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
        }

        // Config
        if (pathname === '/api/config/check-required') {
          return sendJson({ valid: true, missing: [] })
        }
        if (pathname === '/api/config/global-sampling') {
          return sendJson({ enabled: true, depth: 20 })
        }

        // Hyper AI Profile
        if (pathname === '/api/hyper-ai/profile') {
          return sendJson({
            llm_configured: true,
            nickname: 'Hyper AI',
            default_model: 'gemini-2.5-flash',
            enabled_skills: [
              'factor-mining',
              'market-analysis',
              'memory-management',
              'performance-review',
              'program-strategy-setup',
              'prompt-strategy-setup',
              'resource-management',
              'system-health-check',
              'trader-diagnosis',
            ],
          })
        }

        // Crypto
        if (pathname === '/api/crypto/symbols') {
          return sendJson(CRYPTO_SYMBOLS)
        }
        if (pathname === '/api/crypto/popular') {
          return sendJson(CRYPTO_SYMBOLS.slice(0, 5))
        }
        if (pathname.startsWith('/api/crypto/price/')) {
          const sym = decodeURIComponent(pathname.replace('/api/crypto/price/', ''))
          const p = CRYPTO_PRICES[sym] || CRYPTO_PRICES['BTC/USDT']
          return sendJson({ symbol: sym, ...p })
        }
        if (pathname.startsWith('/api/crypto/status/')) {
          const sym = decodeURIComponent(pathname.replace('/api/crypto/status/', ''))
          const p = CRYPTO_PRICES[sym] || CRYPTO_PRICES['BTC/USDT']
          return sendJson({
            symbol: sym,
            price: p.price,
            change_24h: p.change_24h,
            high_24h: p.high_24h,
            low_24h: p.low_24h,
            volume_24h: p.volume_24h,
            open_interest: p.open_interest,
            funding_rate: p.funding_rate,
            market_regime: 'BULLISH_TREND',
            regime_confidence: 0.85,
            cvd_direction: 'BUY_PRESSURE',
          })
        }

        // Accounts
        if (pathname === '/api/accounts' || pathname === '/api/accounts/' || pathname === '/api/account/list') {
          return sendJson(INITIAL_ACCOUNTS)
        }
        if (pathname === '/api/accounts/overview') {
          return sendJson({
            account: INITIAL_ACCOUNTS[0],
            total_assets: 64280.50,
            positions_value: 30070.00,
            portfolio: {
              total_assets: 64280.50,
              positions_value: 30070.00,
            },
          })
        }
        if (pathname.match(/^\/api\/accounts\/\d+\/overview$/)) {
          const match = pathname.match(/^\/api\/accounts\/(\d+)\/overview$/)
          const id = match ? parseInt(match[1]) : 1
          const acc = INITIAL_ACCOUNTS.find(a => a.id === id) || INITIAL_ACCOUNTS[0]
          return sendJson({
            account: acc,
            total_assets: acc.initial_capital * 1.28,
            positions_value: acc.initial_capital * 0.6,
            portfolio: {
              total_assets: acc.initial_capital * 1.28,
              positions_value: acc.initial_capital * 0.6,
            },
          })
        }
        if (pathname === '/api/accounts/mainnet/check') {
          return sendJson({ has_unauthorized: false, accounts: [] })
        }

        // Positions, Orders, Trades, Decisions
        if (pathname.includes('/positions')) {
          return sendJson(MOCK_POSITIONS)
        }
        if (pathname.includes('/orders')) {
          return sendJson(MOCK_ORDERS)
        }
        if (pathname.includes('/trades') || pathname === '/api/arena/trades') {
          return sendJson({
            generated_at: new Date().toISOString(),
            accounts: INITIAL_ACCOUNTS.map(a => ({ account_id: a.id, name: a.name, model: a.model })),
            trades: MOCK_TRADES,
          })
        }
        if (pathname.includes('/ai-decisions') || pathname.includes('/decisions')) {
          return sendJson(MOCK_AI_DECISIONS)
        }

        // Portfolio asset curves
        if (pathname === '/api/portfolio/curve' || pathname === '/api/portfolio/asset-curves' || pathname.includes('asset_curve')) {
          return sendJson(generateAssetCurves())
        }

        // Factors
        if (pathname === '/api/factors/library' || pathname === '/api/factors') {
          return sendJson({
            factors: BUILTIN_FACTORS,
            categories: FACTOR_CATEGORIES,
            category_labels: FACTOR_CATEGORY_LABELS,
          })
        }
        if (pathname === '/api/factors/effectiveness') {
          const sym = params.get('symbol') || 'BTC/USDT'
          const items = BUILTIN_FACTORS.map(f => ({
            name: f.name,
            display_name: f.display_name,
            display_name_zh: f.display_name_zh,
            category: f.category,
            symbol: sym,
            ic: f.ic,
            icir: f.icir,
            win_rate: f.win_rate,
            decay_half_life: f.half_life,
            sample_count: 720,
            t_stat: (f.icir * 2.2).toFixed(2),
          }))
          return sendJson({ items })
        }
        if (pathname === '/api/factors/values') {
          const values = BUILTIN_FACTORS.map(f => ({
            name: f.name,
            value: (Math.random() * 2 - 1).toFixed(4),
            percentile: Math.round(Math.random() * 100),
            signal_strength: Math.random() > 0.6 ? 'STRONG' : 'MODERATE',
          }))
          return sendJson({ values })
        }
        if (pathname === '/api/factors/status') {
          return sendJson({
            last_compute_time: {
              hyperliquid: Date.now() - 1000 * 60 * 15,
              binance: Date.now() - 1000 * 60 * 20,
            },
          })
        }
        if (pathname === '/api/factors/custom') {
          return sendJson({ items: [] })
        }

        // Watchlist
        if (pathname.includes('/watchlist')) {
          return sendJson({ symbols: CRYPTO_SYMBOLS })
        }

        // Signals & Signal Pools
        if (pathname === '/api/signals/definitions' || pathname === '/api/signals/definitions/') {
          return sendJson(INITIAL_SIGNAL_DEFINITIONS)
        }
        if (pathname === '/api/signals/pools' || pathname === '/api/signals/pools/') {
          return sendJson(INITIAL_SIGNAL_POOLS)
        }
        if (pathname.startsWith('/api/signals/logs')) {
          return sendJson({
            logs: INITIAL_SIGNAL_LOGS,
            total: INITIAL_SIGNAL_LOGS.length,
          })
        }
        if (pathname.includes('/wallet-tracking/status') || pathname.includes('/wallet-tracking/runtime')) {
          return sendJson({
            enabled: true,
            status: 'connected',
            tier: 'free',
            synced_addresses: ['0x1234567890abcdef1234567890abcdef12345678'],
            last_connected_at: new Date().toISOString(),
            last_message_at: new Date().toISOString(),
            last_event_at: new Date().toISOString(),
            last_error: null,
            active_wallet_pool_count: 1,
            token_synced_at: new Date().toISOString(),
          })
        }
        if (pathname === '/api/signals' || pathname === '/api/signals/') {
          return sendJson({
            signals: INITIAL_SIGNAL_DEFINITIONS,
            pools: INITIAL_SIGNAL_POOLS,
          })
        }

        // Prompts
        if (pathname === '/api/prompts') {
          return sendJson({
            templates: INITIAL_PROMPT_TEMPLATES,
            bindings: [
              { id: 1, accountId: 1, accountName: 'GPT-5 Alpha', promptTemplateId: 1, promptKey: 'multi-factor-alpha', promptName: 'Multi-Factor Alpha Momentum' },
              { id: 2, accountId: 2, accountName: 'Claude Macro', promptTemplateId: 1, promptKey: 'multi-factor-alpha', promptName: 'Multi-Factor Alpha Momentum' },
            ],
          })
        }

        // Programs
        if (pathname.includes('/programs/bindings')) {
          return sendJson(INITIAL_PROGRAM_BINDINGS)
        }
        if (pathname.includes('/programs/signal-pools')) {
          return sendJson(INITIAL_SIGNAL_POOLS)
        }
        if (pathname.includes('/programs/accounts')) {
          return sendJson(INITIAL_ACCOUNTS.map(a => ({ id: a.id, name: a.name, model: a.model })))
        }
        if (pathname.includes('/programs/test-run')) {
          return sendJson({
            is_valid: true,
            errors: [],
            warnings: [],
            success: true,
            decision: {
              action: 'BUY',
              symbol: 'BTC/USDT',
              size_usd: 1000,
              leverage: 5,
              reason: 'Dual EMA golden cross with volume confirmation'
            }
          })
        }
        if (pathname.includes('/programs/dev-guide')) {
          return sendJson({
            content: '# Program Trader Development Guide\n\nBuild Python strategies targeting Hyperliquid and Binance.\n\n### Strategy Structure\n```python\nclass Strategy:\n    def init(self, context):\n        pass\n    def on_bar(self, context, bar):\n        pass\n```\n'
          })
        }
        if (pathname.includes('/program-executions')) {
          return sendJson([
            {
              id: 1,
              program_id: 1,
              program_name: 'Dual EMA Volume Scalper',
              account_name: 'GPT-5 Alpha',
              exchange: 'hyperliquid',
              action: 'BUY',
              symbol: 'BTC/USDT',
              status: 'SUCCESS',
              executed_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
              market_context: {
                input_data: { price: 68420.0, cvd: 2450000 },
                execution_logs: ['Calculated fast EMA: 68350', 'Calculated slow EMA: 68120', 'Trigger condition met: BUY 0.25 portion']
              },
              decision_json: { action: 'BUY', symbol: 'BTC/USDT', leverage: 5, size_usd: 1250 }
            }
          ])
        }
        if (pathname === '/api/programs' || pathname === '/api/programs/' || pathname.startsWith('/api/programs/')) {
          return sendJson(INITIAL_PROGRAMS)
        }

        // Logs
        if (pathname.includes('/logs') || pathname.includes('/system_log')) {
          return sendJson({ logs: INITIAL_LOGS })
        }

        // Hyper AI Chat
        if (pathname.includes('/hyper-ai/chat') || pathname.includes('/hyper-ai/stream')) {
          return sendJson({
            id: 'chat-' + Date.now(),
            reply: 'Hello! I am **Hyper AI**, your trading coordinator. All 5 trading bots are actively monitoring market flows and factor signals across Hyperliquid and Binance. Type `/market` for regime analysis or `/prompt` to adjust strategy triggers.',
            actions: [],
          })
        }

        // Users exchange config
        if (pathname === '/api/users/exchange-config') {
          return sendJson({
            default_exchange: 'hyperliquid',
            enabled_exchanges: ['hyperliquid', 'binance'],
          })
        }

        // Fallback for any other /api route
        return sendJson({ success: true, message: 'OK', data: {} })
      })

      // 2. WebSocket upgrade handling on server.httpServer
      if (server.httpServer) {
        const wss = new WebSocketServer({ noServer: true })

        server.httpServer.on('upgrade', (request, socket, head) => {
          const pathname = new URL(request.url || '', 'http://localhost:3000').pathname
          if (pathname === '/ws') {
            wss.handleUpgrade(request, socket, head, (ws) => {
              wss.emit('connection', ws, request)
            })
          }
        })

        wss.on('connection', (ws) => {
          ws.on('message', (message) => {
            try {
              const msg = JSON.parse(message.toString())
              if (msg.type === 'bootstrap') {
                ws.send(JSON.stringify({
                  type: 'bootstrap_ok',
                  user: { id: 1, username: msg.username || 'default', email: 'trader@arena.ai', is_active: true },
                  account: INITIAL_ACCOUNTS[0],
                }))
              } else if (msg.type === 'get_snapshot') {
                ws.send(JSON.stringify({
                  type: 'snapshot',
                  trading_mode: msg.trading_mode || 'paper',
                  overview: {
                    account: INITIAL_ACCOUNTS[0],
                    total_assets: 64280.50,
                    positions_value: 30070.00,
                    portfolio: {
                      total_assets: 64280.50,
                      positions_value: 30070.00,
                    },
                  },
                  positions: MOCK_POSITIONS,
                  orders: MOCK_ORDERS,
                  trades: MOCK_TRADES,
                  ai_decisions: MOCK_AI_DECISIONS,
                  all_asset_curves: generateAssetCurves(),
                }))
              } else if (msg.type === 'get_asset_curve') {
                ws.send(JSON.stringify({
                  type: 'asset_curve_update',
                  all_asset_curves: generateAssetCurves(),
                }))
              }
            } catch {
              // ignore
            }
          })
        })
      }
    },
  }
}
