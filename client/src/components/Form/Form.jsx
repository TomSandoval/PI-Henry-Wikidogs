import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import style from "./Form.module.css";
import { getTemperaments, postDog } from "../../redux/actions";
import { useEffect, useState } from "react";
import { validate, validateImage } from "./validate";
import SuccesCreate from "../SuccessCreate/SuccesCreate";
import ErrorCreate from "../ErrorCreate/ErrorCreate";
import AlreadyCreate from "../AlreadyCreate/AlreadyCreate";

export default function Form() {
  const temperaments = useSelector((state) => state.temperaments);
  const create = useSelector((state) => state.create);
  const failed = useSelector((state) => state.errorCreate);
  const alreadyCreate = useSelector(state => state.alreadyCreate);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
    image: "",
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "image") {
      setForm({ ...form, [property]: value });
      setErrors(validateImage(value));
    } else {
      setForm({ ...form, [property]: value });
      setErrors(validate({ ...form, [property]: value }));
    }
  };

  const handleSelect = (event) => {
    setForm({
      ...form,
      temperaments: [...form.temperaments, event.target.value],
    });
  };

  const handleDelete = (event,temp) => {
    event.preventDefault()
    let temps = form.temperaments.filter((temps) => temps !== temp);
    setForm({
      ...form,
      temperaments: temps,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postDog(form));
    if(create){
       setForm({
      name: "",
      minHeight: "",
      maxHeight: "",
      minWeight: "",
      maxWeight: "",
      life_span: "",
      image: "",
      temperaments: [],
    });
    }
   
  };

  let button = false;

  if (
    errors.name ||
    errors.minWeight ||
    errors.maxWeight ||
    errors.minHeight ||
    errors.maxHeight ||
    errors.life_span
  )
    button = button;
  else button = true;

  const defaultImage =
    "https://img.freepik.com/vector-gratis/lindo-perro-sacando-lengua-ilustracion-icono-dibujos-animados_138676-2709.jpg?w=826&t=st=1682371926~exp=1682372526~hmac=32aa3acb847e976b1d862e1cb54099b43a3ad0054c21a7b13624bd523595cbd6";

  return (
    <>
      <Nav view={false} />
      <main className={style.main}>
        <>
        {
          alreadyCreate ? <AlreadyCreate/> : null}
        {failed ? (
          <ErrorCreate />
        ) : (
          <div className={alreadyCreate ? style.filter : style.formContainer}>
            {create ? (
              <SuccesCreate />
            ) : (
              <>
                <div className={style.imageContainer}>
                  <img
                    className={style.image}
                    src={
                      form.image && !errors.image ? form.image : defaultImage
                    }
                    alt="bread"
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className={style.nameContainer}>
                    <h3 className={style.inputTitle}>Name:</h3>
                    <input
                      placeholder="Name"
                      autoComplete="off"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={form.name}
                    ></input>
                    {errors.name && (
                      <div>
                        <span className={style.errorText}>{errors.name}</span>
                      </div>
                    )}
                  </div>
                  <div className={style.weightContainer}>
                    <h3 className={style.inputTitle}>Weight:</h3>
                    <div>
                      <div>
                        <input
                          placeholder="Min Weight"
                          autoComplete="off"
                          type="text"
                          name="minWeight"
                          onChange={handleChange}
                          value={form.minWeight}
                        ></input>
                        {errors.minWeight && (
                          <div>
                            <span className={style.errorText}>
                              {errors.minWeight}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <input
                          placeholder="Max Weight"
                          autoComplete="off"
                          type="text"
                          name="maxWeight"
                          onChange={handleChange}
                          value={form.maxWeight}
                        ></input>
                        {errors.maxWeight && (
                          <div>
                            <span className={style.errorText}>
                              {errors.maxWeight}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={style.heightContainer}>
                    <h3 className={style.inputTitle}>Height:</h3>
                    <div>
                      <div>
                        <input
                          placeholder="Min Height"
                          autoComplete="off"
                          type="text"
                          name="minHeight"
                          onChange={handleChange}
                          value={form.minHeight}
                        ></input>
                        {errors.minHeight && (
                          <div>
                            <span className={style.errorText}>
                              {errors.minHeight}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <input
                          placeholder="Max height"
                          autoComplete="off"
                          type="text"
                          name="maxHeight"
                          onChange={handleChange}
                          value={form.maxHeight}
                        ></input>
                        {errors.maxHeight && (
                          <div>
                            <span className={style.errorText}>
                              {errors.maxHeight}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={style.lifeSpanContainer}>
                    <h3 className={style.inputTitle}>Life Span:</h3>
                    <input
                      placeholder="Example:  10 - 15 years"
                      autoComplete="off"
                      type="text"
                      name="life_span"
                      onChange={handleChange}
                      value={form.life_span}
                    ></input>
                    {errors.life_span && (
                      <div>
                        <span className={style.errorText}>
                          {errors.life_span}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={style.imageInputContainer}>
                    <h3 className={style.inputTitle}>URL image:</h3>
                    <input
                      placeholder="URL Image"
                      autoComplete="off"
                      type="text"
                      name="image"
                      onChange={handleChange}
                      value={form.image}
                    ></input>
                    {errors.image && (
                      <div>
                        <span className={style.errorText}>{errors.image}</span>
                      </div>
                    )}
                  </div>
                  <div className={style.tempsContainer}>
                    <h3 className={style.inputTitle}>Temperaments:</h3>
                    <select
                      defaultValue="Select temperaments"
                      name="temperaments"
                      onChange={handleSelect}
                    >
                      <option value="Select temperaments">
                        Select temperaments
                      </option>
                      {temperaments.map((temp, index) => (
                        <option value={temp.name} key={index}>
                          {temp.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={style.containerTemps}>
                    {form.temperaments.map((temp, index) => (
                      <p className={style.tempName} key={index}>
                        {temp}
                        <button type="button" onClick={(event) => handleDelete(event,temp)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            style={{ fill: "rgba(255, 255, 255, 1)" }}
                          >
                            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                          </svg>
                        </button>
                      </p>
                    ))}
                  </div>
                  {button ? (
                    <button type="submit" className={style.submitButton}>Create</button>
                  ) : (
                    <div className={style.submitButtonFalse}>Create</div>
                  )}
                </form>
              </>
            )}
          </div>
        )}        
        </>

      </main>
    </>
  );
}
