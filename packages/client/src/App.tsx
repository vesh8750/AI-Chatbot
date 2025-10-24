import "./App.css";
import ReviewList from "./components/reviews/ReviewList";

function App() {
  return (
    <div className="p-4 h-svh">
      <ReviewList productId={5} />
    </div>
  );
}

export default App;
