const PostPerPage = ({pageSize, setPageSize}) => {

    const handleChange = (event) => {
        setPageSize(event.target.value)
    }

    return(
        <span>
        <label for='postpage'>Cards per page:<br />
            <select name="postpage" id="postpage" onChange={handleChange}>
                <option value="12">12</option>
                <option value="15">15</option>
                <option value="18">18</option>
                <option value="21">21</option>
                <option value="24">24</option>
            </select>
        </label>
        </span>
    )
}

export default PostPerPage;