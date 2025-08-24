function Home() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/restaurant.jpeg')" }}
    >
      <div className="pt-16 flex-grow flex items-center justify-center">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Restaurant</h1>
          <p className="text-lg">Please Sign Up or Login to continue</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
