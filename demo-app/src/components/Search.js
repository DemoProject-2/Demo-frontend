import { useFormFields} from "../lib/customHooks";
import ReactDOM from 'react-dom';
import {
  Grid,
  Card,
  makeStyles,
  Button,
} from "@material-ui/core";
import axios from 'axios';
import "./Search.css"
import React from "react";
import SideDrawer from "./SideDrawer.js"
import { AuthContext } from '../context/auth-context'
const useStyles = makeStyles((theme) => ({
  searchfield: {
    "&:hover": {
      borderColor: "rgba(223,225,229,0)",
      boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
    },
    "&:focus": {
      borderColor: "rgba(223,225,229,0)",
      boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
    },
    backgroundColor: "#00000000",
    display: "flex",
    border: " 1px solid #dfe1e5",
    borderRadius: "24px",
    height: "44px",
    margin: "10px auto 20px",
    width: "400px",
    outline: "none",
    textIndent: "30px",
    textDecoration: "none",
  },
  filter: {
    "&:hover": {
      borderColor: "#375C23",
      boxShadow: "0 1px 6px #adcaec",
      backgroundColor: "#C2F0AA",
      color: "#375C23"
    },
    color: "#f6f8f9",
    background: "#375C23",
    padding: "12px 18px",
    fontSize: "14px",
    lineHeight: "16px",
    height: "auto",
    borderWidth: "0",
    borderRadius: "20px",
    top: 20,
    marginBottom: 50,
  },
  searchbtn: {
    "&:hover": {
      borderColor: "#375C23",
      boxShadow: "0 1px 6px #adcaec",
      backgroundColor: "#C2F0AA",
      color: "#375C23"
    },
    color: "#f6f8f9",
    background: "#375C23",
    padding: "12px 18px",
    fontSize: "14px",
    lineHeight: "16px",
    height: "auto",
    borderWidth: "0",
    borderRadius: "20px",
    top: 20,
    marginBottom: 50,
    left:'46vw',
  },
  textcolor:{
    color:'#375C23'
  },
  user_container:{
    padding:'5vw'
  }
}));

