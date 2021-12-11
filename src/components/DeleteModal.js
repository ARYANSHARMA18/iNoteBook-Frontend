import React from 'react'

const DeleteModal = (props) => {
    const { refDelete, deleteButtonClick,refDeleteClose } = props
    return (
        <div>
            <button type="button" className="btn btn-primary d-none" ref={refDelete} data-bs-toggle="modal" data-bs-target="#delete">
                Launch demo modal
            </button>

            <div className="modal fade" id="delete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Notebook</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            This Notebook will be permanently deleted?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={deleteButtonClick}>Delete</button>
                            <button type="button" ref={refDeleteClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
