import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.css'
import { AppContext } from '../../context/ContextApi'
import { Button } from '@mui/material';
import { TextField } from '@mui/material'
import axios from 'axios';


const Dashboard = () => {
  const { user } = useContext(AppContext)
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [noteField, setNoteField] = useState(false)
  const url = import.meta.env.VITE_BACKEND_URL
  const { token } = useContext(AppContext)
  const [noteSaveErr, setNoteSaveErr] = useState("")
  const [deleteMessage, setDeleteMessage] = useState("")

  const handlingNoteChange = (event) => {
    setNote(event.target.value)
  }

  const handlingCreateNote = async (event) => {
    event.preventDefault()
    setNoteField(true)

    if (noteField)
      try {

        const response = await axios.post(`${url}/task`, { note: note }, { headers: { Authorization: `Bearer ${token}` } })
        const data = response.data

        if (data.success) {
          setNote("")
        } else {
          setNoteSaveErr(data.message)
          setNoteField(false)

        }

      } catch (error) {
        setNoteSaveErr(error.message)
        setNoteField(false)

      }

  }

  const handlingDeleteNote = async (id) => {
    try {
      const response = await axios.delete(`${url}/task/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = response.data;

      if (data.success) {
        setNotes(notes.filter(note => note._id !== id));
        setDeleteMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeleteMessage("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [deleteMessage]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${url}/task`, { headers: { Authorization: `Bearer ${token}` } });
        const data = response.data;

        if (data.success) {
          setNotes(data.notes);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, [notes, url, token]);


  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 col-12 py-3">
            <div className="card shadow p-3 mb-5 ">

              <div className="card-body ">

                <h5 className="card-title fw-bold">Welcome, {user && user.name}</h5>
                <p className="card-text text-muted">Email: {user && user.email}</p>

              </div>

            </div>
            <div className='text-center'>
              <form >
                {
                  noteField &&
                  <>
                    <TextField className='note' id="note" value={note} type='text' label="Note" variant="outlined" onChange={handlingNoteChange} /> <br /> <br />
                  </>
                }
                {
                  noteSaveErr && <p className='text-danger'>{noteSaveErr}</p>
                }
                <Button variant="contained" onClick={handlingCreateNote} className='note' size="large" type='submit' >Create Note</Button>
              </form>
              {
                deleteMessage && <p className='text-success pt-3 fw-semibold'>{deleteMessage}</p>
              }
              <div className="card notes overflow-auto scrollbar mt-4 text-start ">
                <div className="card-body sticky-top bg-light shadow  lh-base d-flex justify-content-between align-items-center" key={note._id}>
                  <h4 className='text-start '>Notes</h4>

                </div>

                {

                  notes.map(note => (
                    <div className="card-body shadow my-2  lh-base d-flex justify-content-between align-items-center" key={note._id}>
                      <p className="card-title"> {note.task}</p>
                      <i key={note._id} onClick={() => handlingDeleteNote(note._id)} className="fa-regular fa-trash-can" style={{ color: "#000000", cursor: "pointer" }}></i>
                    </div>

                  ))

                }

              </div>
            </div>

          </div>

          <div className="col-md-1"></div>
        </div>
      </div>

    </>
  )
}

export default Dashboard