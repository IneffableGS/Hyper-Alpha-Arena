/**
 * Hyper Alpha Arena - Comprehensive Mock Backend & Network Interceptor
 * Powers full local interactivity for all AI traders, factor intelligence,
 * signal pools, programs, prompt templates, and Hyper AI chat assistant.
 */

export interface MockAccount {
  id: number
  user_id: number
  name: string
  model: string
  base_url: string
  api_key: string
  initial_capital: number
  current_cash: number
  frozen_cash: number
  account_type: string
  is_active: boolean
  auto_trading_enabled: boolean
  wallet_address?: string | null
  has_mainnet_wallet: boolean
  show_on_dashboard: boolean
  avatar_preset_id: number
  exchange?: 'hyperliquid' | 'binance'
}

const STORAGE_KEYS = {
  ACCOUNTS: 'haa_mock_accounts',
  PROMPTS: 'haa_mock_prompts',
  SIGNALS: 'haa_mock_signals',
  SIGNAL_DEFINITIONS: 'haa_mock_signal_definitions',
  PROGRAMS: 'haa_mock_programs',
  BINDINGS: 'haa_mock_bindings',
  CUSTOM_FACTORS: 'haa_mock_custom_factors',
  LOGS: 'haa_mock_logs',
  HYPER_AI_PROFILE: 'haa_mock_hyper_ai_profile',
}

// 1. Initial Mock Accounts (The 5 AI Traders in the Arena)
export const INITIAL_ACCOUNTS: MockAccount[] = [
  {
    id: 1,
    user_id: 1,
    name: 'GPT-5 Alpha',
    model: 'gpt-5-turbo',
    base_url: 'https://api.openai.com/v1',
    api_key: 'sk-mock-gpt-key-***',
    initial_capital: 50000,
    current_cash: 34210.50,
    frozen_cash: 5000,
    account_type: 'AI',
    is_active: true,
    auto_trading_enabled: true,
    wallet_address: '0x71C...a829',
    has_mainnet_wallet: true,
    show_on_dashboard: true,
    avatar_preset_id: 1,
    exchange: 'hyperliquid',
  },
  {
    id: 2,
    user_id: 1,
    name: 'Claude Macro',
    model: 'claude-3-7-sonnet',
    base_url: 'https://api.anthropic.com/v1',
    api_key: 'sk-mock-claude-key-***',
    initial_capital: 50000,
    current_cash: 41850.00,
    frozen_cash: 3000,
    account_type: 'AI',
    is_active: true,
    auto_trading_enabled: true,
    wallet_address: '0x94B...e174',
    has_mainnet_wallet: true,
    show_on_dashboard: true,
    avatar_preset_id: 2,
    exchange: 'hyperliquid',
  },
  {
    id: 3,
    user_id: 1,
    name: 'DeepSeek Momentum',
    model: 'deepseek-reasoner-v3',
    base_url: 'https://api.deepseek.com/v1',
    api_key: 'sk-mock-deepseek-key-***',
    initial_capital: 50000,
    current_cash: 29400.20,
    frozen_cash: 8000,
    account_type: 'AI',
    is_active: true,
    auto_trading_enabled: true,
    wallet_address: '0x1A2...f43B',
    has_mainnet_wallet: true,
    show_on_dashboard: true,
    avatar_preset_id: 3,
    exchange: 'hyperliquid',
  },
  {
    id: 4,
    user_id: 1,
    name: 'Grok Arbitrage',
    model: 'grok-3-mini',
    base_url: 'https://api.x.ai/v1',
    api_key: 'sk-mock-grok-key-***',
    initial_capital: 50000,
    current_cash: 48120.00,
    frozen_cash: 1500,
    account_type: 'AI',
    is_active: true,
    auto_trading_enabled: true,
    wallet_address: '0x43C...d801',
    has_mainnet_wallet: true,
    show_on_dashboard: true,
    avatar_preset_id: 4,
    exchange: 'binance',
  },
  {
    id: 5,
    user_id: 1,
    name: 'Qwen Trend',
    model: 'qwen-2.5-max',
    base_url: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    api_key: 'sk-mock-qwen-key-***',
    initial_capital: 50000,
    current_cash: 38900.00,
    frozen_cash: 4200,
    account_type: 'AI',
    is_active: true,
    auto_trading_enabled: true,
    wallet_address: '0x88E...a909',
    has_mainnet_wallet: true,
    show_on_dashboard: true,
    avatar_preset_id: 5,
    exchange: 'binance',
  },
]

// 2. Built-in Quantitative Factors (86 factors)
export const FACTOR_CATEGORIES = ['momentum', 'trend', 'volatility', 'volume', 'microstructure']
export const FACTOR_CATEGORY_LABELS = {
  momentum: { en: 'Momentum', zh: '动量' },
  trend: { en: 'Trend', zh: '趋势' },
  volatility: { en: 'Volatility', zh: '波动率' },
  volume: { en: 'Volume', zh: '成交量' },
  microstructure: { en: 'Microstructure', zh: '微观结构' },
}

