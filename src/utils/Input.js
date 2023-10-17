export const Input = ({ label, type, id, name, value }) => {
    /* We will implement input validation using react-hook-form,
     which will ensure that the data entered by users is valid before it is submitted. */
    return (
        <div>
            <label>{label}</label>
            <input
            id={id}
            type={type}
            name={name}
            value={value}
            />
        </div>
    )
}