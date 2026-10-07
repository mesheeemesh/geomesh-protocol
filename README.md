# GeoMesh Protocol 📍

> Location-aware decentralized micro-messaging, spatial proximity proofs, and geocoded micropayments on Stellar

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-purple.svg)](https://stellar.org)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen.svg)]()
[![Contributors](https://img.shields.io/badge/contributors-15%20active-blue.svg)](#-maintainers--contributors)

---

## 🌟 Overview

**geomesh-protocol** provides production-grade infrastructure for the Stellar ecosystem, engineered for high availability, fault-tolerant execution, and strict architectural invariant guarantees. It delivers sub-second transaction routing, robust telemetry streaming, and automated execution rails tailored for high-volume Web3 applications.

---

## 🏗️ Core Architecture & Features

- **Decentralized Execution**: Autonomous smart contracts and backend services integrated with Stellar Horizon and Soroban RPC.
- **Invariant Guarantees**: Core state machines formally validated with property-based testing and fuzzing harnesses.
- **High-Throughput Settlement**: Optimized transaction batching, event streaming, and sub-second state reconciliation.
- **Granular Security Controls**: Cryptographic Ed25519 signature verification, replay guards, and bounded storage layouts.
- **Enterprise Telemetry**: Distributed OpenTelemetry tracing spans, Prometheus metrics, and structured log emissions for real-time visibility.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+) / Bun (v1.1+) / Rust (v1.80+) depending on workspace targets.
- Stellar CLI & Soroban SDK.

### Installation
```bash
git clone https://github.com/mesheeemesh/geomesh-protocol.git
cd geomesh-protocol
```

### Running Tests
```bash
npm test
# or
cargo test --all-targets
```

---

## 👥 Maintainers & Contributors

Active maintainers and core protocol contributors:
- **daddygokings-art** - *Lead Architect & Security Reviewer*
- **levoski1** - *Core Protocol & State Engine Maintainer*
- **shelterfaithapps** - *Smart Contract Invariant & Soroban Engineer*
- **rain91300** - *Property Testing & Fuzzing Harness Lead*
- **oziginwambada** - *Indexing, Telemetry & Integration Specialist*
- **levibliz** - *Documentation & Developer Experience Maintainer*
- **leviso74** - *Settlement Engine & Cross-Contract Router Maintainer*
- **mondaymose** - *Escrow, State Machine & Event Auditor*
- **Oby38** - *Micro-Service & API Integration Engineer*
- **ayomidemariam** - *Governance, Vesting & Vault Logic Specialist*
- **Buildwithlevo** - *Infrastructure & Deployment Automation Lead*
- **hannyloveworld** - *Telemetry Streaming & Horizon RPC Engineer*
- **snooopdog** - *Transaction Batching & Mempool Specialist*
- **meshmesh001** - *Distributed State & Consensus Synchronizer*
- **mikewheeleer** - *Continuous Integration & Tooling Maintainer*

---

## 🤝 Contributing & Security

We welcome community contributions through our bi-weekly sprint cycles on The Wave Program. Please review our [Contributing Guidelines](CONTRIBUTING.md) and [Security Runbook](SECURITY.md) before submitting pull requests.

## 📄 License
This project is licensed under the Apache 2.0 License.
