import axios from "axios";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [id, setID] = useState(2);

  const delAll = () => {
    axios
      .delete("/twitter/delete_all")
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert("Error occured");
      });
  };

  const deletetweet = (e) => {
    e.preventDefault();
    axios
      .delete(`/twitter/delete/${e.target.index.value}`)
      .then((res) => alert(res.data.message))
      .catch((error) => {
        console.log(error);
        alert("Error while deleting tweet");
      });
  };

  const addtweet = (e) => {
    e.preventDefault();
    axios
      .post("/twitter/add_tweet", {
        id,
        title: e.target.title.value,
        author: e.target.author.value,
        doc: e.target.doc.value,
        category: e.target.category.value,
        body: e.target.body.value,
      })
      .then((res) => {
        alert(res.data.message);
        setID(id + 1);
      })
      .catch((error) => {
        console.log(error);
        alert("Error occured while adding tweet");
      });
  };
  return (
    <div className='outer-twitter-form-container'>
      <div className='inner-container'>
        <h1 className='text-center'>Add Tweet</h1>
        <form onSubmit={addtweet}>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              name='title'
              placeholder='Title'
            />
            <input
              className='form-control'
              type='text'
              name='author'
              placeholder='Author'
            />
            <input type='date' name='doc' className='form-control' />
            <select name='category' className='form-select'>
              <option value='Entertainment'>Entertainment</option>
              <option value='Study'>Study</option>
              <option value='Politics'>Politics</option>
              <option value='Sports'>Sports</option>
            </select>
            <div className='form-floating'>
              <textarea
                className='form-control'
                placeholder='Leave a comment here'
                id='floatingTextarea'
                name='body'></textarea>
              <label htmlFor='floatingTextarea'>Body</label>
            </div>
            <input
              type='submit'
              className='btn btn-success'
              value='Add Tweet'
            />
          </div>
        </form>
        <div>
          <h1 className='text-center'>Remove Tweet</h1>
          <form onSubmit={deletetweet} className='form-group'>
            <input
              type='number'
              name='index'
              className='form-control'
              placeholder='Tweet ID'
            />
            <input
              type='submit'
              className='btn btn-danger'
              value='Remove Tweet'
            />
          </form>
          <div className='text-center p-3'>
            <button onClick={delAll} className='btn btn-danger'>
              Delete All Tweets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
