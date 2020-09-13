import React,{useState} from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css'
import {AppBar,Toolbar,IconButton,Typography,InputBase,TextField} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import dynamic from 'next/dynamic';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    textJustify:'center',
    minHeight: typeof window !== 'undefined' ? window.innerHeight : '-webkit-fill-available',
    background: '#1B1C1D',
  },
  title:{
    fontFamily:"'Press Start 2P', cursive",
    fontSize:40,
    color:'green',
    [theme.breakpoints.down('md')]: {
      fontSize: 22,
  },
  },
  '@keyframes flicker': {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  },
  flicker: {
    position:'absolute',
    backgroundColor:'green',
    height:40,
    width: 23,
    marginTop:6,
    animationName: '$flicker',
    animationDuration: '1000ms',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    animationTimingFunction: 'ease-in-out',
    [theme.breakpoints.down('md')]: {
      height:25,
      width: 17,
      marginTop:0.5,
    },
  },
  subTitle:{
    color:'white',
    fontFamily:"'Press Start 2P', cursive",
    fontSize:20,
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
    marginTop:'20px',
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
  }

}));

const Home=()=> {
  const classes = useStyles();
  const [query,setQuery]=useState('')
  return (
    <div className={classes.root}>
      <Head>
        <title>Movie Portal</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"/>
      </Head>
      <div>
        <Typography className={classes.title}>
          Welcome to MoviePortal...
          <span className={classes.flicker}>'</span>
        </Typography>
        <Typography className={classes.subTitle}>
          Search any movie and find all the links in one place from different sites.
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
              let searchQuery=(e.target.value).replace(/\s/g,'+')
              window.location.href=`/search?searchQuery=${searchQuery}`;
            }
          }}/>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
})
