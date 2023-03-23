import React from "react";

function CreateRoom() {
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
            <div className="form-group border rounded-2">
                <div className="inputGroup d-flex align-items-center justify-content-center gap-1">
                    <input
                        type="text"
                        style={styles.code}
                        className="my-2 rounded-2 p-1 border-0"
                        placeholder="Generate room code"
                        disabled
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary btn-sm me-1"  type="button">
                            Generate
                        </button>
                        <button className="btn btn-outline-danger btn-sm" type="button">Copy</button>
                    </div>
                </div>
            </div>
            <button type="submit" className="mt-4 btn btn-primary btn-block form-control">Create Room</button>
        </form>
    );
}

export default CreateRoom;
