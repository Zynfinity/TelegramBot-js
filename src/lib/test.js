import { youtube } from "./scraper.js"

youtube('https://www.youtube.com/watch?v=APCfmQ552ag&list=RDAPCfmQ552ag&index=1', "mp3").then(s => console.log(s))