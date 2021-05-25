import { makeStyles } from "@material-ui/core";
import "./Home.css"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";
import { useFormFields } from "../lib/customHooks";
import React from "react";
import { http } from "../lib/http";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: 'auto',
    maxWidth: 580,
    paddingTop: '2vw',
    paddingLeft: '3%'
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
    margin: '1% 20%'
  },
  text: {
    width: '90%',
    padding: '3vw',
    margin: "auto"
  },
  noteDiv: {

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
    <div>
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
        <div className={classes.page_padding}><div className='page-container'>
          <Grid item id='notes'>
            {Array.isArray(notes) && notes.map(n => <div className={classes.noteDiv} key={n.id}><div>{n.title}</div><div>{n.content}</div> </div>)}
          </Grid>
        </div>
        </div>
      </div>
    </div>
  )
}
