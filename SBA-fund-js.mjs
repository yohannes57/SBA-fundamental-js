console.log("********__SBA_Fundamental_JS__********");
//
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};
// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};
// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  try {
    const courseId = course.id;

    // Validate that the assignment group belongs to the course
    if (ag.course_id !== courseId) {
      throw new Error(
        `Assignment group ${ag.id} does not belong to course ${courseId}`
      );
    }

    const assignments = ag.assignments;
    const now = new Date();

    // Filter by due date
    const validAssignments = assignments.filter((assignment) => {
      const dueDate = new Date(assignment.due_at);
      return dueDate > now || ag.course_id === courseId;
    });
    // console.log(validAssignments, "..validAssignmetn");
    // create object to hold the learner data
    const learnerData = {};

    submissions.forEach((submission) => {
      const learnerId = submission.learner_id;
      const assignment = validAssignments.find(
        (a) => a.id === submission.assignment_id
      );
      // console.log(assignment,"...assignment")
      // if assignment is empity ,it return nothing
      if (!assignment) return;

      const assignmentScore = submission.submission.score;
      const maxScore = assignment.points_possible;

      //check the if the data are number,and not zero
      if (
        typeof assignmentScore !== "number" ||
        typeof maxScore !== "number" ||
        maxScore === 0
      ) {
        console.error(
          `Invalid score data for assignment ${assignment.id} or learner ${learnerId}`
        );
        return;
      }

      //normalizedScore
      let normalizedScore = assignmentScore / maxScore;

      const dueDate = new Date(assignment.due_at);
      const submittedDate = new Date(submission.submission.submitted_at);

      //if submission late, 10% minus from the scor

      if (submittedDate > dueDate) {
        normalizedScore = Math.max(0, normalizedScore - 0.1);
      }

      //if learnerData has not value ,it will initialized here
      if (!learnerData[learnerId]) {
        learnerData[learnerId] = {
          id: learnerId,
          totalScore: 0,
          totalWeight: 0,
          scores: {},
          avg: 0,
        };
      }

      learnerData[learnerId].totalScore += normalizedScore * maxScore;
      learnerData[learnerId].totalWeight += maxScore;
      learnerData[learnerId].scores[assignment.id] = normalizedScore;
    });

    // Calculate average scores for each learner
    for (const learnerId in learnerData) {
      const learner = learnerData[learnerId];
      learner.avg = learner.totalScore / learner.totalWeight;
      delete learner.totalScore;
      // Remove totalScore,cause once we calculate the avg ,we dont need any more
      delete learner.totalWeight;
      // the same as totalScore ,it doesnt needed any more
    }

    // Convert learnerData object to an array and format as it needed
    const result = Object.values(learnerData).map((learner) => {
      const formattedLearner = {
        id: learner.id,
        avg: Number(learner.avg.toFixed(3)),
      };

      for (const [assignmentId, score] of Object.entries(learner.scores)) {
        formattedLearner[Number(assignmentId)] = Number(score.toFixed(3));
      }

      return formattedLearner;
    });

    //console.log(result,"...result")
    return result;
  } catch (error) {
    console.error("An error occurred while processing learner data:", error);
    //return empty array
    return [];
  }
}
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

//**************************************** */
// const result = [
//   {
//     id: 125,
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0, // 150 / 150
//   },
//   {
//     id: 132,
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833, // late: (140 - 15) / 150
//   },
// ];
/*
the final result looks like this:
[
  { '1': 0.94, '2': 1, id: 125, avg: 0.985 },
  { '1': 0.78, '2': 0.833, id: 132, avg: 0.82 }
]

*/
