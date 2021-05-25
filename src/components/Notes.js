import { makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";
import { useFormFields } from "../lib/customHooks";
import React from "react";
import { http } from "../lib/http";
import "./Notes.css"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: 'auto',
    maxWidth: 880,
    height:'600px',
    paddingLeft:'3%',
    width:'600px'
  },
  image: {
    width: 328,
    height: 328,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxHeight: '110%',
    maxWidth: '180%',
  },
  notebtn: {
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
    left: '5%',
    top: 30,
    marginBottom: 50,
  },
  note_container: {
    margin: '-2% 20%',
    paddingTop: '3%',
  },
  text: {
    width: '90%',
    padding: '3vw',
    margin: "auto"
  },
  noteDiv: {
    paddingTop:'5px',
    fontSize:'33px',
    paddingLeft:'20%'
  },
  notes: {
    margin: '105px -200px',  
  },
  mainDiv: {
  },
  general: {
    fontSize:'50px',
    margin:'-105px -100px',
    paddingBottom:'35px',
    color: "#375C23"
  },
  page_padding:{
    paddingBottom: '26%',
    paddingRight: '26%',
    height:"auto",    
    backgroundColor:'white'
  },
  divPadding: {
    padding:'2%'
  }
}));


export default function Notes() {
  const classes = useStyles();
  const [note, setNote] = useFormFields({
    title: "",
    content: "",
    note_type:""
  })
  const [notes, setNotes] = React.useState(null)

  // fetch the user's notes
  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await http.get('/notes')
        setNotes(data.notes)
      } catch (err) {
        console.log(err)
      }
    }

    fetchNotes()
  }, [])

  const submitNote = async e => {
    e.preventDefault()
    console.log(note.note_type)
    try {
      const { data } = await http.post('/notes', {
        title: note.title,
        content: note.content,
        note_type: note.note_type
      })
     setNotes([...notes, data.note])
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={classes.mainDiv} style={{backgroundImage: 'url("/assets/background.jpg")'}}>
      <div className={classes.note_container}>
        <Paper className={classes.paper}>
          
          <Grid container spacing={2}>
            <form>
            <p className={classes.justify}><input
                type="radio"
                value="Appointment_Reminder"
                onClick={setNote}
                name="note_type" />
                <t>Appointment Reminder</t></p>
              <Grid item>
                <textarea name="title" value={note.title} onChange={setNote} rows='1' cols='50' className={classes.text} placeholder='Note Title'></textarea>
              </Grid>
              <Grid item>
                <textarea name="content" value={note.content} onChange={setNote} rows='7' cols='50' className={classes.text} placeholder='Please write a note including date, note title and content.'></textarea>
              </Grid>
              <Grid Item>
              </Grid>
              <Grid item xs={12} sm container>
              </Grid>
              <Button type='submit' onClick={submitNote} className={classes.notebtn} >Save Note</Button>
            </form>
          </Grid>
        </Paper>
        <div className={classes.divPadding}></div>
        <div className={classes.page_padding}><div className='page'>
          <h1 className={classes.general}>General Notes : </h1>
          <Grid item id='notes' className={classes.notes}>
            {Array.isArray(notes) && notes.map(n => 
              <div className={classes.noteDiv} key={n.id}>
              <div><b style={{color:'#375C23'}}>Note Title : </b>{n.title}</div>
              <div>{n.content}</div>
              <div style={{color:'#375C23'}}>___</div>
              </div>)}
          </Grid>
        </div>
        </div>
      </div>
    </div>
  )
}
