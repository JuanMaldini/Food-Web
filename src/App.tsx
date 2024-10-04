import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(data);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);

    axios
      .get(url, { signal })
      .then(({ data }) => setData(data.meals))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"`}
      gridTemplateRows={"60px 1fr"}
      gridTemplateColumns={{ sm: `0 1fr`, md: `250px 1fr` }}
    >
      <GridItem pl="2" bg="orange.300" area={"header"}>
        <Header />
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={"nav"} height="calc(100vh - 60px)">
        <SideNav />
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        <MainContent />
      </GridItem>
    </Grid>
  );
}

export default App;