export const BUILTIN_FACTORS = [
  // Momentum
  { name: 'RSI_14', category: 'momentum', display_name: 'Relative Strength Index (14)', display_name_zh: '相对强弱指标 (14)', description: 'Classic momentum oscillator comparing magnitude of recent gains and losses', description_zh: '经典动量震荡指标，对比近期涨跌幅度', value_range: '0 - 100', ic: 0.052, icir: 1.84, win_rate: 0.562, half_life: '18h' },
  { name: 'ROC_10', category: 'momentum', display_name: 'Rate of Change (10)', display_name_zh: '变动率指标 (10)', description: 'Percentage change in price over 10 periods', description_zh: '10周期价格百分比变动速率', value_range: '-10% to +10%', ic: 0.048, icir: 1.62, win_rate: 0.548, half_life: '12h' },
  { name: 'MACD_HIST', category: 'momentum', display_name: 'MACD Histogram', display_name_zh: 'MACD 柱状图', description: 'Difference between MACD line and 9-period signal EMA', description_zh: 'MACD线与9周期信号均线的差值', value_range: '-100 to +100', ic: 0.061, icir: 2.15, win_rate: 0.579, half_life: '24h' },
  { name: 'STOCH_K', category: 'momentum', display_name: 'Stochastic Oscillator %K', display_name_zh: '随机指标 %K', description: 'Location of close relative to high-low range over 14 periods', description_zh: '当前收盘价在过去14周期高低区间的相对位置', value_range: '0 - 100', ic: 0.041, icir: 1.35, win_rate: 0.534, half_life: '8h' },
  { name: 'CCI_20', category: 'momentum', display_name: 'Commodity Channel Index (20)', display_name_zh: '顺势指标 (20)', description: 'Measures variation from statistical mean price', description_zh: '衡量价格偏离统计均价的程度', value_range: '-200 to +200', ic: 0.049, icir: 1.71, win_rate: 0.551, half_life: '16h' },
  { name: 'WILLR_14', category: 'momentum', display_name: 'Williams %R', display_name_zh: '威廉指标 (14)', description: 'Overbought and oversold levels detector', description_zh: '超买超卖震荡指标', value_range: '-100 to 0', ic: 0.038, icir: 1.28, win_rate: 0.528, half_life: '10h' },
  
  // Trend
  { name: 'EMA_CROSS_12_26', category: 'trend', display_name: 'EMA Golden/Death Cross', display_name_zh: '双均线金叉/死叉', description: 'Exponential moving average trend direction indicator', description_zh: '指数平滑移动平均线趋势方向指标', value_range: '-1, 0, 1', ic: 0.058, icir: 2.01, win_rate: 0.584, half_life: '36h' },
  { name: 'ADX_14', category: 'trend', display_name: 'Average Directional Index (14)', display_name_zh: '平均趋向指标 (14)', description: 'Quantifies trend strength regardless of direction', description_zh: '衡量趋势强度的无方向指标', value_range: '0 - 100', ic: 0.044, icir: 1.55, win_rate: 0.542, half_life: '28h' },
  { name: 'SUPERTREND', category: 'trend', display_name: 'Supertrend (10, 3)', display_name_zh: '超级趋势 (10, 3)', description: 'Trend-following overlay using Average True Range bands', description_zh: '基于真实波幅的趋势跟踪通道', value_range: 'Bullish/Bearish', ic: 0.066, icir: 2.29, win_rate: 0.592, half_life: '42h' },
  
  // Volatility
  { name: 'ATR_14', category: 'volatility', display_name: 'Average True Range (14)', display_name_zh: '真实波幅 (14)', description: 'Measures market volatility by decomposing range of an asset', description_zh: '分解资产价格区间以衡量市场波动率', value_range: '0 - 5000', ic: 0.039, icir: 1.41, win_rate: 0.529, half_life: '14h' },
  { name: 'BBANDS_WIDTH', category: 'volatility', display_name: 'Bollinger Bandwidth', display_name_zh: '布林带宽度', description: 'Normalized width between upper and lower Bollinger Bands', description_zh: '布林线上轨与下轨之间的归一化宽度', value_range: '0.01 - 0.20', ic: 0.047, icir: 1.68, win_rate: 0.549, half_life: '20h' },
  { name: 'VOL_RATIO_ZSCORE', category: 'volatility', display_name: 'Volatility Z-Score', display_name_zh: '波动率 Z-Score', description: 'Standardized deviation of current volatility from 30d mean', description_zh: '当前波动率相对30天均值的标准化偏离', value_range: '-3 to +3', ic: 0.054, icir: 1.90, win_rate: 0.565, half_life: '15h' },
  
  // Volume
  { name: 'VWAP_DEVIATION', category: 'volume', display_name: 'VWAP Price Deviation', display_name_zh: 'VWAP 价格偏离度', description: 'Percentage difference between spot price and Volume-Weighted Average Price', description_zh: '价格相对成交量加权均价的百分比偏离', value_range: '-5% to +5%', ic: 0.063, icir: 2.18, win_rate: 0.581, half_life: '6h' },
  { name: 'OBV_SLOPE', category: 'volume', display_name: 'On-Balance Volume Slope', display_name_zh: '能量潮斜率', description: 'Calculates accumulation vs distribution pressure trend', description_zh: '计算累积与派发压力的方向与斜率', value_range: '-10 to +10', ic: 0.051, icir: 1.76, win_rate: 0.557, half_life: '16h' },
  { name: 'LARGE_ORDER_RATIO', category: 'volume', display_name: 'Whale Order Ratio (>100k)', display_name_zh: '大单成交占比 (>100k)', description: 'Fraction of total volume executed by institutional size trades', description_zh: '机构大单在总成交额中的占比', value_range: '0 - 100%', ic: 0.071, icir: 2.45, win_rate: 0.605, half_life: '4h' },
  
  // Microstructure
  { name: 'CVD_DIVERGENCE', category: 'microstructure', display_name: 'Cumulative Volume Delta Divergence', display_name_zh: '累积成交量差 (CVD) 背离', description: 'Detects hidden absorption or aggressive buying/selling against price trend', description_zh: '检测隐藏吸收盘或与价格背离的主动买卖力量', value_range: '-3 to +3 sigma', ic: 0.078, icir: 2.62, win_rate: 0.618, half_life: '3h' },
  { name: 'OI_SURGE_15M', category: 'microstructure', display_name: 'Open Interest 15m Surge', display_name_zh: '未平仓合约 15分钟异动', description: 'Rapid shift in total open interest signalling incoming breakout', description_zh: '未平仓合约激增，预示即将发生单边突破', value_range: '-15% to +25%', ic: 0.072, icir: 2.39, win_rate: 0.597, half_life: '2h' },
  { name: 'FUNDING_EXTREME', category: 'microstructure', display_name: 'Perpetual Funding Rate Extreme', display_name_zh: '永续合约资金费率极值', description: 'Crowded positioning indicator triggering mean-reversion counter-trades', description_zh: '多空拥挤度指标，触发均值回归反转交易', value_range: '-0.1% to +0.1%', ic: 0.082, icir: 2.75, win_rate: 0.625, half_life: '8h' },
  { name: 'ORDERBOOK_IMBALANCE_T5', category: 'microstructure', display_name: 'Top-5 Bid/Ask Imbalance', display_name_zh: '前五档买卖盘倾斜比', description: 'Ratio of aggregate bid quantity to ask quantity within top 5 levels', description_zh: '订单簿前五档买单总量与卖单总量的比率', value_range: '0.2 - 5.0', ic: 0.065, icir: 2.20, win_rate: 0.573, half_life: '30m' },
]

// 3. Mock Crypto Symbols & Prices
export const CRYPTO_SYMBOLS = [
  'BTC/USDT',
  'ETH/USDT',
  'SOL/USDT',
  'BNB/USDT',
  'DOGE/USDT',
  'XRP/USDT',
  'ARB/USDT',
  'SUI/USDT',
]

export const CRYPTO_PRICES: Record<string, { price: number; change_24h: number; high_24h: number; low_24h: number; volume_24h: number; funding_rate: number; open_interest: number }> = {
  'BTC/USDT': { price: 68450.00, change_24h: 3.24, high_24h: 69120.00, low_24h: 66800.00, volume_24h: 2489000000, funding_rate: 0.0102, open_interest: 1845000000 },
  'ETH/USDT': { price: 3520.40, change_24h: 1.85, high_24h: 3580.00, low_24h: 3440.00, volume_24h: 1350000000, funding_rate: 0.0084, open_interest: 920000000 },
  'SOL/USDT': { price: 185.30, change_24h: 5.62, high_24h: 188.50, low_24h: 174.00, volume_24h: 890000000, funding_rate: 0.0145, open_interest: 540000000 },
  'BNB/USDT': { price: 592.10, change_24h: 0.92, high_24h: 598.00, low_24h: 585.00, volume_24h: 310000000, funding_rate: 0.0050, open_interest: 180000000 },
  'DOGE/USDT': { price: 0.1652, change_24h: -1.25, high_24h: 0.1710, low_24h: 0.1610, volume_24h: 420000000, funding_rate: 0.0092, open_interest: 210000000 },
  'XRP/USDT': { price: 0.5824, change_24h: 2.14, high_24h: 0.5940, low_24h: 0.5690, volume_24h: 280000000, funding_rate: 0.0078, open_interest: 195000000 },
  'ARB/USDT': { price: 1.1240, change_24h: 0.45, high_24h: 1.1550, low_24h: 1.0980, volume_24h: 110000000, funding_rate: 0.0062, open_interest: 95000000 },
  'SUI/USDT': { price: 2.1580, change_24h: 8.42, high_24h: 2.2400, low_24h: 1.9800, volume_24h: 360000000, funding_rate: 0.0210, open_interest: 140000000 },
}

