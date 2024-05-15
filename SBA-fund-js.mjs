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
  const courseId = course.id;
  // console.log(courseId);
  const assignments = ag.assignments;
  console.log("assignment..." + assignments);

  // Filter assignments by course ID
  const courseAssignments = assignments.filter(
    (assignment) => assignment.course_id === courseId
  );
  console.log("assigment :" + courseAssignments);

  // Create an object to store learner data
  const learnerData = {};

  // Iterate over submissions to calculate scores for each learner and assignment
  submissions.forEach((submission) => {
    const learnerId = submission.learner_id;
    const assignment = courseAssignments.find(
      (a) => a.id === submission.assignment_id
    );
    if (!assignment) return; // Skip if assignment not found

    const assignmentScore = submission.submission.score;
    const maxScore = assignment.points_possible;
    const normalizedScore = assignmentScore / maxScore;

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
