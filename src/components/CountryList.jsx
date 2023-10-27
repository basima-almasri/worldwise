import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";
function CountryList() {
  const { isLodaing, cities } = useCities();
  if (isLodaing) return <Spinner />;
  if (!cities.length) return <Message />;
  const country = cities.reduce((arr, city) => {
    if (arr.map((item) => item.country).includes(city.country)) return arr;
    else return [...arr, city];
  }, []);
  //   const arr = [];
  //   const countriesNames = [...new Set(cities.map((city) => city.country))];
  //   countriesNames.forEach((country) => {
  //     const countryObj = cities.find((city) => city.country === country);

  //     arr.push(countryObj);
  //   });
  //   console.log({ arr });
  return (
    <ul className={styles.countryList}>
      {country.map((city, i) => (
        <CountryItem country={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CountryList;
