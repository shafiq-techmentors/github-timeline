import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TimeLine } from "./pages/timeline";
import { TimeLineDetails } from "./pages/timeline-details";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <TimeLine />
          </Route>
          <Route path="/timeline-details">
            <TimeLineDetails />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
