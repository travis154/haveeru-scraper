# Haveeru-Scraper

This is a small utility to scrape articles from [Haveeru](http://haveeru.com.mv).

## Installation

Make sure you have the latest version [node.js](http://nodejs.org) installed

* Clone from github

```bash
git clone https://github.com/iulogy/haveeru-scraper
cd haveeru-scraper
```

* Install dependencies

```bash
npm install
```
## Usage

* Scrape first 20 articles 

```bash
node scrape
```

* Scrape articles from 100 to 500  

```bash
node scrape --start 100 --end 500
```

* Scrape articles from 100 to 70000 with 20 concurrent requests and save full page

```bash
node scrape --start 100 --end 70000 --limit 20 --save-full-page
```