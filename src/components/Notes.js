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
    paddingTop: '5vw',
    paddingLeft: '9vw'
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
    left: '10vw',
    top: 30,
    marginBottom: 50,
  },
  note_container: {
    margin: '1% 20%'
  },
  text: {
    width: '400px',
    padding: '2vw'
  },
}));


export default function Notes() {
  const classes = useStyles();
  const [note, setNote] = useFormFields({
    content: ""
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

    try {
      const { data } = await http.post('/notes', {
        content: note.content
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
              <Grid item>
                <textarea name="content" value={note.content} onChange={setNote} rows='7' cols='50' className={classes.text} placeholder='Please write a note about how you are feeling, what you wish to discuss with your specialist, or anything on your mind.'></textarea>
              </Grid>
              <Grid item xs={12} sm container>
              </Grid>
              <Button type='submit' onClick={submitNote} className={classes.notebtn} >Save Note</Button>
            </form>
          </Grid>
        </Paper>
        <div className={classes.page_padding}><div className='page-container'>
          <Grid item id='notes'>
            {Array.isArray(notes) && notes.map(n => <div key={n.id}>{n.content}</div>)}
          </Grid>
        </div>
        </div>
      </div>
    </div>
  )
}