export default function Search() {
  const classes = useStyles();
  const[search, setUser]=useFormFields({
    account_type:'',
    medical_issue:'',
    username:''
  });
  const { user, token } = React.useContext(AuthContext)

const handleSubmit = e =>{
e.preventDefault()
let accountType=user.account_type //let account type = to account type of search logged in from auth content
let medicalIssue=JSON.stringify(search.medical_issue)
medicalIssue=medicalIssue.replace(/['"]+/g, '')
let userName=JSON.stringify(search.username)
userName=userName.replace(/['"]+/g, '')
console.log(user.account_type)
//filtering specs
if(accountType==="patient"){
  if(medicalIssue&&!userName){
    console.log('searching for specialist treating', medicalIssue)
    axios.get(``)  //get specialist by medical issue  
      .then(res =>{
        const users=res.data
        const usersList=users.map((search)=><div><b>{search.user_name}</b>{search.medical_issue}<Button>Add to Favorites</Button><Button>Message</Button></div>)
        if(users.length>0){
          ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))}
          else{
            ReactDOM.render(<h1>Match Could Not Be Found</h1>,document.getElementById('list'))}})}
  if(userName&&!medicalIssue){
    console.log('searching for', userName)
    axios.get(`https://mental-health-database.herokuapp.com/users/username/${userName}`)  //get specialist by username fix to only specialists
      .then(res =>{
        const users=res.data
        const usersList=users.map((search)=><div><b>{search.user_name}</b>{search.medical_issue}<Button>Add to Favorites</Button><Button>Message</Button></div>)
        if(users.length>0){
          ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))}
          else{
            ReactDOM.render(<h1>Match Could Not Be Found</h1>,document.getElementById('list'))}})}
  if(medicalIssue&&userName){
    axios.get(`https://mental-health-database.herokuapp.com/users/all-specialist/{}`)  //get specialist by medical issue and username needs to edit
      .then(res =>{
        const users=res.data
        const usersList=users.map((search)=><div><b>{search.user_name}</b>{search.medical_issue}<Button>Add to Favorites</Button><Button>Message</Button></div>)
        if(users.length>0){
          ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))}
          else{
            ReactDOM.render(<h1>Match Could Not Be Found</h1>,document.getElementById('list'))}})}
  if(!medicalIssue.length&&!userName){
    console.log(medicalIssue)
    axios.get(`https://mental-health-database.herokuapp.com/users/all-specialist/specialist`)  //get all specialist 
      .then(res =>{
        const users=res.data
        console.log(users)
        const usersList=users.map((search)=><div><b>{search.user_name}</b>{search.medical_issue}<Button>Add to Favorites</Button><Button>Message</Button></div>)
        if(users.length>0){
          ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))}
          else{
            ReactDOM.render(<h1>Match Could Not Be Found</h1>,document.getElementById('list'))}})}  
}
else if(accountType==="specialist"){
  console.log('searching for patient')
  if(medicalIssue&&!userName){
    console.log('searching for patient by medical issue')
    axios.get(`https://mental-health-database.herokuapp.com/users/all-patients/${medicalIssue}`)  //get patients by medical issue NOT WORKING REVISE URL
      .then(res =>{
        const users=res.data
        const usersList=users.map((search)=><div><b>{search.user_name}</b>{search.medical_issue}<Button>Add to Favorites</Button><Button>Message</Button></div>)
        if(users.length>0){
          ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))}
          else{
            ReactDOM.render(<h1>Match Could Not Be Found</h1>,document.getElementById('list'))}})}
  if(!medicalIssue&&userName){
    console.log('searching for patient by username')
    axios.get(`https://mental-health-database.herokuapp.com/users/username/${userName}`)  //get patients by username DONE AND WORKING
      .then(res =>{
        const users=res.data
        const usersList=users.map((search)=><div><b>{search.user_name}</b>{search.medical_issue}<Button>Add to Favorites</Button><Button>Message</Button></div>)
        if(users.length>0){
          ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))}
          else{
            ReactDOM.render(<h1>Match Could Not Be Found</h1>,document.getElementById('list'))}})}
  if(medicalIssue&&userName){
    axios.get(``)  //get patients by medical issue and username
      .then(res =>{
        const users=res.data
        const usersList=users.map((search)=><div><b>{search.user_name}</b>{search.medical_issue}<Button>Add to Favorites</Button><Button>Message</Button></div>)
        if(users.length>0){
          ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))}
          else{
            ReactDOM.render(<h1>Match Could Not Be Found</h1>,document.getElementById('list'))}})}
  if(!medicalIssue&&!userName){
    console.log('searching for all patients no filter selected')
    axios.get(`https://mental-health-database.herokuapp.com/users/all-patients/patient`)  //get all patients DONE AND WORKING
    .then(res =>{
      const users=res.data
      const usersList=users.map((search)=><div><b>{search.user_name}</b>{search.medical_issue}<Button>Add to Favorites</Button><Button>Message</Button></div>)
      if(users.length>0){
        ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))}
        else{
          ReactDOM.render(<h1>Match Could Not Be Found</h1>,document.getElementById('list'))}})}          }
        }
    return (
      <body>
        <SideDrawer />
        {/* Form now prints to console, now just needs to change what is displayed to the screen */}
        <form>
          <input 
            margin="small"
            size="small"
            name="username"
            id='searchField'
            defaultValue={search.username}
            placeholder="Search"
            onChange={setUser}
            className={classes.searchfield}
          />
          <Button
            type="submit"
            className={classes.searchbtn}
            variant="contained"
            size="small"
            onClick={handleSubmit}
          >
            Search
          </Button>
        </form>
        <div className='page-container'>
        <div className='filter-container'>
        <div>
          <h2 className={classes.textcolor}>Filter By :</h2>
        </div>
          <div>
            <h3 className={classes.textcolor}>Medical Issue:</h3>
          <input type="radio" value="Anxiety" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Anxiety</t><br/>
          <input type="radio" value="ADHD" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>ADHD</t><br/>
          <input type="radio" value="Bipolar Disorder" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Bipolar Disorder</t><br/>
          <input type="radio" value="Depression" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Depression</t><br/>
          <input type="radio" value="Dissociative Disorder" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Dissociative Disorder</t><br/>
          <input type="radio" value="Eating Disorder" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Eating Disorder</t><br/>
          <input type="radio" value="Post-traumatic Stress Disorder" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Post-traumatic Stress Disorder</t><br/>
          </div>
        {/* <div><ViewButton /></div><br/> */}
        <Button
        type='submit'
        variant='contained'
        size='small'
        onClick={handleSubmit}
        className={classes.filter}
        >Filter</Button>
        </div>
          <list id='list'/>
        </div>
      </body>
    );
  }
