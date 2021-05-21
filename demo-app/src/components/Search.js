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
import SideDrawer from "./SideDrawer.js"
import { AuthProvider } from "../context/auth-context"
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
    margin: "20px auto 20px",
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
  const[user, setUser]=useFormFields({
    account_type:'',
    medical_issue:'',
    username:''
  });

const handleSubmit = e =>{
e.preventDefault()
let accountType=JSON.stringify(user.account_type) //let account type = to account type of user logged in from auth content
let medicalIssue=JSON.stringify(user.medical_issue)
let userName=JSON.stringify(user.username)
//filtering specs
if(accountType==="User"){
  if(medicalIssue&&!userName){
    axios.get(``)  //get specialist by medical issue and username
      .then(res =>{
        const users=res.data
        const usersList=users.map((user)=><Grid><Card><b>{user.user_name}</b></Card></Grid>)
        ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))})}
  if(!medicalIssue&&userName){
    axios.get(`https://mental-health-database.herokuapp.com/users/username/${userName}`)  //get specialist by username fix to only specialists
      .then(res =>{
        const users=res.data
        const usersList=users.map((user)=><Grid><Card><b>{user.user_name}</b></Card></Grid>)
        ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))})}
  if(medicalIssue&&userName){
    axios.get(`https://mental-health-database.herokuapp.com/users/all-specialist/Depression`)  //get specialist by medical issue
      .then(res =>{
        const users=res.data
        const usersList=users.map((user)=><Grid><Card><b>{user.user_name}</b></Card></Grid>)
        ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))})}
  if(!medicalIssue&&!userName){
    axios.get(`https://mental-health-database.herokuapp.com/users/all-specialist/specialist`)  //get all specialist 
      .then(res =>{
        const users=res.data
        const usersList=users.map((user)=><Grid><Card><b>{user.user_name}</b></Card></Grid>)
        ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))})}   
}
else if(accountType==="Specialists"){
  if(medicalIssue&&!userName){
    axios.get(`https://mental-health-database.herokuapp.com/users/all-patients/${medicalIssue}`)  //get patients by medical issue
      .then(res =>{
        const users=res.data
        const usersList=users.map((user)=><Grid><Card><b>{user.user_name}</b></Card></Grid>)
        ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))})}
  if(!medicalIssue&&userName){
    axios.get(`https://mental-health-database.herokuapp.com/users/username/${userName}`)  //get patients by medical issue
      .then(res =>{
        const users=res.data
        const usersList=users.map((user)=><Grid><Card><b>{user.user_name}</b></Card></Grid>)
        ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))})}
  if(medicalIssue&&userName){
    axios.get(``)  //get patients by medical issue and username
      .then(res =>{
        const users=res.data
        const usersList=users.map((user)=><Grid><Card><b>{user.user_name}</b></Card></Grid>)
        ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))})}
  if(!medicalIssue&&!userName){
    axios.get(`https://mental-health-database.herokuapp.com/users/all-patients/patient`)  //get all patients
    .then(res =>{
      const users=res.data
      const usersList=users.map((user)=><Grid><Card><b>{user.user_name}</b></Card></Grid>)
      ReactDOM.render(<div>{usersList}</div>,document.getElementById('list'))})}
          }
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
            defaultValue={user.username}
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
          <input type="radio" value="Depression" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Depression</t><br/>
          <input type="radio" value="Bipolar Disorder" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Bipolar Disorder</t><br/>
          <input type="radio" value="Eating Disorder" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Eating Disorder</t><br/>
          <input type="radio" value="Post-traumatic Stress Disorder" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Post-traumatic Stress Disorder</t><br/>
          <input type="radio" value="Dissociative Disorder" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Dissociative Disorder</t><br/>
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
          <list id='list' className='list-container'/>
        </div>
      </body>
    );
  }
