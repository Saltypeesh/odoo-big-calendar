/* eslint-disable react/prop-types */
function FormRow({ label, error, children }) {
  return (
    <div style={{ display: "block" }}>
      {label && (
        <label style={{ fontWeight: 500 }} htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span style={{ fontSize: "12px", color: "red" }}>{error}</span>}
    </div>
  );
}

export default FormRow;
