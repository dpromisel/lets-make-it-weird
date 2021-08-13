import "../App.css";

function Background({ children }: { children: JSX.Element }) {
  return (
    <div
      className="App"
      style={{
        backgroundColor: "black",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        color: "white",
      }}
    >
      {children}
    </div>
  );
}

export default Background;
