import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="px-5">
                    <label for="exampleInputEmail1" className="form-label">Brand Name</label>
                    <input type="text" value={value} onChange={e => setValue(e.target.value)} className="form-control" />
                    <button type='submit' className='btn btn-success my-3' >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CategoryForm
