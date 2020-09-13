import React,{useState,useEffect} from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css'
import {AppBar,Toolbar,IconButton,Typography,InputBase,TextField} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import dynamic from 'next/dynamic';
import Axios from 'axios';
import queryString from 'query-string';
const useStyles = makeStyles((theme) => ({
root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    textJustify:'center',
    minHeight: typeof window !== 'undefined' ? window.innerHeight : '-webkit-fill-available',
    background: '#1B1C1D',
    padding:'0px 6px'
    },
  title:{
    fontFamily:"'Press Start 2P', cursive",
    fontSize:40,
    color:'green',
    [theme.breakpoints.down('md')]: {
      fontSize: 18,
  },
  },
  '@keyframes flicker': {
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(360deg)'
    },
  },
  flicker: {
    position:'absolute',
    backgroundColor:'green',
    height:40,
    width: 15,
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
    fontSize:20,
    padding: '10px 220px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      padding: '10px 10px'
    },
  },
}));

const WaitingDiv=()=>{
    const classes = useStyles();
    return(
      <div className={classes.root}>
          <Typography className={classes.title}>
            Searching on all the sites...
            <span className={classes.flicker}>'</span>
          </Typography>
          <Typography className={classes.subTitle}>
           It will hardly take 5-6 seconds.Please be Patient...
          </Typography>
        </div>
    )
  }

export default dynamic(() => Promise.resolve(WaitingDiv), {
  ssr: false,
})
