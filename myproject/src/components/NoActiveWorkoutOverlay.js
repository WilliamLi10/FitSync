const NoActiveWorkoutOverlay = () => {
    return (
      <div className="fixed w-screen h-screen  flex items-center justify-center bg-black bg-opacity-60 backdrop-filter backdrop-blur">
        <div className="bg-white p-8 text-center">
          <h1 className="text-2xl">No Active Workout Program</h1>
          <p>Please start a workout program to continue.</p>
        </div>
      </div>
    );
  };
  
  export default NoActiveWorkoutOverlay;
  