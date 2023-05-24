const MyWorkouts = () => {
  return (
    <div className="mt-4 w-screen h-screen">
      <section className="border-black border-b-[1px] border-solid w-screen h-1/4 mb-4 ">
        <h1 className="text-3xl pl-4">Current Workout Plan</h1>
        <div className="text-xl pt-12 pl-4">No Current Workout Plan</div>
      </section>
      <section>
        <h1 className="text-3xl pl-4">All Workout Plans</h1>
      </section>
    </div>
  );
};

export default MyWorkouts;
