import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import Axios from 'axios';
const ScrapData=(app)=>{
  app.use('/scrapData',{
    async find(data,params){
      let {query}=data.query
      let movieDetails={};
      try{
      let siteDatas=[{
        url: 'https://pahe.ph/?s=',
        searchResultTextSelector:'#main-content > div.content > div.page-head > h2',
        // keywordInText: false,
        // pushOnFound: false,
        resultText:'Nothing Found'
      },
      {
        url: 'https://mlwbd.link/?s=',
        searchResultTextSelector:'#contenedor > div.module > div.content.rigth.csearch > div > div.no-result.animation-2 > h2',
        keywordInText: true,
        // pushOnFound: false,
        resultText:'No results to show with '
      },
      {
        url:'https://4movierulz.tv/?s=',
        // keywordInText: false,
        // pushOnFound: false,
        compareTypeOtherThanText: true,
        searchResultDivSelector:'#errorpage_message',
      },
      {
        url:'https://123mkv.world/?s=',
        searchResultTextSelector:'#content_box > div > h2',
        // keywordInText: false,
        // pushOnFound: false,
        resultText:'We apologize for any inconvenience, please hit back on your browser or use the search form below.'
      },
      {
        url:'https://worldfree4u.cyou/?s=',
        // keywordInText: false,
        // pushOnFound: false,
        searchResultTextSelector:'body > div > div > div > main > div.entry > p',
        resultText:'Sorry, no content matched your criteria.'
      },
      {
        url:'https://9xmovies.media/?s=',
        // keywordInText: false,
        // pushOnFound: false,
        compareTypeOtherThanText: true,
        searchResultDivSelector:'body > section > section.home-wrapper.thumbnail-wrapper > div.error-not-found.col-md-12',
      },
      {
        url:'https://7starhd.com.de/?s=',
        // keywordInText: false,
        // pushOnFound: false,
        compareTypeOtherThanText: true,
        searchResultDivSelector:'body > section > section.home-wrapper.thumbnail-wrapper > div.error-not-found.col-md-12',
      },
      {
        url:'https://downloadhub.host/?s=',
        compareTypeOtherThanText: true,
        searchResultDivSelector:'body > section > section.home-wrapper.thumbnail-wrapper > div.error-not-found.col-md-12',
      },
      {
        url: 'https://moviesflixpro.org/?s=',
        compareTypeOtherThanText: true,
        searchResultDivSelector:'#content_box > div > h2',
      },
      {
        url: 'https://themoviesflix.com/?s=',
        searchResultTextSelector:'#content_box > div > h2',
        // keywordInText: false,
        // pushOnFound: false,
        resultText:'We apologize for any inconvenience, please hit back on your browser or use the search form below.'
      },
      {
        url: 'https://www.uncuthd.space/?s=',
        compareTypeOtherThanText: true,
        searchResultDivSelector:'body > section > section > div.error-not-found.col-md-12',
      },
      {
        url: 'https://mkvking.com/?s=',
        searchResultTextSelector:'#main > section > div > div > p',
        // keywordInText: false,
        // pushOnFound: false,
        resultText:'Sorry, but nothing matched your search terms. Please try again with some different keywords.'
      },
      // {
      //   url:'https://hdmovieshubz.co/?s=',
      //   compareTypeOtherThanText: true,
      //   searchResultDivSelector:'body > center > div > center > div.container-all > div > div > div:nth-child(2)',
      // },
      {
        url: 'https://moviesbaba.online/?s=',
        searchResultTextSelector:'#contenedor > div.module > div.content.rigth.csearch > div > div.no-result.animation-2 > h2',
        keywordInText: true,
        // pushOnFound: false,
        resultText:'No results to show with '
      },
      {
        url:'https://khatrimaza1.vip/?s=',
        compareTypeOtherThanText: true,
        searchResultDivSelector:'body > section > section.home-wrapper.thumbnail-wrapper > div.error-not-found.col-md-12',
      },
      {
        url: 'https://www.mkvcinemas.link/?s=',
        searchResultTextSelector:'#main > div > div.main-content.main-category > div > div.movies-list.movies-list-full > h3',
        // keywordInText: true,
        // pushOnFound: false,
        resultText:'No result found.'
      },
      // {
      //   url: 'https://movienolimit.to/search?query=',
      //   searchResultTextSelector:'#page-text > center > div',
      //   // keywordInText: true,
      //   // pushOnFound: false,
      //   resultText:'Sorry! We could not find movies!'
      // },
      {
        url: 'https://hdpopcorns.wtf/?s=',
        searchResultTextSelector:'#contenedor > div.module > div.content.csearch > div > div.no-result.animation-2 > h2',
        keywordInText: true,
        // pushOnFound: false,
        resultText:'No results to show with '
      },
    ];

        try{
        //imdb
        let imdbQuery=query.replace(/\s/g,'%2520')
        let {data:{title,year,length,rating,poster,plot}}=await Axios({
          "method":"GET",
          "url":`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${imdbQuery}`,
          "headers":{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"imdb-internet-movie-database-unofficial.p.rapidapi.com",
          "x-rapidapi-key":"44b2cb6fa4msh20c42d22a9bd589p117b2bjsn0f8c059eb914",
          "useQueryString":true
          }
          });
        
        movieDetails={title,year,length,rating,poster,plot,downloadUrls:[]}
        let siteQuery=query.replace(/\s/g,'+')
        let promises=siteDatas.map(async (site)=>{
          return new Promise(async function(resolve, reject) {
          let browser= await puppeteer.launch({ headless: true })
          let page = await browser.newPage();
          page.setViewport({ width: 1366, height: 768 });
          await page.goto(site.url+siteQuery, { waitUntil: 'domcontentloaded' });
          let content=await page.content();
          let $ = await cheerio.load(content);
          if(site.compareTypeOtherThanText){
            let resultDiv=$(site.searchResultDivSelector)[0];
            if(!resultDiv){
              movieDetails.downloadUrls.push(site.url+siteQuery);
            }
          }else{
            let resultText=$(site.searchResultTextSelector).text().trim();
            let dBresultText= resultText && site.keywordInText ? site.resultText+query : site.resultText;
            if(!resultText && site.pushOnFound){
              await page.close();
              await browser.close();
              return;
            }
            if(resultText && resultText==dBresultText){
              if(site.pushOnFound) movieDetails.downloadUrls.push(site.url+siteQuery);
            }else{
              movieDetails.downloadUrls.push(site.url+siteQuery);
            }
          }
          
          await page.close();
          await browser.close();
          resolve(site.url+siteQuery)  
          })
        })
        await Promise.all(promises)
        return movieDetails;
        }catch(e){
          console.log(e)
        }    
  }catch(e){
    console.log(e)
  } 
  }
});
const service=app.service('/scrapData');
}

export default ScrapData;
