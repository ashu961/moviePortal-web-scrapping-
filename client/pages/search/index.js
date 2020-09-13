import React,{useState,useEffect} from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css'
import {AppBar,Toolbar,IconButton,Typography,InputBase,TextField} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import dynamic from 'next/dynamic';
import Axios from 'axios';
import queryString from 'query-string';
import WaitingDiv from '../../src/waitingDiv';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection:'column',
    justifyContent: 'start',
    alignItems: 'center',
    textAlign:'center',
    textJustify:'center',
    minHeight: typeof window !== 'undefined' ? window.innerHeight : '-webkit-fill-available',
    background: '#1B1C1D',
    padding:'0px 6px'
  },
  title:{
    fontFamily:"'Press Start 2P', cursive",
    display:'block',
    fontSize:40,
    color:'green',
    marginTop:'10px',
    [theme.breakpoints.down('md')]: {
      fontSize: 18,
  },
},
  title2:{
    fontFamily:"'Press Start 2P', cursive",
    display:'block',
    fontSize:24,
    color:'red',
    marginTop:'10px',
    [theme.breakpoints.down('md')]: {
      fontSize: 18,
  },
  },
  '@keyframes flicker': {
    from: {
      opacity: 1
    },
    to: {
     opacity : 0
    },
  },
  flicker: {
    position:'absolute',
    backgroundColor:'green',
    height:40,
    width: 23,
    fontSize:10,
    marginTop:6,
    animationName: '$flicker',
    animationDuration: '1000ms',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    animationTimingFunction: 'ease-in-out',
    [theme.breakpoints.down('md')]: {
      height:25,
      width: 10,
      marginTop:0.5,
    },
  },
  flicker2: {
    position:'absolute',
    backgroundColor:'red',
    height:24,
    width: 16,
    fontSize:10,
    marginTop:6,
    animationName: '$flicker',
    animationDuration: '1000ms',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    animationTimingFunction: 'ease-in-out',
    [theme.breakpoints.down('md')]: {
      height:25,
      width: 10,
      marginTop:0.5,
    },
  },
  subTitle:{
    color:'white',
    fontFamily:"'Press Start 2P', cursive",
    fontSize:16,
    padding: '10px 220px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      padding: '10px 10px'
    },
  },
  inputBase:{
    fontSize:15,
    color:'white' ,
    fontFamily:"'Press Start 2P', cursive",
    marginLeft:'8px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      maxWidth:'150px'
      // padding: '10px 10px'
    },
  },
  terminal:{
    fontSize:15,
    color:'white',
    backgroundColor:'#2f343f',
    display:'inline-block',
    padding:'8px 10px',
    borderRadius:'10px',
    margin:'20px 0px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
  },
  terminalText:{
    display:'inline-block',
    fontFamily:"'Press Start 2P', cursive",
    color:'green',
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      // padding: '10px 10px'
    },
  },
  detailKeyText:{
    fontFamily:"Ubuntu",
    color:'green',
    fontSize:18
  },
  detailValueText:{
    fontFamily:"Ubuntu",
    color:'white',
    fontSize:18
  },
  poster:{
    height:'100%',
    width:'40%',
    padding:'8px',
    border:'1px solid green',
    [theme.breakpoints.down('sm')]: {
      width:'70%',
      margin:'0 auto',
      marginTop:'10px',
      border:'1px solid white',
      // padding: '10px 10px'
    },
  },
  content:{
    display:'flex',
    height:'300px',
    width:'600px',
    border:'2px solid green',
    borderRadius:'4px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      flexDirection:'column',
      height:'100%',
      width:'98%',
      // padding: '10px 10px'
    },
  }

}));

