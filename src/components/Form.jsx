// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [error, setError] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isloadingPosition, setIsLoadingPosition] = useState(false);
  const { addNewCity, isLoading } = useCities();
  const navigate = useNavigate();
  ///////////////////////////////////////////////////////////////////////////

  ////////////////////////////Handle Submit Form/////////
  async function handleSubmitForm(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: { lat, lng },
    };
    await addNewCity(newCity);
    navigate("/app/cities");
  }

  //////////////////////////////////UseEffect FetchCity////////////////////
  useEffect(() => {
    if (!lat && !lng) return;
    async function FetchnewCity() {
      try {
        setIsLoadingPosition(true);
        setError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);

        const data = await res.json();
        if (!data.countryCode) throw Error("Try another position !😉");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setError(err.message);
        setIsLoadingPosition(false);
      } finally {
        setIsLoadingPosition(false);
      }
    }
    FetchnewCity();
  }, [lat, lng]);
  ////////////////////////////////////////////////////////////////
  if (!lat && !lng)
    return <Message message={"start,by clicking somewhere on the map !😉 "} />;
  if (isloadingPosition) return <Spinner />;
  if (error) return <Message message={"Try another position !😉 "} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmitForm}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
