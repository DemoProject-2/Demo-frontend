import { useFormFields } from "../lib/customHooks";
import ReactDOM from 'react-dom';
import {
  makeStyles,
  Button,
} from "@material-ui/core";
import axios from 'axios';
import { http } from '../lib/http';
import "./Search.css"
import React from "react";
import SideDrawer from "./AuthenticatedSideDrawer.js"
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
    top: -60,
    marginBottom: '2%',
    left: '26%',
  },
  textcolor: {
    color: '#375C23'
  },
  user_container: {
    padding: '5vw'
  },
  btnFormat: {
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
    marginBottom: 40,
    left: '36vw',
  },
  extraspace: {
    margin: '-9%'
  }
}));

export default function Search() {
  const classes = useStyles();
  const [search, setUser] = useFormFields({
    account_type: '',
    medical_issue: '',
    username: ''
  });
  const { user } = React.useContext(AuthContext)
  const refreshFilters = e => {
    console.log('refresh')
  }
  const addFavorite = e => {
    e.preventDefault()
    //UPDATE axios function to update specialist user_id field and patients specialist_id field
    //have axios get functions for specialists with certain user_ids and patients with certain specialist_ids
  }

  const chat = e => {
    e.preventDefault()
  }

  const handleSubmit = e => {
    e.preventDefault()
    let accountType = user.account_type //let account type = to account type of search logged in from auth content
    let medicalIssue = JSON.stringify(search.medical_issue)
    medicalIssue = medicalIssue.replace(/['"]+/g, '')
    let userName = JSON.stringify(search.username)
    userName = userName.replace(/['"]+/g, '')
    //filtering specs
    if (accountType === "patient") {
      if (medicalIssue && !userName) {
        console.log('searching for specialist treating', medicalIssue)
        http.get(`/users/all-specialist/specialist`)  //get specialist by medical issue  DONE AND WORKING
          .then(res => {
            const users = res.data
            let specialists = []
            for (let i = 0; i < users.length; i++) {
              if (users[i].medical_issue === medicalIssue) {
                specialists.push(users[i])
              }
            }
            const usersList = specialists.map((search) => <div><div><b>{search.user_name}</b><p>Specializes In: {search.medical_issue}</p></div><div><Button onClick={addFavorite} className={classes.btnFormat}>Add to Favorites</Button><Button onClick={chat} className={classes.btnFormat}>Message</Button></div></div>)
            if (usersList.length > 0) {
              ReactDOM.render(<div>{usersList}</div>, document.getElementById('list'))
            }
            else {
              ReactDOM.render(<h1>Match Could Not Be Found</h1>, document.getElementById('list'))
            }
          })
      }
      if (userName && !medicalIssue) {
        console.log('searching for', userName)
        http.get(`/users/username/${userName}`)  //get specialist by username DONE AND WORKING
          .then(res => {
            const users = res.data
            let specialists = []
            for (let i = 0; i < users.length; i++) {
              if (users[i].account_type === 'specialist') {
                specialists.push(users[i])
              }
            }
            console.log(specialists)
            const usersList = specialists.map((search) => <div><div><b>{search.user_name}</b><p>Specializes In: {search.medical_issue}</p></div><div><Button onClick={addFavorite} className={classes.btnFormat}>Add to Favorites</Button><Button onClick={chat} className={classes.btnFormat}>Message</Button></div></div>)
            if (usersList.length > 0) {
              ReactDOM.render(<div>{usersList}</div>, document.getElementById('list'))
            }
            else {
              ReactDOM.render(<h1>Match Could Not Be Found</h1>, document.getElementById('list'))
            }
          })
      }
      if (medicalIssue && userName) {
        http.get(`/users/all-specialist/specialist`)  //get specialist by medical issue and username needs to edit
          .then(res => {
            console.log('searching for specialist by all filters')
            const users = res.data
            let specialists = []
            for (let i = 0; i < users.length; i++) {
              if (users[i].medical_issue === medicalIssue && users[i].user_name === userName) {
                specialists.push(users[i])
              }
            }
            const usersList = specialists.map((search) => <div><div><b>{search.user_name}</b><p>Specializes In: {search.medical_issue}</p></div><div><Button onClick={addFavorite} className={classes.btnFormat}>Add to Favorites</Button><Button onClick={chat} className={classes.btnFormat}>Message</Button></div></div>)
            if (usersList.length > 0) {
              ReactDOM.render(<div>{usersList}</div>, document.getElementById('list'))
            }
            else {
              ReactDOM.render(<h1>Match Could Not Be Found</h1>, document.getElementById('list'))
            }
          })
      }
      if (!medicalIssue.length && !userName) {
        console.log(medicalIssue)
        http.get(`/users/all-specialist/specialist`)  //get all specialist DONE AND WORKING
          .then(res => {
            const users = res.data
            console.log(users)
            const usersList = users.map((search) => <div><div><b>{search.user_name}</b><p>Relevant Health Concern: {search.medical_issue}</p></div><div><Button onClick={addFavorite} className={classes.btnFormat}>Add to Favorites</Button><Button onClick={chat} className={classes.btnFormat}>Message</Button></div></div>)
            if (usersList.length > 0) {
              ReactDOM.render(<div>{usersList}</div>, document.getElementById('list'))
            }
            else {
              ReactDOM.render(<h1>Match Could Not Be Found</h1>, document.getElementById('list'))
            }
          })
      }
    }
    else if (accountType === "specialist") {
      console.log('searching for patient')
      if (medicalIssue && !userName) {
        console.log('searching for patient by medical issue')
        http.get(`/users/specialty-users/${medicalIssue}`)  //get patients by medical issue DONE AND WORKING
          .then(res => {
            const users = res.data
            const patients = []
            for (let i = 0; i < users.length; i++) {
              if (users[i].account_type === 'patient') {
                patients.push(users[i])
              }
            }
            const usersList = patients.map((search) => <div><div><b>{search.user_name}</b><p>Relevant Health Concern: {search.medical_issue}</p></div><div><Button onClick={addFavorite} className={classes.btnFormat}>Add to Favorites</Button><Button onClick={chat} className={classes.btnFormat}>Message</Button></div></div>)
            if (usersList.length > 0) {
              ReactDOM.render(<div>{usersList}</div>, document.getElementById('list'))
            }
            else {
              ReactDOM.render(<h1>Match Could Not Be Found</h1>, document.getElementById('list'))
            }
          })
      }
      if (!medicalIssue && userName) {
        console.log('searching for patient by username')
        http.get(`/users/username/${userName}`)  //get patients by username DONE AND WORKING
          .then(res => {
            const users = res.data
            const usersList = users.map((search) => <div><div><b>{search.user_name}</b><p>Relevant Health Concern: {search.medical_issue}</p></div><div><Button onClick={addFavorite} className={classes.btnFormat}>Add to Favorites</Button><Button onClick={chat} className={classes.btnFormat}>Message</Button></div></div>)
            if (usersList.length > 0) {
              ReactDOM.render(<div>{usersList}</div>, document.getElementById('list'))
            }
            else {
              ReactDOM.render(<h1>Match Could Not Be Found</h1>, document.getElementById('list'))
            }
          })
      }
      if (medicalIssue && userName) {
        http.get(`/users/username/${userName}`)  //get patients by medical issue and username
          .then(res => {
            const users = res.data
            const patients = []
            for (let i = 0; i < users.length; i++) {
              if (users[i].medical_issue === medicalIssue) {
                patients.push(users[i])
              }
            }
            const usersList = patients.map((search) => <div><div><b>{search.user_name}</b><p>Relevant Health Concern: {search.medical_issue}</p></div><div><Button onClick={addFavorite} className={classes.btnFormat}>Add to Favorites</Button><Button onClick={chat} className={classes.btnFormat}>Message</Button></div></div>)
            if (usersList.length > 0) {
              ReactDOM.render(<div>{usersList}</div>, document.getElementById('list'))
            }
            else {
              ReactDOM.render(<h1>Match Could Not Be Found</h1>, document.getElementById('list'))
            }
          })
      }
      if (!medicalIssue && !userName) {
        console.log('searching for all patients no filter selected')
        http.get(`/users/all-patients/patient`)  //get all patients DONE AND WORKING
          .then(res => {
            const users = res.data
            const usersList = users.map((search) => <div><div><b>{search.user_name}</b><p>Relevant Health Concern: {search.medical_issue}</p></div><div><Button onClick={addFavorite} className={classes.btnFormat}>Add to Favorites</Button><Button onClick={chat} className={classes.btnFormat}>Message</Button></div></div>)
            if (usersList.length > 0) {
              ReactDOM.render(<div>{usersList}</div>, document.getElementById('list'))
            }
            else {
              ReactDOM.render(<h1>Match Could Not Be Found</h1>, document.getElementById('list'))
            }
          })
      }
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
            <input type="radio" value="Anxiety" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Anxiety</t><br />
            <input type="radio" value="ADHD" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>ADHD</t><br />
            <input type="radio" value="Bipolar Disorder" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Bipolar Disorder</t><br />
            <input type="radio" value="Depression" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Depression</t><br />
            <input type="radio" value="Dissociative Disorder" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Dissociative Disorder</t><br />
            <input type="radio" value="Eating Disorder" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Eating Disorder</t><br />
            <input type="radio" value="Post-traumatic Stress Disorder" onClick={setUser} name="medical_issue" /><t className={classes.textcolor}>Post-traumatic Stress Disorder</t><br />
          </div>
          {/* <div><ViewButton /></div><br/> */}
          <Button
            type='submit'
            variant='contained'
            size='small'
            onClick={handleSubmit}
            className={classes.filter}
          >Filter</Button><br />
          <Button
            type='submit'
            variant='contained'
            size='small'
            onClick={refreshFilters}
            className={classes.filter}
          >Clear Filters</Button>
        </div>
        <list id='list' />
      </div>
    </body>
  );
}
