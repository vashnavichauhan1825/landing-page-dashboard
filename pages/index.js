import { Provider } from "react-redux";
import store from "@/store";

function HomePage() {
  return (
    <Provider store={store}>
      <div>
        <h1>happy coding</h1>
      </div>
    </Provider>
  );
}

export default HomePage;
