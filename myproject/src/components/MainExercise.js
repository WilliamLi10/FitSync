const MainExercise = (props) => {
    return(<li>
        <div className="flex justify-between">
          <div className="w-3/5">
            <p>{props.exercise.Exercise}</p>{" "}
            <p>
              Weight:{" "}
              {props.exercise.Weight != null ? props.exercise.Weight : "N/A"}
            </p>
            <p>
              Rest:{" "+ props.exercise.Rest + " " + props.exercise.Unit}
            </p>
            <p>
              {props.exercise.Notes != null ? "Notes: " + props.exercise.Notes : ""}
            </p>
          </div>

          <p className="ml-auto">
            {props.exercise.Reps != null
              ? props.exercise.Sets + " x " + props.exercise.Reps
              : props.exercise.Sets + " Sets"}
          </p>
        </div>
      </li>)

};

export default MainExercise;