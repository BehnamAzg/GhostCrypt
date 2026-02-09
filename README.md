<div align="center">

<img src="https://github.com/BehnamAzg/GhostCrypt/raw/main/public/icons/icon.svg" alt="GhostCrypt Icon" width="128">

# GhostCrypt

**_Message Encryption Tool_**

<div align="center">
    <p>
        <a href="README-fa.md">
            <small> فارسی </small>
        </a>
        | 
        <a href="README.md">
            <small> English </small>
        </a>
    </p>
</div>

[![][license]](https://github.com/BehnamAzg/GhostCrypt/blob/main/LICENSE) [![][version]](https://github.com/BehnamAzg/GhostCrypt/releases) [![][stars]](https://github.com/BehnamAzg/GhostCrypt) [![Support]](https://behnamazg.github.io/donation)

[![Open GhostCrypt 👻](https://img.shields.io/badge/Open_GhostCrypt-5e81ac?style=for-the-badge)](https://ghostcryptapp.netlify.app/)

<div align="center">
<img src="https://github.com/BehnamAzg/GhostCrypt/raw/main/public/screenshots/screenshot-1.png" alt="App Screenshot">
</div>
<hr>

</div>

**GhostCrypt** is a secure, client-side message encryption and decryption tool built as a **Progressive Web App**. It allows you to encrypt and obfuscate text using a passphrase and various obfuscation layers, then decrypt it back.

## ✔️ Features:

- ### 🛡️ Multiple obfuscation layers
  - **Base64** ➜ default mode
  - **English Words** ➜ encrypted text disguised as natural words
  - **Persian Words** ➜ same concept but using Persian vocabulary
  - **Compact** ➜ compression for the shortest possible output
  - **Characters** ➜ shifted characters
  - **Numbers** ➜ pure digit strings
  - **Emojis** ➜ message hidden in a sequence of emojis
  - **Dots** ➜ binary represented as dot patterns
- ### 🔒 Security
  - AES-256-GCM encryption
  - PBKDF2 key derivation + random salt
  - Random IV per message
  - Never stores your passphrase
  - Decryption fails safely on wrong passphrase or corrupted data
- ### 🔑 Strong passphrase system
  - Split your passphrase into 5 separate fields for stronger and easier-to-remember protection.
- ### 📴 PWA & Offline Support
  - GhostCrypt is a Progressive Web App (PWA). You can install it on your phone, tablet, or desktop for offline support.

[license]: https://img.shields.io/github/license/BehnamAzg/GhostCrypt?style=plastic-square
[version]: https://img.shields.io/github/v/release/BehnamAzg/GhostCrypt?style=plastic-square
[stars]: https://img.shields.io/github/stars/BehnamAzg/GhostCrypt?style=plastic-square
[Support]: https://img.shields.io/badge/Donate-🤍-5e81ac?style=plastic-square
