import { networkArrayToMap, parseDirections, parseNetwork } from "./network";

async function main1() {
  // const path = "./input-example1.txt";
  // const path = "./input-example2.txt";
  const path = "./input.txt";

  const file = Bun.file(path);
  const text = await file.text();

  const document = text.split('\n\n')
  const rawDirections = document[0]

  const directions = parseDirections(rawDirections)

  const rawNetwork = document[1]

  const network = parseNetwork(rawNetwork)
  const networkMap = networkArrayToMap(network)


  let directionIndex = 0
  let steps = 0

  let currentPosition = 'AAA'

  while (currentPosition !== 'ZZZ') {

    const nextDirection = directions[directionIndex]
    const nextPosition = networkMap[currentPosition][nextDirection === 'L' ? 'left' : 'right']

    steps++

    console.log(currentPosition, `--- (${ nextDirection }) --->`, nextPosition, `step ${steps}`)

    currentPosition = nextPosition

    directionIndex++
    if (directionIndex > directions.length - 1) {
      directionIndex = 0
    }
  }

  console.log(steps)
}

main1()
