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
  // here, we would process this data to achieve the desired result.
  try {
    const courseId = course.id;
    console.log("courseId ..", courseId); //451
    const assignments = ag.assignments;

    console.log("..assignments ", assignments); //
    //see value each param
    // console.log("Course ID:", courseId); //451
    // console.log("Assignment Group:", ag);
    // console.log("Assignments:", assignments);

    // Filter assignments by course ID
    const courseAssignments = assignments.filter(
      (assignment) => assignment.course_id === courseId
    );
    console.log("courseAssignments ... :", courseAssignments);

    // Create an object to store learner data
    const learnerData = {};

    // Iterate over submissions to calculate scores for each learner and assignment
    console.log("submissions ...", submissions);
    submissions.forEach((submission) => {
      const learnerId = submission.learner_id;
      console.log("learnerId ...: ", learnerId);
      const assignment = courseAssignments.find(
        (a) => a.id === submission.assignment_id
      );
      console.log("assignemt ...", assignment);

      if (!assignment) return;
      const assignmentScore = submission.submission.score;
      const maxScore = assignment.points_possible;
      const normalizedScore = assignmentScore / maxScore;

      console.log("assignmentScore ..:", assignmentScore);
      console.log("maxScore ..: ", maxScore);
      console.log("normalizedScore ..:" + normalizedScore);

      if (!learnerData[learnerId]) {
        learnerData[learnerId] = {
          id: learnerId,
          totalScore: 0,
          completedAssignments: 0,
          scores: {},
          avg: 0,
        };
      }

      learnerData[learnerId].totalScore += normalizedScore;
      learnerData[learnerId].completedAssignments++;
      learnerData[learnerId].scores[assignment.id] = normalizedScore;
    });

    // Calculate average scores for each learner
    for (const learnerId in learnerData) {
      const learner = learnerData[learnerId];
      learner.avg = learner.totalScore / learner.completedAssignments;
      delete learner.totalScore; // Remove intermediate totalScore property
    }

    // Convert learnerData object to an array
    const result = Object.values(learnerData);

    return result;
  } catch (error) {
    console.error("An error occurred while processing learner data:", error);
    return []; // Return an empty array in case of an error
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
