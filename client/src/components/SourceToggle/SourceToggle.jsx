import style from './SourceToggle.module.css'

const SourceToggle = ({ sourceToggle, setSourceToggle, setPage }) => {

    const handleChange = () => {
        setSourceToggle(!sourceToggle);
        setPage(0);
    }

    return (
        <div className={style.toggleContainer}>
            <div className={style.conditionalLabel}>{`Source: ${sourceToggle ? 'API' : 'DB'}`}</div>
            <label htmlFor="sourcetoggle">
                <input type="checkbox" name="sourcetoggle" id="sourcetoggle" defaultChecked={sourceToggle} onClick={handleChange} />
                <span />
            </label>

        </div>
    )
}

export default SourceToggle;