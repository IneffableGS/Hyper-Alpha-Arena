# Hyper Alpha Arena

**English** | [简体中文](./README.zh-CN.md)

> **Multi-exchange AI trading platform with quantitative factor intelligence and market flow signal monitoring**. Supports **Hyperliquid** and **Binance Futures**. AI models autonomously discover, validate, and trade on quantitative factors — the same building blocks used by institutional quant desks. Two trading modes: **AI Trader** for strategies needing market understanding, or **Program Trader** for fixed-rule algorithmic strategies.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Hyperliquid](https://img.shields.io/badge/Hyperliquid-Supported-00D395)](https://hyperliquid.xyz)
[![Binance](https://img.shields.io/badge/Binance-Supported-F0B90B)](https://binance.com)

---

## Architecture (React Rewrite)

This application has been rewritten into a modern, unified React single-page application built on Vite and Tailwind CSS. It features a complete client-side simulation engine, real-time reactive charting, and localized storage.

- **Frontend Core**: React 18 with TypeScript, Vite bundler, Lucide icons, Radix UI primitives, Tailwind CSS.
- **Data Visualizations**: Lightweight Charts for candlestick analysis, Chart.js & Recharts for asset performance curves and factor effectiveness distributions.
- **Pixel Art Trading Arena**: Interactive 2D floor simulator visualizing LLM trading agents (GPT-5, Claude, DeepSeek, Grok, Qwen) actively computing alpha at their workstations.
- **Factor Intelligence**: 86 built-in quantitative factors across Momentum, Trend, Volatility, Volume, and Microstructure with live IC/ICIR and win rate metrics.
- **Execution & Signals**: Cumulative Volume Delta (CVD) divergence triggers, Open Interest surges, and funding rate arbitrage detection.
- **Program Trader**: In-browser Python-style strategy runner with simulated historical backtesting and Sharpe ratio analytics.
- **Hyper AI Chat Assistant**: Conversational trading assistant supporting skill workflows (`/market`, `/prompt`, `/program`, `/review`, `/diagnose`, `/resource`).
- **Bilingual**: Complete English and Simplified Chinese (zh-CN) localization.

## Development

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build production bundle
npm run build
```

## Features

1. **Dashboard & Alpha Arena**: Real-time asset curve comparison across multiple AI traders with live trade markers and 2D pixel workstation floor.
2. **Quantitative Factor Library**: 86 built-in factors with formula breakdowns, IC/ICIR effectiveness, and custom expression lab.
3. **Market Flow Signal Pools**: Order flow imbalance, CVD delta, and funding rate triggers with customizable thresholds.
4. **Strategy Prompts & Bindings**: Multi-factor template editor with variable injection and preview.
5. **Program Trader**: Algorithmic rules with simulated backtests and performance attribution.
6. **Hyper AI Assistant**: AI coordinator capable of executing diagnostics and market assessments.
7. **Multi-Exchange Support**: Hyperliquid testnet/mainnet and Binance Futures modes.
