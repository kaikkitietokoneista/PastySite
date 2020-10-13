# PastySite

Ilmainen, herkullinen ja avoimen lähdekoodin Pastebin.

## Demo

https://pasty.kaikkitietokoneista.net

## Asentaminen ja käynnistäminen

Varmista, että Node.JS sekä NPM ovat asennettuna koneellesi. Kloonaa tämä git-repository.

```bash
git clone https://github.com/kaikkitietokoneista/PastySite.git
```

Asenna tarvittavat paketit.

```bash
npm install
```

Luo vaadittu `.env`-tiedosto. Siinä sinun tarvitsee vain määritellä portti. Esimerkki:

```env
PORT=8080
```

Käynnistä ohjelma.

```bash
node .
```

tai

```bash
forever start app.js
```