const Home=()=> {
  const classes = useStyles();
  const [waiting,setWaiting]=useState(true);
  const {searchQuery}=queryString.parse(window.location.search);
  const [query,setQuery]=useState('')
  const [movieDetails,setMovieDetails]=useState({})
  useEffect(()=>{
    Axios.get(`http://localhost:3030/scrapData?query=${searchQuery}`)
    .then((result)=>{
      setMovieDetails(result.data);
      setWaiting(false);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
  // let movieDetails={"title":"Dark ","year":"2017","length":"1h","rating":"8.7","poster":"https://m.media-amazon.com/images/M/MV5BMmIyZjA3NGUtYjlhNS00ZDlkLWI0MDgtMDc2YWNjNGMwYWZhXkEyXkFqcGdeQXVyMzY0MTE3NzU@.jpg","plot":"A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families., where the disappearance of two young children exposes sjkkkkkkkkk nskcnkcsnkncskn","downloadUrls":[]};
  // let noDetailsImage='https://lh3.googleusercontent.com/proxy/mJfjd5a8V4QxrYzWX0ivj2ktnhFRi8Kwxb9bUAvjrgea9uiHa3T4GE76YZqynU1jk3AODn--pDPHPVX9TXQZSdGCpM_pBC3q4jl2cx7j8vGHYdE';
  const content=()=>{
    return(
      <div className={classes.root}>
      <Typography className={classes.title}>
           Movie Portal...
            <span className={classes.flicker}>'</span>
      </Typography>
      <div className={classes.terminal}>
          <Typography className={classes.terminalText}  >
            search@here
            <span style={{color:'white'}}>
              :
            </span>
            <span style={{color:'red'}} >
              ~
            </span>
            <span style={{color:'#10799c'}} >
              $
            </span>
          </Typography>
          <InputBase autoFocus value={query} onChange={(e)=>setQuery(e.target.value)} className={classes.inputBase} onKeyDown={(e)=>{
            if(e.key==='Enter'){
              let newSearchQuery=(e.target.value).replace(/\s/g,'+')
              window.location.href=`/search?searchQuery=${newSearchQuery}`;
            }
          }}/>
        </div>
      <div className={classes.content}>
        <img className={classes.poster} src={movieDetails.poster ? movieDetails.poster : '/error.jpg' }/>
        <div style={{textAlign:'start',padding:'8px'}}>
            <Typography className={classes.detailKeyText}>Name: <span className={classes.detailValueText}>{movieDetails.title}</span></Typography>
            <Typography className={classes.detailKeyText}>Date of Release: <span className={classes.detailValueText}>{movieDetails.year}</span></Typography>
            <Typography className={classes.detailKeyText}>Duration: <span className={classes.detailValueText}>{movieDetails.length}</span></Typography>
            <Typography className={classes.detailKeyText}>IMDb Rating: <span className={classes.detailValueText}>{movieDetails.rating}</span></Typography>
            <Typography className={classes.detailKeyText}>Plot: <span className={classes.detailValueText}>{movieDetails.plot.length>210 ? movieDetails.plot.substr(0,210)+'...': movieDetails.plot }</span></Typography>
        </div>
      </div>
      <div>
      <Typography className={classes.title2}>
           Download Links...
            <span className={classes.flicker2}>'</span>
      </Typography>
      <div style={{margin:'15px 0px'}}>
          {
            movieDetails.downloadUrls && movieDetails.downloadUrls.length>0 ? movieDetails.downloadUrls.map((url,index)=>{
              return (
              <>
                <Typography key={index} style={{color:'white',fontFamily:'Ubuntu',textDecoration:'none'}}>
                  <a href={url}>
                    {url}
                  </a>
                </Typography>
                <div style={{color:'white',fontFamily:'Ubuntu',fontSize:40}}>-----</div>
              </>
              )
            }) : <Typography className={classes.subTitle}>Sorry No Links Found.</Typography>
          }
      </div>
      </div>
      </div>
    )
  }
  return (
    <div>
      <Head>
        <title>Movie Portal</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"/>
      </Head>
      { waiting ? <WaitingDiv/> : content()}
    </div>
  )
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
})
