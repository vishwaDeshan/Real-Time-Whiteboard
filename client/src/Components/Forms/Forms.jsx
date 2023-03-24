import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";

const Forms=()=>{
    const styles = {
        formBox: {
          height: '400px',
        },
      };

    return(
        <div className="row h-100 pt-5">
             <div style={styles.formBox} className="col-md-4 mt-5 p-5   border border-2 rounded-2 mx-auto d-flex flex-column align-items-center border-secondary">
                <h1 className="text-primary  fw-bold">Create Room</h1>
                <CreateRoom/>
             </div>
             <div style={styles.formBox} className="col-md-4 mt-5 p-5  border border-2 rounded-2 mx-auto d-flex flex-column align-items-center  border-secondary">
                <h1 className="text-primary  fw-bold">Join Room</h1>
                <JoinRoom/>
             </div>
        </div>
    )
}

export default Forms;