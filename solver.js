function solveLinearEquation(equations) {
    const solutions = [];
    const equationsLength = equations.length;

    function eliminate() {
      let newEquations = [];

      for (let i = 1; i < equations.length; i++){
        let equation1 = equations[0];
        let equation2 = equations[i];

        let newEquation = [[], []];

        let equation1Multiplyer = equation2[0][equations.length - 1];
        let equation2Multiplyer = equation1[0][equations.length - 1];

        for (let j = 0; j < equations[0][0].length - 1; j++){
          let newCoefficient = equation2Multiplyer * equation2[0][j] - equation1Multiplyer * equation1[0][j];
          newEquation[0].push(newCoefficient);
        }
        newEquation[1].push(equation2Multiplyer * equation2[1][0] - equation1Multiplyer * equation1[1][0]);

        newEquations.push(newEquation);
      }

      return newEquations;
  }
  let usefulCoefficients = [];
  for (let i = 0; i < equationsLength - 1; i++){
    equations = eliminate();

    usefulCoefficients.push(equations[0])
  }

  solutions.push(usefulCoefficients[usefulCoefficients.length-1][1][0] / usefulCoefficients[usefulCoefficients.length-1][0])

  // [ [ [ 360, 36 ], [ 1152 ] ],
  // [ [ 150, 36, 6 ], [ 464 ] ],
  // [ [ 15, 7, 3, 1 ], [ 40 ] ] ]

  let newUsefulCoefficients = [];

  for (let i = usefulCoefficients.length - 2; i >= 0; i--){
    newUsefulCoefficients.push(usefulCoefficients[i]);
  }

  usefulCoefficients = newUsefulCoefficients;

  for (let i = 0; i < usefulCoefficients.length; i++){
    let coefficients = usefulCoefficients[i][0];
    let constant = usefulCoefficients[i][1];
    let sum = 0;

    for (let j = 0; j < coefficients.length-1; j++){
      let coefficient = coefficients[j];
      sum += coefficient * solutions[j];
      solutions.push((constant - sum)/coefficients[coefficients.length-1]);
    }
  }

  return solutions;
  }
