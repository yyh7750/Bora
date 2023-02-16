import "./Input.scss";

const Input = () => {
  return (
    <div className="form__group">
      <input
        type="input"
        className="form__field"
        placeholder="Name"
        name="name"
        id="name"
        required
      />

      <label for="name" className="form__label">
        Name
      </label>
    </div>
  );
};

export default Input;