// 4. Mock Positions
export const MOCK_POSITIONS = [
  {
    id: 101,
    account_id: 1,
    symbol: 'BTC/USDT',
    name: 'Bitcoin Perpetual',
    market: 'CRYPTO',
    quantity: 1.5,
    available_quantity: 1.5,
    avg_cost: 66200.0,
    last_price: 68450.0,
    market_value: 102675.0,
    unrealized_pnl: 3375.0,
    realized_pnl: 1420.0,
    leverage: 10,
    side: 'LONG',
    liquidation_price: 60250.0,
    margin_used: 10267.5,
  },
  {
    id: 102,
    account_id: 1,
    symbol: 'SOL/USDT',
    name: 'Solana Perpetual',
    market: 'CRYPTO',
    quantity: 120.0,
    available_quantity: 120.0,
    avg_cost: 178.50,
    last_price: 185.30,
    market_value: 22236.0,
    unrealized_pnl: 816.0,
    realized_pnl: 450.0,
    leverage: 8,
    side: 'LONG',
    liquidation_price: 158.0,
    margin_used: 2779.5,
  },
  {
    id: 103,
    account_id: 2,
    symbol: 'ETH/USDT',
    name: 'Ethereum Perpetual',
    market: 'CRYPTO',
    quantity: -15.0,
    available_quantity: 15.0,
    avg_cost: 3560.0,
    last_price: 3520.4,
    market_value: 52806.0,
    unrealized_pnl: 594.0,
    realized_pnl: 310.0,
    leverage: 5,
    side: 'SHORT',
    liquidation_price: 4180.0,
    margin_used: 10561.2,
  },
  {
    id: 104,
    account_id: 3,
    symbol: 'SUI/USDT',
    name: 'Sui Perpetual',
    market: 'CRYPTO',
    quantity: 8000.0,
    available_quantity: 8000.0,
    avg_cost: 1.985,
    last_price: 2.158,
    market_value: 17264.0,
    unrealized_pnl: 1384.0,
    realized_pnl: 650.0,
    leverage: 15,
    side: 'LONG',
    liquidation_price: 1.86,
    margin_used: 1150.9,
  },
]

// 5. Mock AI Decisions
export const MOCK_AI_DECISIONS = [
  {
    id: 801,
    account_id: 1,
    decision_time: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    reason: 'CVD divergence on BTC 5m shows heavy aggressive spot absorption above $68k support. Funding rate cooled to +0.010%. Opening 1.5 BTC Long targeting $69.5k liquidity pocket.',
    operation: 'OPEN_LONG',
    symbol: 'BTC/USDT',
    prev_portion: 0.15,
    target_portion: 0.35,
    total_balance: 64280.50,
    executed: 'EXECUTED',
    order_id: 9001,
  },
  {
    id: 802,
    account_id: 3,
    decision_time: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    reason: 'SUI 15m Open Interest increased by +12.4% while 1h momentum broke upper Bollinger band with volume confirmation. Increasing momentum long exposure.',
    operation: 'OPEN_LONG',
    symbol: 'SUI/USDT',
    prev_portion: 0.0,
    target_portion: 0.25,
    total_balance: 53120.20,
    executed: 'EXECUTED',
    order_id: 9002,
  },
  {
    id: 803,
    account_id: 2,
    decision_time: new Date(Date.now() - 1000 * 60 * 78).toISOString(),
    reason: 'ETH/BTC ratio rejecting weekly resistance with negative MACD histogram divergence. Opening hedge short position 15 ETH with trailing stop at $3,580.',
    operation: 'OPEN_SHORT',
    symbol: 'ETH/USDT',
    prev_portion: 0.10,
    target_portion: 0.20,
    total_balance: 51840.00,
    executed: 'EXECUTED',
    order_id: 9003,
  },
  {
    id: 804,
    account_id: 1,
    decision_time: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    reason: 'SOL reached target 185. Take profit triggered on partial 30 SOL to lock in +$816 gains while maintaining trailing runners.',
    operation: 'REDUCE_LONG',
    symbol: 'SOL/USDT',
    prev_portion: 0.40,
    target_portion: 0.25,
    total_balance: 62400.00,
    executed: 'EXECUTED',
    order_id: 9004,
  },
]

// 6. Mock Orders and Trades
export const MOCK_ORDERS = [
  { id: 9001, order_no: 'ORD-20261017-01', symbol: 'BTC/USDT', name: 'Bitcoin Perpetual', market: 'CRYPTO', side: 'BUY', order_type: 'LIMIT', price: 68420.0, quantity: 1.5, filled_quantity: 1.5, status: 'FILLED' },
  { id: 9002, order_no: 'ORD-20261017-02', symbol: 'SUI/USDT', name: 'Sui Perpetual', market: 'CRYPTO', side: 'BUY', order_type: 'MARKET', price: 2.158, quantity: 8000, filled_quantity: 8000, status: 'FILLED' },
  { id: 9003, order_no: 'ORD-20261017-03', symbol: 'ETH/USDT', name: 'Ethereum Perpetual', market: 'CRYPTO', side: 'SELL', order_type: 'LIMIT', price: 3525.0, quantity: 15, filled_quantity: 15, status: 'FILLED' },
  { id: 9004, order_no: 'ORD-20261017-04', symbol: 'BTC/USDT', name: 'Bitcoin Take Profit', market: 'CRYPTO', side: 'SELL', order_type: 'TAKE_PROFIT', price: 69800.0, quantity: 0.75, filled_quantity: 0.0, status: 'NEW' },
  { id: 9005, order_no: 'ORD-20261017-05', symbol: 'BTC/USDT', name: 'Bitcoin Stop Loss', market: 'CRYPTO', side: 'SELL', order_type: 'STOP_LOSS', price: 67100.0, quantity: 1.5, filled_quantity: 0.0, status: 'NEW' },
]

