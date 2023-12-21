const PostPerPage = ({pageSize, setPageSize}) => {

    const handleChange = (event) => {
        setPageSize(event.target.value)
    }

    return(
        <>
        <label for='postpage'>
            <select name="postpage" id="postpage" onChange={handleChange}>
                <option value="12">12 per page</option>
                <option value="15">15 per page</option>
                <option value="18">18 per page</option>
                <option value="21">21 per page</option>
                <option value="24">24 per page</option>
            </select>
        </label>
        </>
    )
}

export default PostPerPage;