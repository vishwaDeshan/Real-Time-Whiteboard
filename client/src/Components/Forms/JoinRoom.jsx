import React from 'react'

function JoinRoom() {
  const styles = {
    name: {
        width: '100%',
    },

};

  return (
    <form className="form w-100 col-md-12 mt-5" >
    <div className="formGroup ">
        <input
            type="text"
            style={styles.name}
            className="my-2 rounded-2 p-1 border"
            placeholder="Enter your name"
        />
    </div>
    <div className="form-group rounded-2">
    <input
            type="text"
            style={styles.name}
            className="my-2 rounded-2 p-1 border"
            placeholder="Enter room code"
        />
    </div>
    <button type="submit" className="mt-4 btn btn-primary btn-block form-control">Join Room</button>
</form>
  )
}

export default JoinRoom