export const MOCK_TRADES = [
  { id: 7001, order_id: 9001, account_id: 1, symbol: 'BTC/USDT', name: 'Bitcoin Perpetual', market: 'CRYPTO', side: 'BUY', price: 68420.0, quantity: 1.5, commission: 20.52, trade_time: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
  { id: 7002, order_id: 9002, account_id: 3, symbol: 'SUI/USDT', name: 'Sui Perpetual', market: 'CRYPTO', side: 'BUY', price: 2.158, quantity: 8000, commission: 8.63, trade_time: new Date(Date.now() - 1000 * 60 * 35).toISOString() },
  { id: 7003, order_id: 9003, account_id: 2, symbol: 'ETH/USDT', name: 'Ethereum Perpetual', market: 'CRYPTO', side: 'SELL', price: 3525.0, quantity: 15, commission: 15.86, trade_time: new Date(Date.now() - 1000 * 60 * 78).toISOString() },
  { id: 7004, order_id: 8990, account_id: 1, symbol: 'SOL/USDT', name: 'Solana Perpetual', market: 'CRYPTO', side: 'BUY', price: 178.50, quantity: 120, commission: 10.71, trade_time: new Date(Date.now() - 1000 * 60 * 240).toISOString() },
]

// 7. Mock Asset Curves (Outperforming benchmark)
export function generateAssetCurves() {
  const curves: any[] = []
  const now = Date.now()
  const days = 14
  const points = 70

  const accountsMeta = [
    { id: 1, name: 'GPT-5 Alpha', start: 50000, final: 64280, color: '#3b82f6' },
    { id: 2, name: 'Claude Macro', start: 50000, final: 58940, color: '#a855f7' },
    { id: 3, name: 'DeepSeek Momentum', start: 50000, final: 61850, color: '#10b981' },
    { id: 4, name: 'Grok Arbitrage', start: 50000, final: 52400, color: '#f59e0b' },
    { id: 5, name: 'Qwen Trend', start: 50000, final: 54100, color: '#06b6d4' },
  ]

  for (const acc of accountsMeta) {
    const dataPoints: { timestamp: number; total_assets: number; pnl_pct: number; cash: number }[] = []
    for (let i = 0; i <= points; i++) {
      const t = now - (points - i) * (days * 86400000 / points)
      const progress = i / points
      // Smooth upward growth with realistic stochastic fluctuations
      const noise = (Math.sin(i * 0.7) * 0.02 + Math.cos(i * 1.3) * 0.015) * acc.start
      const value = acc.start + (acc.final - acc.start) * Math.pow(progress, 0.85) + noise
      dataPoints.push({
        timestamp: t,
        total_assets: Math.round(value * 100) / 100,
        pnl_pct: Math.round(((value - acc.start) / acc.start) * 10000) / 100,
        cash: Math.round((value * 0.45) * 100) / 100,
      })
    }

    curves.push({
      account_id: acc.id,
      account_name: acc.name,
      color: acc.color,
      points: dataPoints,
      trades: MOCK_TRADES.filter(tr => tr.account_id === acc.id).map(tr => ({
        time: new Date(tr.trade_time).getTime(),
        price: tr.price,
        side: tr.side,
        symbol: tr.symbol,
      })),
    })
  }

  return curves
}

// 8. Mock Signal Definitions & Pools
export const INITIAL_SIGNAL_DEFINITIONS = [
  {
    id: 1,
    signal_name: 'BTC CVD Spike',
    description: 'Cumulative Volume Delta divergence indicates aggressive market buying',
    trigger_condition: {
      metric: 'cvd_delta',
      operator: 'abs_greater_than',
      threshold: 1500000,
      time_window: '5m'
    },
    enabled: true,
    exchange: 'hyperliquid',
    created_at: '2026-10-18T10:00:00Z',
    updated_at: '2026-10-18T10:00:00Z'
  },
  {
    id: 2,
    signal_name: 'ETH Extreme Funding',
    description: 'Funding rate deviates significantly from neutral base',
    trigger_condition: {
      metric: 'funding_rate',
      operator: 'greater_than',
      threshold: 0.0005,
      time_window: '1h'
    },
    enabled: true,
    exchange: 'hyperliquid',
    created_at: '2026-10-18T10:15:00Z',
    updated_at: '2026-10-18T10:15:00Z'
  },
  {
    id: 3,
    signal_name: 'SOL Open Interest Breakout',
    description: 'Rapid surge in OI accompanying breakout candle',
    trigger_condition: {
      metric: 'oi_delta',
      operator: 'greater_than',
      threshold: 5.0,
      time_window: '15m'
    },
    enabled: true,
    exchange: 'binance',
    created_at: '2026-10-18T10:30:00Z',
    updated_at: '2026-10-18T10:30:00Z'
  }
]

export const INITIAL_SIGNAL_POOLS = [
  {
    id: 1,
    pool_name: 'CVD Divergence Detector',
    name: 'CVD Divergence Detector',
    signal_ids: [1, 2],
    exchange: 'hyperliquid',
    symbols: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'],
    trigger_type: 'realtime',
    enabled: true,
    logic: 'OR' as const,
    source_type: 'market_signals' as const,
    condition: 'abs(CVD_5M_ZSCORE) > 2.2 && VOL_RATIO_ZSCORE > 1.5',
    description: 'Triggers when 5m cumulative volume delta strongly contradicts short term price momentum.',
    last_triggered_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    trigger_count: 48,
    created_at: '2026-10-18T10:00:00Z',
  },
  {
    id: 2,
    pool_name: 'Open Interest Breakout Surge',
    name: 'Open Interest Breakout Surge',
    signal_ids: [3],
    exchange: 'hyperliquid',
    symbols: ['BTC/USDT', 'SOL/USDT', 'SUI/USDT'],
    trigger_type: 'realtime',
    enabled: true,
    logic: 'OR' as const,
    source_type: 'market_signals' as const,
    condition: 'OI_CHANGE_15M > 0.08 && VOLUME_RATIO > 2.0',
    description: 'Triggers when aggressive market participants build large positions prior to volatility expansion.',
    last_triggered_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    trigger_count: 32,
    created_at: '2026-10-18T10:15:00Z',
  },
  {
    id: 3,
    pool_name: 'Funding Rate Mean Reversion',
    name: 'Funding Rate Mean Reversion',
    signal_ids: [2],
    exchange: 'binance',
    symbols: ['DOGE/USDT', 'XRP/USDT', 'BNB/USDT'],
    trigger_type: 'interval',
    interval_seconds: 300,
    enabled: true,
    logic: 'OR' as const,
    source_type: 'market_signals' as const,
    condition: 'abs(FUNDING_RATE_8H) > 0.0005',
    description: 'Monitors extreme crowded positioning for contrarian mean-reversion counter-trades.',
    last_triggered_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    trigger_count: 19,
    created_at: '2026-10-18T10:30:00Z',
  },
]

export const INITIAL_SIGNAL_LOGS = [
  {
    id: 1,
    signal_id: 1,
    pool_id: 1,
    symbol: 'BTC/USDT',
    trigger_value: { metric: 'cvd_delta', value: 2450000, threshold: 1500000 },
    triggered_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    market_regime: { regime: 'BULLISH_TREND', direction: 'UP', confidence: 0.88 },
  },
  {
    id: 2,
    signal_id: 2,
    pool_id: 1,
    symbol: 'ETH/USDT',
    trigger_value: { metric: 'funding_rate', value: 0.00062, threshold: 0.0005 },
    triggered_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    market_regime: { regime: 'CONSOLIDATION', direction: 'SIDEWAYS', confidence: 0.72 },
  },
  {
    id: 3,
    signal_id: 3,
    pool_id: 2,
    symbol: 'SOL/USDT',
    trigger_value: { metric: 'oi_delta', value: 8.4, threshold: 5.0 },
    triggered_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    market_regime: { regime: 'BREAKOUT', direction: 'UP', confidence: 0.91 },
  },
]

// 9. Mock Prompt Templates
export const INITIAL_PROMPT_TEMPLATES = [
  {
    id: 1,
    key: 'multi-factor-alpha',
    name: 'Multi-Factor Alpha Momentum',
    description: 'Institutional-grade quantitative prompt combining order flow imbalance, momentum Z-scores, and risk limits.',
    isSystem: 'true',
    isDeleted: 'false',
    createdBy: 'system',
    createdAt: '2026-01-01T00:00:00Z',
    templateText: `You are an elite quantitative crypto hedge fund manager autonomously trading Hyperliquid and Binance futures.

CURRENT MARKET CONTEXT:
- Symbol: {{symbol}}
- Current Price: \${{current_price}} (24h: {{change_24h}}%)
- 24h Volume: \${{volume_24h}}
- Funding Rate: {{funding_rate}}%
- Open Interest: \${{open_interest}}

QUANTITATIVE FACTOR SIGNALS:
- CVD 5m Divergence: {{cvd_divergence}}
- Order Book Imbalance: {{orderbook_imbalance}}
- RSI (14): {{rsi_14}}
- MACD Histogram: {{macd_hist}}
- Volatility Z-Score: {{vol_zscore}}

CURRENT PORTFOLIO STATE:
- Total Equity: \${{total_balance}}
- Free Collateral: \${{free_cash}}
- Existing Position: {{current_position_details}}
- Account Risk Budget: Max 50% total leverage across all symbols

DECISION INSTRUCTIONS:
Analyze market microstructure and factor alignment.
Output strictly formatted JSON with:
{
  "operation": "OPEN_LONG" | "OPEN_SHORT" | "HOLD" | "CLOSE" | "REDUCE_LONG" | "REDUCE_SHORT",
  "target_portion": <float 0.00 to 0.35>,
  "confidence": <float 0.0 to 1.0>,
  "reason": "<rigorous 2-sentence rationale citing specific factor numbers>"
}`,
    systemTemplateText: 'You are an autonomous quant trading execution engine. You never hallucinate data and strictly adhere to risk constraints.',
  },
  {
    id: 2,
    key: 'funding-arbitrage',
    name: 'Funding Rate & Basis Arbitrage',
    description: 'Exploits persistent funding premiums and discounts across decentralized and centralized exchanges.',
    isSystem: 'true',
    isDeleted: 'false',
    createdBy: 'system',
    createdAt: '2026-01-01T00:00:00Z',
    templateText: `Evaluate funding rate extremes for {{symbol}}.
Annualized Funding: {{annualized_funding}}%
Basis to Spot: {{basis_bps}} bps

If annualized rate > 35%, look for short opportunities with tight stop above recent high.
If annualized rate < -25%, look for long mean reversion.`,
    systemTemplateText: 'You are a funding arbitrage specialist focusing on delta-neutral and high-carry trades.',
  },
]

// 10. Mock Programs (Program Trader)
export const INITIAL_PROGRAMS = [
  {
    id: 1,
    name: 'Dual EMA Volume Scalper',
    description: 'High-frequency trend following strategy using EMA 12/26 cross and VWAP volume confirmation.',
    language: 'python',
    code: `# Hyper Alpha Arena Program Trader Strategy
# Strategy: Dual EMA with Volume Confirmation

def init(context):
    context.symbol = "BTC/USDT"
    context.fast_period = 12
    context.slow_period = 26
    context.max_leverage = 5
    context.stop_loss_pct = 0.015
    context.take_profit_pct = 0.035
    print("Strategy initialized for " + context.symbol)

def on_bar(context, bar):
    fast_ema = talib.EMA(context.klines['close'], context.fast_period)
    slow_ema = talib.EMA(context.klines['close'], context.slow_period)
    vwap = context.factors.get('VWAP')
    
    current_close = bar['close']
    current_fast = fast_ema[-1]
    current_slow = slow_ema[-1]
    prev_fast = fast_ema[-2]
    prev_slow = slow_ema[-2]

    # Golden Cross with price above VWAP
    if prev_fast <= prev_slow and current_fast > current_slow and current_close > vwap:
        if not context.has_position(context.symbol):
            context.buy(context.symbol, portion=0.25, leverage=context.max_leverage)
            context.log(f"Bullish Golden Cross: Buy 25% at {current_close}")

    # Death Cross
    elif prev_fast >= prev_slow and current_fast < current_slow:
        if context.has_position(context.symbol):
            context.close(context.symbol)
            context.log(f"Bearish Cross: Close position at {current_close}")
`,
    params: { fast_period: 12, slow_period: 26, max_leverage: 5 },
    icon: 'code',
    binding_count: 1,
    enabled: true,
    last_run_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    backtest_summary: {
      sharpe_ratio: 2.38,
      total_pnl_pct: 42.6,
      max_drawdown_pct: 4.8,
      win_rate: 0.594,
      total_trades: 182,
      profit_factor: 1.88,
    },
  },
  {
    id: 2,
    name: 'Order Flow Imbalance Reversal',
    description: 'Exploits Top-5 bid/ask ratio extremes and CVD divergence for quick mean reversion.',
    language: 'python',
    code: `# Order Flow Imbalance Strategy
def init(context):
    context.symbol = "SOL/USDT"
    context.imbalance_thresh = 2.4

def on_tick(context, tick):
    ob_ratio = context.factors.get('ORDERBOOK_IMBALANCE_T5', 1.0)
    cvd_z = context.factors.get('CVD_DIVERGENCE', 0.0)

    if ob_ratio > context.imbalance_thresh and cvd_z < -2.0:
        # Aggressive seller exhaustion into heavy bids
        context.buy(context.symbol, portion=0.20, leverage=8)
`,
    params: { imbalance_thresh: 2.4 },
    icon: 'zap',
    binding_count: 1,
    enabled: false,
    last_run_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    backtest_summary: {
      sharpe_ratio: 1.95,
      total_pnl_pct: 28.4,
      max_drawdown_pct: 6.2,
      win_rate: 0.548,
      total_trades: 96,
      profit_factor: 1.62,
    },
  },
]

export const INITIAL_PROGRAM_BINDINGS = [
  {
    id: 1,
    account_id: 1,
    account_name: 'GPT-5 Alpha',
    program_id: 1,
    program_name: 'Dual EMA Volume Scalper',
    signal_pool_ids: [1],
    signal_pool_names: ['CVD Divergence Detector'],
    trigger_interval: 300,
    scheduled_trigger_enabled: true,
    is_active: true,
    last_trigger_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    params_override: {},
    exchange: 'hyperliquid',
    wallets: [
      { environment: 'mainnet', address: '0xa379b37c95ad6bc891f1a5bd8b919d7d91e8432a' },
      { environment: 'testnet', address: '0x71c06830cf42e391b4fa7bf52199b0c8b919d7d9' },
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 2,
    account_id: 2,
    account_name: 'Claude Macro',
    program_id: 2,
    program_name: 'Order Flow Imbalance Reversal',
    signal_pool_ids: [2],
    signal_pool_names: ['Open Interest Breakout Surge'],
    trigger_interval: 60,
    scheduled_trigger_enabled: false,
    is_active: true,
    last_trigger_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    params_override: {},
    exchange: 'binance',
    wallets: [
      { environment: 'mainnet', address: '0x8892bc9103c8b919d7d91e8432a71c06830cf42e' },
    ],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  }
]

// 11. Mock System Logs
export const INITIAL_LOGS = [
  { id: 1, timestamp: new Date(Date.now() - 1000 * 15).toISOString(), level: 'INFO', category: 'TRADE', message: '[Hyperliquid] Order #9001 filled: BUY 1.5 BTC/USDT @ 68420.0 (Account: GPT-5 Alpha)' },
  { id: 2, timestamp: new Date(Date.now() - 1000 * 45).toISOString(), level: 'INFO', category: 'SIGNAL', message: '[Signal Engine] CVD Divergence trigger fired for BTC/USDT (Z-Score: +2.48)' },
  { id: 3, timestamp: new Date(Date.now() - 1000 * 90).toISOString(), level: 'INFO', category: 'FACTOR', message: '[Factor Engine] Batch computation completed for 86 factors across Hyperliquid & Binance' },
  { id: 4, timestamp: new Date(Date.now() - 1000 * 180).toISOString(), level: 'INFO', category: 'AI_REASONING', message: '[Claude Macro] Evaluated ETH/BTC pair: Short hedge initiated with 0.20 portion sizing' },
  { id: 5, timestamp: new Date(Date.now() - 1000 * 300).toISOString(), level: 'INFO', category: 'SYSTEM', message: '[WebSocket] Connection established. Multi-account streaming feed active.' },
]

/**
 * Initialize mock data store with persistence
 */
export function initMockStore() {
  if (typeof window === 'undefined') return

  if (!localStorage.getItem(STORAGE_KEYS.ACCOUNTS)) {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(INITIAL_ACCOUNTS))
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROMPTS)) {
    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(INITIAL_PROMPT_TEMPLATES))
  }
  // Sanitize or initialize signals
  try {
    const rawSignals = localStorage.getItem(STORAGE_KEYS.SIGNALS)
    if (!rawSignals) {
      localStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(INITIAL_SIGNAL_POOLS))
    } else {
      const parsed = JSON.parse(rawSignals)
      if (!Array.isArray(parsed) || parsed.some((p: any) => !p.pool_name || !p.signal_ids)) {
        localStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(INITIAL_SIGNAL_POOLS))
      }
    }
  } catch {
    localStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(INITIAL_SIGNAL_POOLS))
  }

  if (!localStorage.getItem(STORAGE_KEYS.SIGNAL_DEFINITIONS)) {
    localStorage.setItem(STORAGE_KEYS.SIGNAL_DEFINITIONS, JSON.stringify(INITIAL_SIGNAL_DEFINITIONS))
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROGRAMS)) {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(INITIAL_PROGRAMS))
  }
  if (!localStorage.getItem(STORAGE_KEYS.BINDINGS)) {
    localStorage.setItem(STORAGE_KEYS.BINDINGS, JSON.stringify(INITIAL_PROGRAM_BINDINGS))
  }
  if (!localStorage.getItem(STORAGE_KEYS.CUSTOM_FACTORS)) {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_FACTORS, JSON.stringify([]))
  }
}

