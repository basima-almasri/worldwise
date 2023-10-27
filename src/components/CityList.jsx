import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
function CityList() {
  const { isLoading, cities } = useCities();
  // console.log({ cities });
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message={"Start By Clicking Somewhere on the map!😀"} />;
  else
    return (
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
    );
}

export default CityList;
