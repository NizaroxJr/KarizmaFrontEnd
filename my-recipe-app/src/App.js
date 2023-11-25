import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute path="/" component={RecipesPage} />
          <ProtectedRoute exact path="/recipes/:id" component={RecipeDetails} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
