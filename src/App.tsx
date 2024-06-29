import { useState, useEffect } from "react";
import axios from "axios";

import { IFetchData } from "./models/IFetchData";

import { wikiDataSlice } from "./store/reducers/wikiDataReducer";
import { useAppDispatch } from "./hooks/redux-hooks";

import EventsList from "./components/EventsList/EventsList";
import HolidaysList from "./components/HolidaysList/HolidaysList";

import "./App.css";

function App() {
  const [fetchData, setFetchData] = useState<IFetchData>({
    holidays: [],
    events: [],
    births: [],
  });

  const [listData, setListData] = useState<IFetchData>({
    holidays: [],
    events: [],
    births: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListsShown, setIsListsShown] = useState(false);

  const dispatch = useAppDispatch();
  const { fetchNewData } = wikiDataSlice.actions;

  async function getWikiData() {
    setIsLoading(true);
    const getCurrentUsersDateMonth = new Date().getMonth() + 1;
    const getCurrentUsersDateDay = new Date().getDate();

    const URL =
      "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/" +
      getCurrentUsersDateMonth +
      "/" +
      getCurrentUsersDateDay;
    await axios
      .get(URL)
      .then((response) => {
        setFetchData(response.data);
        dispatch(fetchNewData(response.data));
        setIsListsShown(true);
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    setListData(fetchData);
  }, [fetchData]);

  return (
    <div className="App">
      <div className="app__button-wrapper">
        <button className="app__button" onClick={() => getWikiData()}>
          Load Data
        </button>
      </div>

      {isLoading ? <p>Loading ...</p> : <></>}

      {isListsShown ? (
        <>
          <div className="events-list-wrapper">
            {listData?.events ? (
              <>
                <h2 className="events-list__title">Events On This Day</h2>
                <EventsList />
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="events-list-wrapper">
            {listData?.holidays ? (
              <>
                <h2 className="events-list__title">Holidays On This Day</h2>
                <HolidaysList />
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
