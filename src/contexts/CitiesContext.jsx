import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const citiesContext = createContext();
///////////////
const BASE_URL = "http://localhost:8000";
//////////////////

const ininalState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};
function CitiesProvider({ children }) {
  function reducer(state, action) {
    // console.log(action.payload);
    const reducerObj = {
      loading: { ...state, isLoading: true },
      "cities/loaded": {
        ...state,
        isLoading: false,
        cities: action.payload,
      },
      "city/loaded": {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      },
      "city/added": {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      },
      "city/deleted": {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      },
      rejected: { ...state, isLoading: false, error: action.payload },
    };
    console.log(action.payload);
    return reducerObj[action.type];
  }

  const [state, dispatch] = useReducer(reducer, ininalState);
  const { cities, isLoading, currentCity } = state;
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        // setIsLoading(true);
        dispatch({ type: "loading" });

        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log("data is ", data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: "there is an errr " });
      } finally {
        // setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  ////////////////////////
  async function fetchAndSetCurrentCity(id) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });

      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "city/loaded", payload: [...data] });
    } catch (err) {
      dispatch({ type: "rejected", payload: "there is an err in loading" });
    } finally {
      // setIsLoading(false);
    }
  }

  async function addNewCity(newCity) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });

      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "content-type": "Application/json" },
      });
      const data = await res.json();
      // setCities((cities) => [...cities, data]);
      dispatch({ type: "city/added", payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "rejected", payload: "there is an error in add" });
    } finally {
      // setIsLoading(false);
    }
  }
  //////////////////
  async function deleteCity(id) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });

      await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "city/deleted",
        payload: id,
      });

      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "rejected", payload: "there is an error in delete" });
    } catch (err) {}
  }
  console.log({ cities });
  //////////////////////////////////
  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,

        currentCity,
        addNewCity,
        deleteCity,
        fetchAndSetCurrentCity,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

function useCities() {
  const cities = useContext(citiesContext);
  // if (cities === undefined) throw new Error("there are an error");
  return cities;
}
export { CitiesProvider, useCities };
