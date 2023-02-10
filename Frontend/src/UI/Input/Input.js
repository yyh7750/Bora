import "./Input.scss";

const Input = () => {
  return (
    <div class="form__group">
      <input
        type="input"
        class="form__field"
        placeholder="Name"
        name="name"
        id="name"
        required
      />
      <label for="name" class="form__label">
        Name
      </label>
    </div>
  );
};

export default Input;