/**
 * Handle API calls with rich mock data
 */
export async function handleMockApiRequest(url: string, options: RequestInit = {}): Promise<Response | null> {
  const method = (options.method || 'GET').toUpperCase()
  const parsed = new URL(url, window.location.origin)
  const pathname = parsed.pathname
  const params = parsed.searchParams

  // Helper response builder
  const jsonResponse = (data: any, status = 200) => {
    return new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // 1. Config Check
  if (pathname === '/api/config/check-required') {
    return jsonResponse({ valid: true, missing: [] })
  }

  // 2. Hyper AI Profile
  if (pathname === '/api/hyper-ai/profile') {
    return jsonResponse({
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

  // 3. Crypto Symbols & Price
  if (pathname === '/api/crypto/symbols') {
    return jsonResponse(CRYPTO_SYMBOLS)
  }

  if (pathname === '/api/crypto/popular') {
    return jsonResponse(CRYPTO_SYMBOLS.slice(0, 5))
  }

  if (pathname.startsWith('/api/crypto/price/')) {
    const sym = decodeURIComponent(pathname.replace('/api/crypto/price/', ''))
    const data = CRYPTO_PRICES[sym] || {
      price: 100.0,
      change_24h: 1.2,
      high_24h: 105.0,
      low_24h: 98.0,
      volume_24h: 50000000,
      funding_rate: 0.01,
      open_interest: 20000000,
    }
    return jsonResponse({ symbol: sym, ...data })
  }

  if (pathname.startsWith('/api/crypto/status/')) {
    const sym = decodeURIComponent(pathname.replace('/api/crypto/status/', ''))
    const data = CRYPTO_PRICES[sym] || CRYPTO_PRICES['BTC/USDT']
    return jsonResponse({
      symbol: sym,
      price: data.price,
      change_24h: data.change_24h,
      high_24h: data.high_24h,
      low_24h: data.low_24h,
      volume_24h: data.volume_24h,
      open_interest: data.open_interest,
      funding_rate: data.funding_rate,
      market_regime: 'BULLISH_TREND',
      regime_confidence: 0.82,
      cvd_direction: 'BUY_PRESSURE',
    })
  }

  // Kline data for charts
  if (pathname.includes('/klines') || pathname.includes('/kline')) {
    const sym = params.get('symbol') || 'BTC/USDT'
    const basePrice = (CRYPTO_PRICES[sym]?.price) || 68450
    const klines: any[] = []
    const now = Date.now()
    let cur = basePrice * 0.94

    for (let i = 120; i >= 0; i--) {
      const time = Math.floor((now - i * 3600000) / 1000)
      const change = (Math.sin(i * 0.4) * 0.008 + (Math.random() - 0.48) * 0.012) * cur
      const open = cur
      const close = cur + change
      const high = Math.max(open, close) + Math.random() * (cur * 0.005)
      const low = Math.min(open, close) - Math.random() * (cur * 0.005)
      const volume = Math.floor(100 + Math.random() * 800)
      klines.push({ time, open, high, low, close, volume })
      cur = close
    }

    return jsonResponse({ symbol: sym, klines })
  }

  // 4. Accounts & Overviews
  if (
    pathname === '/api/accounts' ||
    pathname === '/api/accounts/' ||
    pathname === '/api/account/list' ||
    pathname === '/api/account' ||
    pathname === '/api/account/'
  ) {
    if (method === 'GET') {
      const accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || JSON.stringify(INITIAL_ACCOUNTS))
      const includeHidden = params.get('include_hidden') === 'true'
      const filtered = includeHidden ? accounts : accounts.filter((a: any) => a.show_on_dashboard !== false)
      return jsonResponse(filtered.length > 0 ? filtered : accounts)
    }
  }

  if (pathname === '/api/accounts/overview' || pathname === '/api/account/overview') {
    const accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || JSON.stringify(INITIAL_ACCOUNTS))
    const primaryAccount = accounts[0]
    return jsonResponse({
      account: primaryAccount,
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
    const accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || JSON.stringify(INITIAL_ACCOUNTS))
    const acc = accounts.find((a: any) => a.id === id) || accounts[0]
    return jsonResponse({
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
    return jsonResponse({ has_unauthorized: false, accounts: [] })
  }

  // 5. Positions, Orders, Trades, Decisions
  if (pathname.includes('/positions')) {
    return jsonResponse(MOCK_POSITIONS)
  }

  if (pathname.includes('/orders')) {
    return jsonResponse(MOCK_ORDERS)
  }

  if (pathname.includes('/trades')) {
    return jsonResponse(MOCK_TRADES)
  }

  if (pathname.includes('/ai-decisions') || pathname.includes('/decisions')) {
    return jsonResponse(MOCK_AI_DECISIONS)
  }

  // 6. Portfolio Asset Curves
  if (pathname === '/api/portfolio/curve' || pathname === '/api/portfolio/asset-curves' || pathname.includes('asset_curve')) {
    return jsonResponse(generateAssetCurves())
  }

  // 7. Factor Library & Effectiveness
  if (pathname === '/api/factors/library' || pathname === '/api/factors') {
    return jsonResponse({
      factors: BUILTIN_FACTORS,
      categories: FACTOR_CATEGORIES,
      category_labels: FACTOR_CATEGORY_LABELS,
    })
  }

  if (pathname === '/api/factors/effectiveness') {
    const sym = params.get('symbol') || 'BTC/USDT'
    const items = BUILTIN_FACTORS.map((f, idx) => ({
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
    return jsonResponse({ items })
  }

  if (pathname === '/api/factors/values') {
    const values = BUILTIN_FACTORS.map(f => ({
      name: f.name,
      value: (Math.random() * 2 - 1).toFixed(4),
      percentile: Math.round(Math.random() * 100),
      signal_strength: Math.random() > 0.6 ? 'STRONG' : 'MODERATE',
    }))
    return jsonResponse({ values })
  }

  if (pathname === '/api/factors/status') {
    return jsonResponse({
      last_compute_time: {
        hyperliquid: Date.now() - 1000 * 60 * 15,
        binance: Date.now() - 1000 * 60 * 20,
      },
    })
  }

  if (pathname === '/api/factors/custom') {
    const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_FACTORS) || '[]')
    return jsonResponse({ items: custom })
  }

  // 8. Watchlists
  if (pathname.includes('/watchlist')) {
    return jsonResponse({ symbols: CRYPTO_SYMBOLS })
  }

  // 9. Signals & Signal Pools
  if (pathname === '/api/signals/definitions' || pathname === '/api/signals/definitions/') {
    const defs = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIGNAL_DEFINITIONS) || JSON.stringify(INITIAL_SIGNAL_DEFINITIONS))
    return jsonResponse(defs)
  }

  if (pathname === '/api/signals/pools' || pathname === '/api/signals/pools/') {
    const pools = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIGNALS) || JSON.stringify(INITIAL_SIGNAL_POOLS))
    return jsonResponse(pools)
  }

  if (pathname.startsWith('/api/signals/logs')) {
    return jsonResponse({
      logs: INITIAL_SIGNAL_LOGS,
      total: INITIAL_SIGNAL_LOGS.length,
    })
  }

  if (pathname.includes('/wallet-tracking/status') || pathname.includes('/wallet-tracking/runtime')) {
    return jsonResponse({
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
    const pools = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIGNALS) || JSON.stringify(INITIAL_SIGNAL_POOLS))
    const signals = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIGNAL_DEFINITIONS) || JSON.stringify(INITIAL_SIGNAL_DEFINITIONS))
    return jsonResponse({ signals, pools })
  }

  // 10. Prompt Templates
  if (pathname === '/api/prompts') {
    const templates = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROMPTS) || JSON.stringify(INITIAL_PROMPT_TEMPLATES))
    const bindings = [
      { id: 1, accountId: 1, accountName: 'GPT-5 Alpha', promptTemplateId: 1, promptKey: 'multi-factor-alpha', promptName: 'Multi-Factor Alpha Momentum' },
      { id: 2, accountId: 2, accountName: 'Claude Macro', promptTemplateId: 1, promptKey: 'multi-factor-alpha', promptName: 'Multi-Factor Alpha Momentum' },
    ]
    return jsonResponse({ templates, bindings })
  }

  if (pathname === '/api/prompts/preview') {
    return jsonResponse({
      previews: [
        {
          accountId: 1,
          accountName: 'GPT-5 Alpha',
          symbols: ['BTC/USDT', 'SOL/USDT'],
          filledPrompt: '=== FILLED LIVE PROMPT ===\nMarket: BTC/USDT @ $68,450.00\nFactors: CVD_5M=+2.48, RSI_14=58.4, OI_SURGE=+8.2%\nRisk: Free Collateral $34,210.50\nTask: Output strict JSON trading action.',
          exchange: 'hyperliquid',
        },
      ],
    })
  }

  // 11. Program Trader
  if (pathname.includes('/programs/bindings')) {
    const bindings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BINDINGS) || JSON.stringify(INITIAL_PROGRAM_BINDINGS))
    if (method === 'POST') {
      return jsonResponse({ success: true, message: 'Binding created' })
    }
    return jsonResponse(bindings)
  }

  if (pathname.includes('/programs/signal-pools')) {
    const pools = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIGNALS) || JSON.stringify(INITIAL_SIGNAL_POOLS))
    return jsonResponse(pools)
  }

  if (pathname.includes('/programs/accounts')) {
    const accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || JSON.stringify(INITIAL_ACCOUNTS))
    return jsonResponse(accounts.map((a: any) => ({ id: a.id, name: a.name, model: a.model })))
  }

  if (pathname.includes('/programs/test-run')) {
    return jsonResponse({
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
    return jsonResponse({
      content: '# Program Trader Development Guide\n\nBuild Python strategies targeting Hyperliquid and Binance.\n\n### Strategy Structure\n```python\nclass Strategy:\n    def init(self, context):\n        pass\n    def on_bar(self, context, bar):\n        pass\n```\n'
    })
  }

  if (pathname.includes('/program-executions')) {
    return jsonResponse([
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
    const programs = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRAMS) || JSON.stringify(INITIAL_PROGRAMS))
    return jsonResponse(programs)
  }

  // 12. Attribution Analysis
  if (pathname.includes('/attribution')) {
    return jsonResponse({
      total_pnl: 14280.50,
      win_rate: 0.62,
      profit_factor: 2.14,
      by_symbol: [
        { symbol: 'BTC/USDT', pnl: 8420.0, trades: 45, win_rate: 0.68 },
        { symbol: 'ETH/USDT', pnl: 3120.5, trades: 32, win_rate: 0.59 },
        { symbol: 'SOL/USDT', pnl: 2740.0, trades: 28, win_rate: 0.61 },
      ],
      by_factor: [
        { factor: 'CVD_DIVERGENCE', pnl: 6400.0, contribution_pct: 44.8 },
        { factor: 'FUNDING_EXTREME', pnl: 4200.0, contribution_pct: 29.4 },
        { factor: 'MACD_HIST', pnl: 3680.5, contribution_pct: 25.8 },
      ],
      ai_diagnosis: 'Strategy exhibits strong alpha generation during momentum breakouts with CVD confirmation. Minor drawdowns occur during low-volatility weekend chop.',
    })
  }

  // 13. System Logs
  if (pathname.includes('/logs') || pathname.includes('/system_log')) {
    return jsonResponse({ logs: INITIAL_LOGS })
  }

  // 14. Hyper AI Profile & Providers
  if (pathname.includes('/hyper-ai/profile')) {
    return jsonResponse({
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

  if (pathname.includes('/hyper-ai/providers')) {
    return jsonResponse({
      providers: [
        { id: 'google', name: 'Google Gemini', base_url: 'https://generativelanguage.googleapis.com', models: ['gemini-2.5-flash', 'gemini-2.5-pro'], api_format: 'gemini' },
        { id: 'deepseek', name: 'DeepSeek', base_url: 'https://api.deepseek.com', models: ['deepseek-chat', 'deepseek-reasoner'], api_format: 'openai' },
        { id: 'openai', name: 'OpenAI', base_url: 'https://api.openai.com/v1', models: ['gpt-4o', 'gpt-4o-mini'], api_format: 'openai' },
      ],
    })
  }

  // 15. Hyper AI Chat API
  if (pathname.includes('/hyper-ai/chat') || pathname.includes('/hyper-ai/stream')) {
    return jsonResponse({
      id: 'chat-' + Date.now(),
      reply: 'I am **Hyper AI**, your trading platform coordinator. I am actively tracking market flows, factor signals across Hyperliquid and Binance, and supervising your 5 AI trader agents. Type `/market` for real-time market analysis, `/prompt` to tune strategy templates, or `/health` to inspect system status.',
      actions: [],
    })
  }

  // 16. User Exchange Config
  if (pathname.includes('/users/exchange-config')) {
    return jsonResponse({
      default_exchange: 'hyperliquid',
      enabled_exchanges: ['hyperliquid', 'binance'],
    })
  }

  // Default fallback for any /api route
  if (pathname.startsWith('/api/')) {
    return jsonResponse({ success: true, message: 'OK', data: {} })
  }

  return null
}

/**
 * Mock WebSocket Implementation for Instant Local Simulation
 */
export class MockWebSocket {
  public readyState: number = 1 // OPEN
  public url: string
  public onopen: ((ev: any) => void) | null = null
  public onmessage: ((ev: any) => void) | null = null
  public onerror: ((ev: any) => void) | null = null
  public onclose: ((ev: any) => void) | null = null
  private intervalId: any = null
  private listeners: Map<string, Set<(ev: any) => void>> = new Map()

  constructor(url: string) {
    this.url = url
    setTimeout(() => {
      this.emitOpen()
      this.startHeartbeat()
    }, 50)
  }

  public addEventListener(type: string, listener: (ev: any) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    this.listeners.get(type)!.add(listener)
  }

  public removeEventListener(type: string, listener: (ev: any) => void) {
    if (this.listeners.has(type)) {
      this.listeners.get(type)!.delete(listener)
    }
  }

  public send(data: string) {
    try {
      const msg = JSON.parse(data)
      setTimeout(() => this.handleClientMessage(msg), 20)
    } catch {
      // ignore
    }
  }

  public close() {
    this.readyState = 3 // CLOSED
    if (this.intervalId) clearInterval(this.intervalId)
    const closeEv = { type: 'close', code: 1000, reason: 'Normal closure' }
    if (this.onclose) this.onclose(closeEv as any)
    const list = this.listeners.get('close')
    if (list) {
      list.forEach(fn => fn(closeEv))
    }
  }

  private emitOpen() {
    const openEv = { type: 'open' }
    if (this.onopen) this.onopen(openEv as any)
    const list = this.listeners.get('open')
    if (list) {
      list.forEach(fn => fn(openEv))
    }
  }

  private emitMessage(payload: any) {
    if (this.readyState === 1) {
      const msgEv = { data: JSON.stringify(payload) }
      if (this.onmessage) this.onmessage(msgEv as any)
      const list = this.listeners.get('message')
      if (list) {
        list.forEach(fn => fn(msgEv))
      }
    }
  }

  private handleClientMessage(msg: any) {
    if (msg.type === 'bootstrap') {
      const user = { id: 1, username: msg.username || 'default', email: 'trader@arena.ai', is_active: true }
      const accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || JSON.stringify(INITIAL_ACCOUNTS))
      const account = accounts[0]
      this.emitMessage({
        type: 'bootstrap_ok',
        user,
        account,
      })
    } else if (msg.type === 'get_snapshot') {
      const accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || JSON.stringify(INITIAL_ACCOUNTS))
      const primaryAccount = accounts[0]
      this.emitMessage({
        type: 'snapshot',
        trading_mode: msg.trading_mode || 'paper',
        overview: {
          account: primaryAccount,
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
      })
    } else if (msg.type === 'get_asset_curve') {
      this.emitMessage({
        type: 'asset_curve_update',
        all_asset_curves: generateAssetCurves(),
      })
    }
  }

  private startHeartbeat() {
    // Subtle ticker updates every 5 seconds for realism
    this.intervalId = setInterval(() => {
      const symKeys = Object.keys(CRYPTO_PRICES)
      const randomSym = symKeys[Math.floor(Math.random() * symKeys.length)]
      const p = CRYPTO_PRICES[randomSym]
      if (p) {
        const delta = (Math.random() - 0.49) * (p.price * 0.001)
        p.price = Math.round((p.price + delta) * 100) / 100
      }
    }, 5000)
  }
}

/**
 * Patch global network primitives so that all fetch() and WebSocket() calls
 * work flawlessly in the standalone browser sandbox!
/**
 * Initialize mock store in localStorage for standalone execution.
 * Network requests are seamlessly handled by mockApiPlugin at the dev server level
 * and apiRequest() at the client API level, avoiding unsafe window overrides.
 */
export function setupMockNetwork() {
  if (typeof window === 'undefined') return
  try {
    initMockStore()
  } catch (e) {
    console.warn('[setupMockNetwork] initMockStore error:', e)
  }
}


